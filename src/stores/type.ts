export interface IMusic {
  currentSongInfo: CurrentSongInfoType
  currentSongData: any[]
  songList: CurrentSongInfoType[]
  fee: number
  audio: any
  src: string 
  isPlay: boolean
  volume: number
  isMuted: boolean
  loopType: number
  currentTime: number
  duration: number
  timer: any
  isEnded: false
}

export type CurrentSongInfoType = {
  songId: number
  songName: string
  picUrl: string
  duration: number
  artists: any[]
}

export interface IUser {
  loginStatus: boolean
  account: any
  profile: any
}

export interface IVideo {
  videoUrl: string
  isMv: boolean
}
