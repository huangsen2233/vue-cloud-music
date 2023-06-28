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
  likeIds: number[]
  comments: any[]
  hotComments: any[]
  total: number
  lyric: string
}

export type PaginationType = {
  id: number
  limit: number
  offset: number
}

export type PaginationParamsType = {
  currentPage: number
  pageSize: number
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
  collectPlaylists: any[]
}

export interface IVideo {
  videoUrl: string
  isMv: boolean
}
