import request from '@/utils/request';

/**
 * @description MV地址
 * @param {Number} id 必选参数，mv的id
 * @param {Number} r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
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

type commentMvType = {
  id: number
  limit: number
  offset: number
  before?: string
}

/**
 * @description 获取MV评论
* @param {number} - id 必选参数,mv的id
* @param {number} - limit 可选参数，取出评论数量 , 默认为 20
* @param {number} - offset: 可选参数，偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
* @param {number} - before: 可选参数，分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
* @returns Promise
*/
export const getCommentMvApi = ({ id, limit = 20, offset = 0, before }: commentMvType) => {
  return request.get('/comment/mv', {
    params: { id, limit, offset, before }
  })
}
