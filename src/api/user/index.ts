import request from '@/utils/request';

/**
 * @description 获取账号信息
 * @param { String }
 * @returns Promise
 */
export const getUserAccountApi = () => {
  return request.get('/user/account')
}