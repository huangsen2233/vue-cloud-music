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
 * @param {string} type     可选参数, 传 'mobile' 则返回移动端数据
 * @returns Promise
 */
export const searchSuggestApi = (keywords: string, type?: string) => {
  return request.get('/search/suggest', {
    params: { keywords, type }
  })
}

type SearchType = {
  keywords: string
  limit: number
  offset: number
  type: number
}
/**
 * @description 搜索，传入搜索关键词可以搜索该音乐/专辑/歌手/歌单/用户,关键词可以多个,以空格隔开, 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * @param {string} keywords 必选参数, 关键词
 * @param {number} limit    可选参数, 返回数量，默认30
 * @param {number} offset   可选参数, 偏移数量，用于分页 
 * @param {string} type     必选参数, 搜索类型, 默认 1 单曲；
 * 1:单曲, 10:专辑, 100:歌手, 1000:歌单, 1002:用户, 1004:MV, 1006:歌词, 1009:电台, 1014:视频, 1018:综合, 2000:声音
 * @returns Promise
 */
export const cloudSearchApi = ({ keywords, limit, offset, type }: SearchType) => {
  return request.get('/cloudsearch', {
    params: { keywords, limit, offset, type }
  })
}
