import request from '@/utils/request';

/**
 * @description 获取账号信息
 * @returns Promise
 */
export const getUserAccountApi = () => {
  return request.get('/user/account')
}

/**
 * @description 获取用户详情
 * @param {number} uid 必选参数,用户id
 * @returns Promise
 */
export const getUserDetailApi = (uid: number) => {
  return request.get('/user/detail', {
    params: { uid }
  })
}

/**
 * @description 获取用户信息、歌单、收藏、MV、dj等的数量
 * @param {number} uid 必选参数,用户id
 * @returns Promise
 */
export const getUserSubcountApi = () => {
  return request.get('/user/subcount')
}

type UserPlaylistType = {
  uid: number
  limit?: number
  offset?: number
}
/**
 * @description 获取用户歌单
 * @param {number} uid 必选参数,用户id
 * @param {number} limit 可选参数，取出的数量 , 默认为 30
 * @param {number} offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*30, 其中 30 为 limit 的值，默认0
 * @returns Promise
*/
export const getUserPlaylistApi = ({ uid, limit = 30, offset = 0 }: UserPlaylistType) => {
  return request.get('/user/playlist', {
    params: { uid, limit, offset }
  })
}

type UserFollowedsType = {
  uid: number
  limit?: number
  offset?: number
}
/**
 * @description 获取用户粉丝列表
 * @param {number} uid 必选参数,用户id
 * @param {number} limit 可选参数，取出的数量 , 默认为 30
 * @param {number} offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*30, 其中 30 为 limit 的值，默认0
 * @returns Promise
*/
export const getUserFollowedsApi = ({ uid, limit = 30, offset = 0 }: UserFollowedsType) => {
  return request.get('/user/followeds', {
    params: { uid, limit, offset }
  })
}

type UserRecordType = {
  uid: number
  type?: number
}
/**
 * @description 获取用户播放记录
 * @param {number} uid 必选参数,用户id
 * @param {number} type 可选参数，type=1 时只返回 weekData, type=0 时返回 allData
 * @returns Promise
*/
export const getUserRecordApi = ({ uid, type = 1}: UserRecordType) => {
  return request.get('/user/record', {
    params: { uid, type }
  })
}
