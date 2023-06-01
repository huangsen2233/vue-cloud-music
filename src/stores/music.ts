import { defineStore } from "pinia";
import type { IMusic, CurrentSongInfoType } from "./type";
import { getSongUrlApi } from "@/api/music";

export const useMusicStore = defineStore('music', {
  state: (): IMusic => ({
    currentSongInfo: { songId: 0, songName: 'i want to know you ever', picUrl: '', duration: 0, artists: [] },
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
  actions: {
    // 初始化
    init () {
      this.audio.volume = this.volume / 100
      this.audio.src = this.currentSongData[0].url
      this.audio.play()
      this.isPlay = true
      if (this.isPlay) {
        this.openTimer()
      }
      // 音频可能未完全加载，使用定时器去获取音频时长
      setTimeout(() => {
        this.duration = Math.floor(this.audio.duration)
      }, 500)
    },

    // 开启定时器: 增加当前播放时间
    openTimer () {
      this.timer = setInterval(() => {
        this.currentTime += 1
        if (this.currentTime === this.duration) {
          // 根据播放模式播放其它歌曲

        }
      }, 1000)
    },

    // 清除定时器：停止增加当前播放时间
    clearTimer () {
      clearInterval(this.timer)
    },

    // 获取歌曲url
    async getSongUrl (songInfo: CurrentSongInfoType) {
      console.log('当前播放歌曲的信息------', songInfo);
      this.currentSongInfo = songInfo;
      const result: any = await getSongUrlApi([songInfo.songId]);
      console.log("🚀 ~ file: music.ts:14 ~ getSongUrl ~ result: 音乐url", result)
      this.currentSongData = result.data;
      this.fee = result.data[0].fee;  
      if (!result.data[0].url) {
        return ElNotification({ title: 'Warning', message: `<${songInfo.songName}>暂无音源.`, type: 'warning', duration: 2000});
      } else if (this.fee === 1) {
        ElNotification({ title: 'Warning', message: `该歌曲为VIP专享, 正在播放<${songInfo.songName}>试听部分`, type: 'warning', duration: 2000});
      } else {
        ElNotification({ title: 'Success', message: `正在播放<${songInfo.songName}>`, type: 'success', duration: 2000});
        const index = this.songList.findIndex(i => i.songId === songInfo.songId)
        index === -1 && this.songList.push(songInfo);
      }

      this.init()
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
        this.clearTimer()
      }
    },

    // 播放上一首
    playPrevious () {
      console.log('播放上一首');
      if (this.loopType === 0) {
        const findIndex = this.songList.findIndex(i => i.songId === this.currentSongInfo.songId)
        if (findIndex === 0) {
          this.getSongUrl(this.songList[this.songList.length - 1])
        } else {
          this.getSongUrl(this.songList[findIndex - 1])
        }
      } else if (this.loopType === 1) {
        this.randomPlay()
      } else {
        // 单曲循环
        // audio的属性loop
      }
    },

    // 播放下一首
    playNext () {
      console.log('播放下一首');
      if (this.loopType === 0) {
        const findIndex = this.songList.findIndex(i => i.songId === this.currentSongInfo.songId)
        if (findIndex === this.songList.length - 1) {
          this.getSongUrl(this.songList[0])
        } else {
          this.getSongUrl(this.songList[findIndex + 1])
        }
      } else if (this.loopType === 1) {
        this.randomPlay()
      } else {
        // 单曲循环
        
      }
    },

    // 随机播放
    randomPlay () {
      const randomIndex = Math.floor(Math.random() * this.songList.length)
      const findIndex = this.songList.findIndex(i => i.songId === this.currentSongInfo.songId)
      if (randomIndex === findIndex) {
        this.randomPlay()
      } else {
        this.getSongUrl(this.songList[randomIndex])
      }
    },

    // 顺序播放
    sequencePlay () {
      const findIndex = this.songList.findIndex(i => i.songId === this.currentSongInfo.songId)
      if (findIndex === 0) {
        this.getSongUrl(this.songList[this.songList.length - 1])
      } else {
        this.getSongUrl(this.songList[findIndex - 1])
      }
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
      console.log("当前时长", time)
      this.currentTime = time
      this.audio.currentTime = time
    },

    // 清空歌单列表
    clearList () {
      this.songList.length = 0;
    },
  }
});