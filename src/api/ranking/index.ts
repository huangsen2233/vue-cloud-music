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

/**
 * @description 歌手榜
 * @param {Number} 可选参数，type:地区 1: 华语 2: 欧美 3: 韩国 4: 日本，默认 1
 * @returns Promise
 */
export const toplistArtistApi = (type?: number) => {
  return request.get('/toplist/artist', {
    params: { type: type }
  })
}


