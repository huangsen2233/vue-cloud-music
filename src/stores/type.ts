export interface IUser {
  loginStatus: boolean
  account: any
  profile: any
}

export type CurrentSongInfoType = {
  id: number
  picUrl: string
  name: string
  song: SongType
}

type SongType = {
  artists: any[]
  duration: number
}
export interface IMusic {
  currentSongInfo: CurrentSongInfoType
  songData: any[]
  fee: number
}

export interface IVideo {
  videoUrl: string
  isMv: boolean
}
