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
