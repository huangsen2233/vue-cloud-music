export type MvDetailType = {
  artistName: string
  name: string
  desc: string
  playCount: number
  publishTime: string
  subCount: number
  shareCount: number
}

export type MvsType = {
  id: number
  artistName: string
  artistId: number
  name: string
  cover: string
  playCount: number
  duration: number
}

export type CommentMvType = {
  id: number
  limit: number
  offset: number
  before?: string
}

export type CommentVideoType = {
  id: string
  limit: number
  offset: number
  before?: string
}

export type PaginationPropType = {
  total: number
  currentPage: number
  pageSize: number
}