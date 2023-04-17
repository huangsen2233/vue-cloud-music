import request from '@/utils/request';

/**
* 获取音乐详情
* @param {Array} - ids 必选参数,音乐ID
* @returns Promise
*/
export const getSongDetailApi = (ids: [number]) => {
  return request.get(`/song/detail?ids=${ids}`)
}