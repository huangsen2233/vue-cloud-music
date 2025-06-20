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
// export const getUserRecordApi = ({ uid, type = 1}: UserRecordType) => {
//   return request.get('/user/record', {
//     params: { uid, type }
//   })
// }

/**
 * @description 最近播放歌曲
 * @param {number} limit 可选参数，返回数量。默认100
 * @returns Promise
*/
export const getRecentSongApi = (limit: number = 100) => {
  return request.get('/record/recent/song', {
    params: { limit }
  })
}

type UserFollowsType = {
  uid: number
  limit?: number
  offset?: number
}
/**
 * @description 获取用户关注列表
 * @param {number} uid 必选参数,用户id
 * @param {number} limit 可选参数，取出的数量 , 默认为 30
 * @param {number} offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*30, 其中 30 为 limit 的值，默认0
 * @returns Promise
*/
export const getUserFollowsApi = ({ uid, limit = 30, offset = 0 }: UserFollowsType) => {
  return request.get('/user/follows', {
    params: { uid, limit, offset }
  })
}

type FollowType = {
  id: number
  t: number
}
/**
 * @description 关注、取消关注
 * @param {number} id 必选参数,用户id
 * @param {number} t 必选参数，1关注，其它取消关注
 * @returns Promise
*/
export const followApi = ({ id, t }: FollowType) => {
  return request.get('/follow', {
    params: { id, t }
  })
}

type avatarType = {
  formData: FormData
  imgSize?: number
  imgX?: number
  imgY?: number
}
/**
 * @description 上传头像
 * @param {number} imgSize 可选参数,图片尺寸,默认为 300
 * @param {number} imgX 可选参数,水平裁剪偏移,方形图片可不传,默认为 0 
 * @param {number} imgY 可选参数,垂直裁剪偏移,方形图片可不传,默认为 0
 * @returns Promise
*/
export const uploadAavatarApi = (params: any) => {
  return request.post('/avatar/upload', params, { 'Content-Type': 'multipart/form-data' })
}
