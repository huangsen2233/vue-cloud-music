import request from '@/utils/request';

/**
 * @description 轮播图
 * type 资源类型, 0:pc, 1:android, 2:iphone, 3:ipad
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
 * @description 获取推荐歌单
 * @returns Promise
 */
export const personalizedApi = (limit: number = 20) => {
  return request.get('/personalized', {
    params: { limit }
  })
}
