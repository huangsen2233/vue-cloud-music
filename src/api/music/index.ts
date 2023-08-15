import request from '@/utils/request';

/**
 * @description 获取音乐详情
 * @param {array} ids 必选参数,音乐ID
 * @returns Promise
 */
export const getSongDetailApi = (ids: [number]) => {
  return request.get(`/song/detail?ids=${ids}`)
}

/**
 * @description 获取音乐url
 * @param {array} id 必选参数,音乐id,可多个 ,用逗号隔开 
 * @param {number} br 可选参数，码率，默认 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * @returns Promise
 */
export const getSongUrlApi = (id: number[]) => {
  return request.get(`/song/url?id=${id}&br=320000`)
}

/**
 * @description 查看音乐是否可用 
 * @param {number} id 必选参数,音乐id 
 * @param {number} br 可选参数，码率，默认 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * @returns Promise
 */
export const checkSongApi = (id: number) => {
  return request.get('/check/music', {
    params: { id } 
  })
}

type MusicCommentType = {
  id: number
  limit?: number
  offset?: number
  before?: number
}
/**
 * @description 获取歌曲评论
 * @param {number} id 必选参数,音乐id 
 * @param {number} limit 可选参数，取出评论数量 , 默认为 20
 * @param {number} offset: 可选参数，偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {number} before: 可选参数，分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns Promise
 */
export const getMusicCommentApi = ({ id, limit = 20, offset = 0, before }: MusicCommentType) => {
  return request.get('/comment/music', {
    params: { id, limit, offset, before }
  })
}

type LikeMusiceType = {
  id: number
  like: boolean
}
/**
 * @description 喜欢音乐
 * @param {number} id 必选参数,音乐id 
 * @param {boolean} like 可选参数，默认true喜欢 , false不喜欢
 * @returns Promise
 */
export const likeMusicApi = ({ id, like }: LikeMusiceType) => {
  return request.get('/like', {
    params: { id, like }
  })
}

/**
 * @description 喜欢音乐列表
 * @param {number} id 必选参数,用户id 
 * @returns Promise
 */
export const likeListApi = (uid: number) => {
  return request.get('/likelist', {
    params: { uid }
  })
}

/**
 * @description 获取音乐歌词 
 * @param {number} id 必选参数,音乐id 
 * @returns Promise
 */
export const getLyricApi = (id: number) => {
  return request.get('/lyric', {
    params: { id }
  })
}

/**
 * @description 获取歌曲相关视频  
 * @param {number} songid 必选参数，歌曲id 
 * @param {number} mvid 可选参数，如果定义，此 mvid 对应的 MV 将会作为第一个返回。 limit : 取出的 Mlog 数量, 不包含第一个 mvid 
 * @returns Promise
 */
export const mlogMusicRcmdApi = (songid: number) => {
  return request.get('/mlog/music/rcmd', {
    params: { songid }
  })
}

/**
 * @description 获取客户端歌曲下载 url  
 * @param {number} id 必选参数，歌曲id，仅支持单首歌曲
 * @param {number} br 可选参数，码率, 默认设置了 999000 即最大码率, 如果要 320k 则可设置为 320000, 其他类推
 * @returns Promise
 */
export const songDownloadUrlApi = (id: number) => {
  return request.get('/song/download/url', {
    params: { id }
  })
}
