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
 * @description 获取每日推荐歌单(需要登录)
 * @returns Promise
 */
export const recommendResourceApi = () => {
  return request.get('/recommend/resource')
}

/**
 * @description 获取每日推荐歌曲(需要登录)
 * @returns Promise
 */
export const recommendSongsApi = () => {
  return request.get('/recommend/songs')
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
