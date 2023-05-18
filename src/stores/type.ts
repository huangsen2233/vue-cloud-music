export interface IUser {
  loginStatus: boolean
  account: any
  profile: any
}

export type CurrentSongInfoType = {
  songId: number
  songName: string
  picUrl: string
  duration: number
  artists: any[]
}

export interface IMusic {
  currentSongInfo: CurrentSongInfoType
  currentSongData: any[]
  songList: CurrentSongInfoType[]
  fee: number
}

export interface IVideo {
  videoUrl: string
  isMv: boolean
}
