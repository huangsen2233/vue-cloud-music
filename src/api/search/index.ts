import request from '@/utils/request';

/**
 * @description 热搜详细列表
 * @returns Promise
 */
export const searchHotApi = () => {
  return request.get('/search/hot/detail')
}

/**
 * @description 搜索建议，搜索结果同时包含单曲 , 歌手 , 歌单信息
 * @param {string} keywords 必选参数, 关键词
 * @param {string} type 可选参数, 传 'mobile' 则返回移动端数据
 * @returns Promise
 */
export const searchSuggestApi = (keywords: string) => {
  return request.get('/search/suggest', {
    params: { keywords }
  })
}