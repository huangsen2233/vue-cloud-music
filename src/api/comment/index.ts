import request from "@/utils/request";

type CommentLikeType = {
  id: number | string
  cid: number
  t: number
  type: number
}
/**
 * @description 给评论点赞
 * @param {number} id 必选参数，资源的id，例如歌曲的id，mv的id
 * @param {number} cid 必选参数，评论的id
 * @param {number} t 必选参数，是否点赞, 1为点赞, 0为取消点赞
 * @param {number} type 必选参数，资源类型 , 例如 0:歌曲，1:mv，2:歌单，3:专辑，4:电台，5:视频，6:动态
 * @returns Promise
 */
export const commentLikeApi = ({ id, cid, t, type }: CommentLikeType) => {
  return request.get('/comment/like', {
    params: { id, cid, t, type }
  })
}

type CommentType = {
  id: number
  t: number
  type: number
  content: string
  commentId?: number
}
/**
 * @description 发送评论
 * @param {number} id 必选参数，资源的id，例如歌曲的id，mv的id
 * @param {number} t 必选参数，1发送, 2回复
 * @param {number} type 必选参数，资源类型 , 例如 0:歌曲，1:mv，2:歌单，3:专辑，4:电台，5:视频，6:动态
 * @param {number} content 必选参数，发送的内容
 * @param {number} commentId  必选参数，回复的评论id，回复评论时必填
 * @returns Promise
 */
export const commentApi = ({ id, t, type, content, commentId }: CommentType) => {
  return request.get('/comment', {
    params: { id, t, type, content, commentId }
  })
}


