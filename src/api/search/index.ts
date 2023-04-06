import request from '@/utils/request';

/**
 * @description 热搜详细列表
 * @returns Promise
 */
export const searchHotApi = () => {
  return request.get('/search/hot/detail')
}