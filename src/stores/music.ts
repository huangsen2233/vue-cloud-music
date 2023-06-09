import { nextTick } from "vue";
import { defineStore } from "pinia";
import type { IMusic, CurrentSongInfoType } from "./type";
import { getSongUrlApi } from "@/api/music";

export const useMusicStore = defineStore('music', {
  /* persist: {
    enabled: true
  }, */
  state: (): IMusic => ({
    currentSongInfo: { songId: 0, songName: '', picUrl: '', duration: 0, artists: [] },
    currentSongData: [],
    songList: [], // 歌单列表
    fee: 0,  // 0 8是普通用户，1是vip用户
    audio: new Audio(),
    src: '', // 音频地址
    isPlay: false, // 是否播放
    volume: 60, // 音量
    isMuted: false, // 是否静音
    loopType: 0, // 0顺序播放、1随机播放、2单曲循环
    currentTime: 0, // 当前时长
    duration: 0, // 总时长
    timer: null, // 定时器
    isEnded: false, // 当前音频是否播放结束
  }),
  getters: {
    // 当前歌曲索引
    currentIndex: state => {
      const index = state.songList.findIndex(i => i.songId === state.currentSongInfo.songId)
      return index
    },
    // 随机数
    randomIndex(): number {
      let index;
      const randomIndex = Math.floor(Math.random() * this.songList.length)
      if (randomIndex === this.currentIndex) {
        index = Math.floor(Math.random() * this.songList.length)
      } else {
        index = randomIndex
      }
      return index;
    },
    // 上一首歌曲的索引值
    previousIndex(): number {
      let index: number = 0
      switch (this.loopType) {
        case 0:  // 顺序播放
          if (this.currentIndex === 0) {
            index = this.songList.length - 1
          } else {
            index = this.currentIndex - 1
          }
          break;
        case 1:  // 随机播放
          index = this.randomIndex
          break;
        case 2:  // 单曲循环
          index = this.currentIndex
          break;
      }
      return index
    },
    // 下一首歌曲得索引值
    nextIndex(): number {
      let index: number = 0
      switch (this.loopType) {
        case 0:
          if (this.currentIndex === this.songList.length - 1) {
            index = 0
          } else {
            index = this.currentIndex + 1
          }
          break;
        case 1:  
          index = this.randomIndex
          break;
        case 2:  
          index = this.currentIndex
          break;
      }
      return index
    },
  },
  actions: {
    // 获取歌曲url
    async getSongUrl (songInfo: CurrentSongInfoType) {
      console.log('当前播放歌曲的信息------', songInfo);
      this.currentSongInfo = songInfo;
      const { data }: any = await getSongUrlApi([songInfo.songId]);
      console.log("当前播放歌曲url接口的数据------", data)
      this.currentSongData = data;
      if (!data[0].url) {
        return ElNotification({ title: 'Warning', message: `<${songInfo.songName}>暂无音源.`, type: 'warning', duration: 2000});
      } else if (data[0].fee === 1) {
        ElNotification({ title: 'Warning', message: `<${songInfo.songName}>歌曲为VIP专享, 正在播放试听部分`, type: 'warning', duration: 2000});
      } else {
        ElNotification({ title: 'Success', message: `正在播放<${songInfo.songName}>`, type: 'success', duration: 2000});
      }
      this.init()
    },

    // 初始化
    init () {
      this.currentIndex === -1 && this.songList.push(this.currentSongInfo);
      this.audio.volume = this.volume / 100
      this.audio.src = this.currentSongData[0].url
      // this.currentTime = 0
      this.isPlay = true
      this.openTimer()
      // 音频可能未完全加载，使用定时器去获取音频时长
      setTimeout(() => {
        this.duration = Math.floor(this.audio.duration)
        this.audio.play()
      }, 1000)
    },

    // 开启定时器: 增加当前播放时间
    openTimer () {
      this.timer = setInterval(() => {
        this.currentTime = Math.round(this.audio.currentTime)
        // 当前歌曲播放结束
        if (this.audio.ended) {      
          this.isPlay = false
          clearInterval(this.timer)
          this.playNext()
        }
      }, 1000)
    },

    // 播放、暂停
    play () {
      if (this.songList.length === 0) {
        return ElNotification({ title: 'Warning', message: '播放列表暂无歌曲!', type: 'warning', duration: 2000});
      }
      this.isPlay = !this.isPlay
      if (this.isPlay) {
        this.audio.play()
        this.openTimer()
      } else {
        this.audio.pause()
        clearInterval(this.timer)
      }
    },

    // 播放上一首
    playPrevious () {
      if (this.songList.length === 0) {
        return ElNotification({ title: 'Warning', message: '播放列表暂无歌曲!', type: 'warning', duration: 2000});
      }
      const previousSongInfo = this.songList[this.previousIndex]
      this.getSongUrl(previousSongInfo)
    },

    // 播放下一首
    playNext () {
      if (this.songList.length === 0) {
        return ElNotification({ title: 'Warning', message: '播放列表暂无歌曲!', type: 'warning', duration: 2000});
      }
      const nextSongInfo = this.songList[this.nextIndex]
      this.getSongUrl(nextSongInfo)
    },

    // 改变播放类型
    changeLoopType (type: number) {
      this.loopType = type
    },

    // 静音、取消静音
    muted () {
      this.isMuted = !this.isMuted
      this.audio.muted = this.isMuted
      // this.isMuted ? this.audio.volume = 0 : this.audio.volume = this.volume / 100
    },

    // 改变音量
    changeVolume (volume: number) {
      this.audio.volume = volume / 100
    },

    // 改变当前歌曲播放时间
    changeTime (time: number) {
      this.currentTime = time
      this.audio.currentTime = time
    },

    // 清空歌单列表
    clearList () {
      this.restoreState()
      this.songList.length = 0
    },

    // 删除歌曲
    deleteSong (id: number) {
      this.songList = this.songList.filter(i => i.songId !== id)
    },

    // 还原state的数据
    restoreState () {
      this.audio.src = ''
      this.currentSongInfo = { songId: 0, songName: '', picUrl: '', duration: 0, artists: [] }
      this.currentSongData = []
      this.src =  ''
      this.isPlay =  false
      this.currentTime = 0
      // 解决音乐时长滑块没回到初始位置的问题
      nextTick(() => {
        this.duration = 0
      })
      clearInterval(this.timer)
    }
  }
});