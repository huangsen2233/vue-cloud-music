export type artistsType = {
  limit: number
  offset: number
  initial: string
  type: number
  area: number
};

export type titleType = {
  title: string
  type: number
  area: number
};

export type offsetType = {
  currentPage: number
  pageSize: number
};

export type initialType = {
  initial: string
};

export type paginationType = {
  total: number
  currentPage: number
  pageSize: number
}