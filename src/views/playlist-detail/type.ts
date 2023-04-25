export type PlaylistCommentType = {
  id: number
  limit: number
  offset: number
  before?: number
}

export type PaginationType = {
  currentPage: number
  pageSize: number
  total: number
}

export type PaginationParamsType = {
  currentPage: number
  pageSize: number
}

export type PlaylistSubscribersType = {
  id: number
  limit: number
  offset: number
}