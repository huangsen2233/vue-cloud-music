import request from '@/utils/request';

/**
 * @description 轮播图
 * @param {String} type 可选参数，资源类型, 0:pc, 1:android, 2:iphone, 3:ipad
 * @returns Promise
 */
export const getBannerApi = () => {
  return request.get('/banner?type=0')
}

/**
 * @description 推荐歌单
 * @param {Number} limit 可选参数，取出歌单数量 , 默认为 20
 * @returns Promise
 */
export const personalizedApi = (limit: number = 24) => {
  return request.get('/personalized', {
    params: { limit }
  })
}

/**
 * @description 推荐新音乐
 * @param {Number} limit 可选参数，取出音乐数量 , 默认为 10
 * @returns Promise
 */
export const newsongApi = (limit: number = 10) => {
  return request.get('/personalized/newsong', {
    params: { limit }
  })
}

type NewMvType = {
  area?: string
  limit?: number
}
/**
 * @description 新MV
 * @param {string} area 可选参数，可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {number} limit 可选参数，取出数量 , 默认为 20
 * @returns Promise
 */
export const getNewMvApi = ({ area, limit = 12 }: NewMvType) => {
  return request.get('/mv/first', {
    params: { area, limit }
  })
}

/**
 * @description 获取新歌速递
 * @param {number} type 必选参数，地区类型 id，对应以下:全部:0, 华语:7, 欧美:96, 日本:8, 韩国:16
 * @returns Promise
 */
export const getTopSongApi = (type: number = 7) => {
  return request.get('/top/song', {
    params: { type }
  })
}


