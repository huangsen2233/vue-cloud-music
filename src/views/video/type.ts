export type MvDetailType = {
  artistName: string
  name: string
  desc: string
  playCount: number
  publishTime: string
  subCount: number
  shareCount: number
  likedCount: number
}

export type MvsType = {
  id: number
  name: string
  cover: string
  playCount: number
  duration: number
  artistName?: string
  artistId?: number
  userName?: string
  userId?: number
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

export type PaginationParamsType = {
  currentPage: number
  pageSize: number
}