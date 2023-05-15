export type SearchType = {
  keywords: string
  limit: number
  offset: number
  type: number
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