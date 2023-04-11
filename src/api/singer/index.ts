import request from '@/utils/request';

/**
 * @description 歌手分类列表
 * @param {String} limit 可选参数，返回数量 , 默认为 30
 * @param {String} offset 可选参数，偏移数量，用于分页 , 默认为 0
 * @param {String} initial 可选参数，按首字母索引查找参数, 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列; 热门传-1; #传0
 * @param {String} type 可选参数，-1:全部，1:男歌手，2:女歌手，3:乐队
 * @param {String} area 可选参数，-1:全部，7:华语，96:欧美，8:日本，16韩国，0:其
 * @returns Promise
 */
export const artistApi = ({ limit = 30, offset = 0, initial = 0, type = -1, area = -1 }) => {
  return request.get('/artist/list', {
    params: { limit, offset, initial, type, area }
  })
}

type artistsType = {
  limit?: number
  offset?: number
  initial?: string
  type?: number
  area?: number
};
