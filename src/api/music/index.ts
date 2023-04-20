import request from '@/utils/request';

/**
* 获取音乐详情
* @param {Array} - ids 必选参数,音乐ID
* @returns Promise
*/
export const getSongDetailApi = (ids: [number]) => {
  return request.get(`/song/detail?ids=${ids}`)
}

/**
* 获取音乐url
* @param {Array} - id 必选参数,音乐id,可多个 ,用逗号隔开 
* @param {number} - br 可选参数，码率，默认 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
* @returns Promise
*/
export const getSongUrlApi = (id: number[]) => {
  return request.get(`/song/url?id=${id}`)
}
