import request from '@/utils/request';

/**
 * @description MV地址
 * @param {Number} id 必选参数，mv的id
 * @param {Number} r  分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 * @returns Promise
 */
export const getMvUrlApi = (id: number) => {
  return request.get('/mv/url', {
    params: { id }
  })
}

/**
 * @description MV详情
 * @param {Number} id 必选参数，mv的id
 * @returns Promise
 */
export const getMvDetailApi = (mvid: number) => {
  return request.get('/mv/detail', {
    params: { mvid }
  })
}

/**
 * @description 相似MV
 * @param {Number} mvid 必选参数，mv的id
 * @returns Promise
 */
export const getSimiMvApi = (mvid: number) => {
  return request.get('/simi/mv', {
    params: { mvid }
  })
}

type CommentMvType = {
  id: number
  limit: number
  offset: number
  before?: string
}

/**
 * @description 获取MV评论
* @param {number} id     必选参数,mv的id
* @param {number} limit  可选参数，取出评论数量 , 默认为 20
* @param {number} offset 可选参数，偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
* @param {number} before 可选参数，分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
* @returns Promise
*/
export const getCommentMvApi = ({ id, limit = 20, offset = 0, before }: CommentMvType) => {
  return request.get('/comment/mv', {
    params: { id, limit, offset, before }
  })
}

/**
 * @description 获取MV点赞评论转发
 * @param {Number} id 必选参数，mv的id
 * @returns Promise
 */
export const getMvDetailInfoApi = (mvid: number) => {
  return request.get('/mv/detail/info', {
    params: { mvid }
  })
}

/**
 * @description 视频详情
 * @param {string} id 必选参数，视频的id
 * @returns Promise
 */
export const getVideoDetailApi = (id: string) => {
  return request.get('/video/detail', {
    params: { id }
  })
}

/**
 * @description 视频播放地址
 * @param {string} id 必选参数，视频的id
 * @returns Promise
 */
export const getVideoUrlApi = (id: string) => {
  return request.get('/video/url', {
    params: { id }
  })
}

type CommentVideoType = {
  id: string
  limit: number
  offset: number
  before?: string
}
/**
 * @description 获取视频评论
* @param {string} id     必选参数,视频的id
* @param {number} limit  可选参数，取出评论数量 , 默认为 20
* @param {number} offset 可选参数，偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
* @param {number} before 可选参数，分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
* @returns Promise
*/
export const getCommentVideoApi = ({ id, limit = 20, offset = 0, before }: CommentVideoType) => {
  return request.get('/comment/video', {
    params: { id, limit, offset, before }
  })
}

/**
 * @description 相关视频
 * @param {string} id 必选参数，视频的id
 * @returns Promise
 */
export const getRelatedVideoApi = (id: string) => {
  return request.get('/related/allvideo', {
    params: { id }
  })
}

/**
 * @description 获取视频的点赞评论转发
 * @param {string} vid 必选参数，mv的id
 * @returns Promise
 */
export const getVideoDetailInfoApi = (vid: string) => {
  return request.get('/video/detail/info', {
    params: { vid }
  })
}

