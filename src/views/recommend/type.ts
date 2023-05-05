export type PlayListType = {
  id: number
  picUrl: string
  name: string
  playCount: number
}

export type NewSonglistType = {
  id: number
  picUrl: string
  name: string
  song: SongType
}

export type SongType = {
  artists: any[]
  duration: number
}