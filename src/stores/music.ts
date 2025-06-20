import { nextTick, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { getSongUrlApi, likeMusicApi, likeListApi, getMusicCommentApi, getLyricApi } from "@/api/music";
import { useUserStore } from "@/stores/user";
import localCache from "@/utils/cache";
import type { IMusic, CurrentSongInfoType, PaginationType } from "./type";

export const useMusicStore = defineStore('music', {
  state: (): IMusic => ({
    currentSongInfo: { songId: 0, songName: '', picUrl: '', duration: 0, artists: [] },
    currentSongData: [],
    songList: [], // 歌单列表
    fee: 0,  // 0 8是普通用户，1是vip用户
    audio: new Audio(),
    src: '', // 音频地址
    isPlay: false, // 是否播放
    volume: 30, // 音量
    isMuted: false, // 是否静音
    loopType: 0, // 0顺序播放、1随机播放、2单曲循环
    currentTime: 0, // 当前时长
    duration: 0, // 总时长
    timer: null, // 定时器
    isEnded: false, // 当前音频是否播放结束
    likeIds: [], // 喜欢的歌曲列表
    comments: [], // 最新评论
    hotComments: [], // 热门评论
    total: 0, // 评论总数量
    lyric: '', // 歌词
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
    // 歌曲是否喜欢
    isLike: (state) => {
      return (id: number) => {
        const findItem = state.likeIds.find((likeid: number) => likeid === id)
        if (findItem) {
          return true
        } else {
          return false
        }
      }
    }
  },
  actions: {
    // 获取歌曲url
    async getSongUrl (songInfo: CurrentSongInfoType) {
      const { songId } = songInfo
      const { data }: any = await getSongUrlApi([songId])
      console.log("🚀 ~ file: music.ts:101 ~ getSongUrl ~ 音乐的url:", data)
      if (!data[0].url) {
        return ElNotification({ title: 'Warning', message: `<${songInfo.songName}>暂无音源.`, type: 'warning', duration: 2000})
      } else if (data[0].fee === 1) {
        ElNotification({ title: 'Warning', message: `<${songInfo.songName}>歌曲为VIP专享, 正在播放试听部分`, type: 'warning', duration: 2000})
      } else {
        ElNotification({ title: 'Success', message: `正在播放<${songInfo.songName}>`, type: 'success', duration: 2000})
      }
      this.currentSongData = data
      this.currentSongInfo = songInfo
    },

    // 初始化音乐栏
    init () {
      this.currentIndex === -1 && this.songList.push(this.currentSongInfo);
      this.audio.volume = this.volume / 100
      this.audio.src = this.currentSongData[0].url
      this.openTimer()
      // 音频可能未完全加载，使用定时器去获取音频时长
      setTimeout(() => {
        this.duration = Math.floor(this.audio.duration)
        this.audio.play()
        this.isPlay = true
      }, 1000)
    },

    // 开启定时器: 增加当前播放时间
    openTimer () {
      this.timer = setInterval(() => {
        this.currentTime = this.audio.currentTime
        // 当前歌曲播放结束
        if (this.audio.ended) {      
          this.isPlay = false
          clearInterval(this.timer)
          this.playNext()
        }
      }, 200)
    },

    // 播放、暂停
    play () {
      if (this.songList.length === 0) {
        return ElNotification({ title: 'Warning', message: '播放列表暂无歌曲!', type: 'warning', duration: 2000 });
      } else if (this.currentSongInfo.songId === 0) {
        return ElNotification({ title: 'Warning', message: '请先选择需要播放的歌曲!', type: 'warning', duration: 2000 });
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
    },

    // 获取喜欢的歌曲列表
    async likeList () {
      const { account, loginStatus } = storeToRefs(useUserStore())
      if (loginStatus.value) {
        const { ids }: any = await likeListApi(account.value.id)
        this.likeIds = ids
      }
      // console.log("🚀 ~ file: music.ts:217 ~  ~ 喜欢歌曲列表:", ids)
    },

    // 是否喜欢歌曲
    async likeMusic (id: number) {
      if (!id) return
      if (this.isLike(id)) {
        ElMessage({ message: '取消喜欢!', type: 'success' })
        const index = this.likeIds.findIndex(likeid => likeid === id)
        this.likeIds.splice(index, 1)
      } else {
        ElMessage({ message: '成功添加喜欢!', type: 'success' })
        this.likeIds.push(id)
      }
      likeMusicApi({ id, like: this.isLike(id) })
    },

    // 获取歌曲的评论
    async getMusicComment (params: PaginationType) {
      const { comments, hotComments, total }: any = await getMusicCommentApi(params)
      this.comments = comments
      if (hotComments) {
        this.hotComments = hotComments
      }
      this.total = total
      // console.log("🚀 ~ file: music.ts:254 ~  ~ 当前歌曲的最新评论:", comments)
      // console.log("🚀 ~ file: music.ts:254 ~  ~ 当前歌曲的热门评论:", hotComments)
      // console.log("🚀 ~ file: music.ts:254 ~  ~ 评论的总数:", total)      
    },

    // 获取音乐歌词
    async getLyric (id: number) {
      const { lrc: { lyric } }: any = await getLyricApi(id)
      this.lyric = lyric
    },

    // 添加一首或多首歌曲到播放列表
    addToPlaylist (songInfo: CurrentSongInfoType | CurrentSongInfoType[]) {
      if (songInfo instanceof Array) {
        songInfo.forEach(i => {
          const index = this.songList.findIndex(j => j.songId === i.songId)
          index === -1 && this.songList.push(i)
        })
        ElMessage({ message: `已全部添加到播放列表`, type: 'success' })
      } else {
        const index = this.songList.findIndex(i => i.songId === songInfo.songId)
        if (index === -1) {
          ElMessage({ message: `<${songInfo.songName}>成功添加到播放列表`, type: 'success' })
          this.songList.push(songInfo);
        } else {
          ElMessage({ message: `播放列表已有<${songInfo.songName}>, 请勿重复添加`, type: 'warning' })
        }
      }
    },
  }
});

export const watchMusicInit = () => {
  const { init, likeList, getMusicComment, getLyric } = useMusicStore()
  const { currentSongInfo, currentSongData, likeIds, songList } = storeToRefs(useMusicStore())
  
  // 音乐切换后的初始化相关数据
  watch(currentSongInfo, (newSongInfo, oldSongInfo) => {
    if (newSongInfo.songId === 0 || !currentSongData.value[0].url) return
    init()
    likeIds.value.length === 0 && likeList()
    getMusicComment({ id: newSongInfo.songId, limit: 20, offset: 0})
    getLyric(newSongInfo.songId)
  }, { deep: true });

  // 本地缓存的歌单列表
  watch(() => songList.value.length, (newLength, oldLength) => {
    localCache.setCache('songList', songList.value)
  });
}