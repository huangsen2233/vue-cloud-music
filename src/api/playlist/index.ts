import request from '@/utils/request';

/**
 * @description 歌单(网友精选碟歌单)
 * @param {string} order 可选参数，可选值为 'new' 和 'hot', 分别对应最新和最热, 默认为 'hot'
 * @param {string} cat 可选参数，tags，比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部"
 * @param {number} limit 可选参数，取出歌单数量 , 默认为 50
 * @param {number} offset 可选参数，偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @returns Promise
 */
export const playlistApi = ({ limit = 30, order = 'hot', cat = '全部', offset = 30 }) => {
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

type PlaylistDetailType = {
  id: number
  s?: number
}
/**
 * @description 获取歌单详情
 * @param {number} id 必选参数，歌单 id
 * @param {number} s 可选参数，歌单最近的收藏者,默认为 8
 * @returns Promise
 */
export const playlistDetailApi = ({ id, s = 8 }: PlaylistDetailType) => {
  return request.get('/playlist/detail', {
    params: { id, s }
  })
}

type PlaylistCommentType = {
  id: number
  limit?: number
  offset?: number
  before?: number
}
/**
 * @description 获取歌单评论
 * @param {number} id 必选参数,歌单id
 * @param {number} limit 可选参数，取出评论数量 , 默认为 20
 * @param {number} offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {number} before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns Promise
*/
export const playlistCommentApi = ({ id, limit = 20, offset = 0, before }: PlaylistCommentType) => {
  return request.get('/comment/playlist', {
    params: { id, limit, offset, before }
  })
}

type PlaylistSubscribersType = {
  id: number
  limit?: number
  offset?: number
}
/**
 * @description 歌单收藏者
* @param {number} id 必选参数,歌单id
* @param {number} limit 可选参数，取出的数量 , 默认为 20
* @param {number} offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
* @returns Promise
*/
export const playlistSubscribersApi = ({ id, limit = 20, offset = 0 }: PlaylistSubscribersType) => {
  return request.get('/playlist/subscribers', {
    params: { id, limit, offset }
  })
}

type PlaylistSubscribeType = {
  id: number
  t: number
}
/**
 * @description 收藏、取消收藏歌单
* @param {number} id 必选参数,歌单id
* @param {number} t  必选参数，1收藏，2取消收藏
* @returns Promise
*/
export const playlistSubscribeApi = ({ id, t }: PlaylistSubscribeType) => {
  return request.get('/playlist/subscribe', {
    params: { id, t } 
  })
}

