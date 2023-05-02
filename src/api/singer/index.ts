import request from '@/utils/request';

type artistsType = {
  limit: number
  offset: number
  initial: string
  type: number
  area: number
};

/**
 * @description 歌手分类列表
 * @param {Number} limit 可选参数，返回数量 , 默认为 30
 * @param {Number} offset 可选参数，偏移数量，用于分页 , 默认为 0
 * @param {String} initial 可选参数，按首字母索引查找参数, 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列; 热门传-1; #传0
 * @param {Number} type 可选参数，-1:全部，1:男歌手，2:女歌手，3:乐队
 * @param {Number} area 可选参数，-1:全部，7:华语，96:欧美，8:日本，16韩国，0:其
 * @returns Promise
 */
export const artistApi = ({ limit = 30, offset = 0, initial = '-1', type = -1, area = -1 }: artistsType) => {
  return request.get('/artist/list', {
    params: { limit, offset, initial, type, area }
  })
}

/**
 * @description 歌手详情
 * @param {Number} id 必选参数，歌手id
 * @returns Promise
 */
export const getArtistDetailApi = (id: number) => {
  return request.get('/artist/detail', {
    params: { id }
  })
}

/**
 * @description 歌手单曲-可获得歌手部分信息和热门歌曲
 * @param {Number} id 必选参数，歌手id
 * @returns Promise
 */
export const getArtistApi = (id: number) => {
  return request.get('/artists', {
    params: { id }
  })
}

type ArtistAlbumType = {
  id: number
  limit: number
  offset: number
}

/**
 * @description 歌手专辑
 * @param {Number} id 必选参数，歌手id
 * @param {Number} limit 可选参数，返回数量 , 默认为 30
 * @param {Number} offset 可选参数，偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @returns Promise
 */
export const getArtistAlbumApi = ({ id, limit = 30, offset = 0 }: ArtistAlbumType) => {
  return request.get('/artist/album', {
    params: { id, limit, offset }
  })
}

/**
 * @description 获取专辑内容
 * @param {Number} id 必选参数，专辑id
 * @returns Promise
 */
export const getAlbumApi = (id: number) => {
  return request.get('/album', {
    params: { id }
  })
}

/**
 * @description 歌手MV     具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?id=6452,/mv?mvid=5461064
 * @param {Number} id 必选参数，歌手id
 * @returns Promise
 */
export const getArtistMvApi = (id: number) => {
  return request.get('/artist/mv', {
    params: { id }
  })
}

/**
 * @description 歌手描述
 * @param {Number} id 必选参数，歌手id
 * @returns Promise
 */
export const getArtistDescApi = (id: number) => {
  return request.get('/artist/desc', {
    params: { id }
  })
}

/**
 * @description 获取相似歌手
 * @param {Number} id 必选参数，歌手id
 * @returns Promise
 */
export const getArtistSimiApi = (id: number) => {
  return request.get('/simi/artist', {
    params: { id }
  })
}

type artistSongType = {
  id: number
  order: string
  limit: number
  offset: number
}

/**
 * @description 歌手全部歌曲
 * @param {Number} id 必选参数，歌手id
 * @param {String} order hot ,time 按照热门或者时间排序
 * @param {Number} limit 可选参数，取出的歌单数量 , 默认为50
 * @param {Number} offset 可选参数，偏移数量，用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @returns Promise
 */
export const getArtistSongApi = ({ id, order = 'hot', limit = 50, offset = 0 }: artistSongType) => {
  return request.get('/artist/songs', {
    params: { id, order, limit, offset }
  })
}