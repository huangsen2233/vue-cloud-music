import request from '@/utils/request';

/**
 * @description 歌单(网友精选碟歌单)
 * @param {String} order 可选参数，可选值为 'new' 和 'hot', 分别对应最新和最热, 默认为 'hot'
 * @param {String} cat 可选参数，tags，比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
 * @param {String} limit 可选参数，取出歌单数量 , 默认为 50
 * @param {String} offset 可选参数，偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @returns Promise
 */
// limit: number = 50, order: string = 'hot', cat: string = '全部', offset: number = 50
export const playlistApi = ({ limit = 50, order = 'hot', cat = '全部', offset = 50 }) => {
  return request.get('/top/playlist', {
    params: { order, cat, limit, offset }
  })
}

/**
 * @description 歌单分类
 * @returns Promise
 */
export const playlistCatlistApi = () => {
  return request.get('/playlist/catlist')
}

/**
 * @description 热门歌单分类
 * @returns Promise
 */
export const playlistHotApi = () => {
  return request.get('/playlist/hot')
}

/**
 * @description 精品歌单标签列表
 * @returns Promise
 */
export const highqualityTagsApi = () => {
  return request.get('/playlist/highquality/tags')
}

