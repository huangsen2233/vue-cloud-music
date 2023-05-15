export interface IUser {
  loginStatus: boolean
  account: any
  profile: any
}

export interface IMusic {
  currentSong: any[]
  allSong: any[]
  fee: number
}

export interface IVideo {
  videoUrl: string
  isMv: boolean
}
