export type ArtistSongType = {
  id: number
  order: string
  limit: number
  offset: number
}

export type ArtistAlbumType = {
  id: number
  limit: number
  offset: number
}

export type PaginationPropType = {
  total: number
  currentPage: number
  pageSize: number
}

export type MvType = {
  cover: string
  playCount: number 
  duration: number 
  id: number | string, 
  name: string 
  artistId: number 
  artistName: string 
  publishTime?: string
}