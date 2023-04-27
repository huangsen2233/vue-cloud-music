import request from '@/utils/request';

/**
 * @description 所有榜单
 * @returns Promise
 */
export const toplistApi = () => {
  return request.get('/toplist')
}

/**
 * @description 所有榜单详情摘要
 * @returns Promise
 */
export const toplistDetailApi = () => {
  return request.get('/toplist/detail')
}

