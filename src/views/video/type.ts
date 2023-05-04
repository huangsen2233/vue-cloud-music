export type MvDetailType = {
  artistName: string
  name: string
  desc: string
  playCount: number
  publishTime: string
}

export type MvsType = {
  id: number
  artistName: string
  name: string
  cover: string
  playCount: number
  duration: number
}

export type commentMvType = {
  id: number
  limit: number
  offset: number
  before?: string
}

export type PaginationPropType = {
  total: number
  currentPage: number
  pageSize: number
}