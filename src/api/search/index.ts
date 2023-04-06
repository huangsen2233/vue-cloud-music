import request from '@/utils/request';

/**
 * @description 热搜列表
 * @returns Promise
 */
export const searchHotApi = () => {
  return request.get('/search/hot/detail')
}