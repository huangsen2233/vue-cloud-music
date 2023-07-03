<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import type { PaginationType, PaginationParamsType } from "../type";
  import { useUserStore } from "@/stores/user";
  import { useMusicStore } from "@/stores/music";
  import { commentLikeApi, commentApi } from "@/api/comment";
  import Comment from "@/components/comment/Comment.vue";

  const { profile } = storeToRefs(useUserStore());
  const { comments, hotComments, total, currentSongInfo } = storeToRefs(useMusicStore());
  const { getMusicComment } = useMusicStore();
  const currentCommentType = ref('new');
  const currentComment = ref<any[]>([]);
  const commentPagination = ref<PaginationType>({ total: 0, currentPage: 1, pageSize: 20 });
  const commentRef = ref<InstanceType<typeof Comment>>();
  const loading = ref<boolean>(false);

  // 切换评论类型
  const changeCommentType = (type: string) => {
    if (type === 'hot') {
      currentComment.value = hotComments.value
      currentCommentType.value = type
    } else {
      currentComment.value = comments.value
      currentCommentType.value = type
    }
  };

  watch(comments, (newVal, oldVal) => {
    changeCommentType(currentCommentType.value)
    commentPagination.value.total = total.value
  }, { deep: true, immediate: true });

  // 评论的分页改变
  const changeCommentPagination = ({ currentPage, pageSize }: PaginationParamsType) => {
    commentPagination.value = { ...commentPagination.value, currentPage, pageSize }
    const params = { id: currentSongInfo.value.songId, limit: pageSize, offset: (currentPage - 1) * pageSize }
    getMusicComment(params)
  };

  // 点赞歌曲评论
  const like = async (commentInfo: any) => {
    const likeParams = {
      id: currentSongInfo.value.songId,
      cid: commentInfo.commentId,
      t: commentInfo.liked ? 0 : 1,
      type: 0
    }
    const { code }: any = await commentLikeApi(likeParams)
    if (code === 200) {
      const commentParams = { 
        id: currentSongInfo.value.songId, 
        limit: commentPagination.value.pageSize, 
        offset: (commentPagination.value.currentPage - 1) * commentPagination.value.pageSize 
      }
      getMusicComment(commentParams).then(() => {
        if (commentInfo.liked) {
          ElMessage({ message: '取消点赞', type: 'success' })
        } else {
          ElMessage({ message: '点赞成功', type: 'success' })
        }
      })
    }
  };

  // 回复歌曲评论
  const reply = async (comment: string, commentId?: number) => {
    if (!commentId) {
      loading.value = true
    }
    const commentParams = {
      id: currentSongInfo.value.songId, 
      t: commentId ? 2 : 1, 
      type: 0, 
      content: comment,
      commentId: commentId ?? 0
    }
    const { code }: any = await commentApi(commentParams)
    if (code === 200) {
      const params = { 
        id: currentSongInfo.value.songId, 
        limit: commentPagination.value.pageSize, 
        offset: (commentPagination.value.currentPage - 1) * commentPagination.value.pageSize
      }
      // 定时器: 解决最新的评论没能及时返回的问题
      setTimeout(() => {
        getMusicComment(params).then(() => {
          commentId ? ElMessage({ message: '已回复评论', type: 'success' }) : ElMessage({ message: '已发送评论', type: 'success' }) 
          if (commentRef.value) {
            commentRef.value.myComment = ''
            commentRef.value.replyComment = ''
          }
        }).finally(() => {
          loading.value = false
        })
      }, 1500)
    }
  };
</script>

<template>
  <Comment
    ref="commentRef" 
    :avatar-url="profile.avatarUrl" 
    :current-comment-type="currentCommentType" 
    :current-comment="currentComment" 
    :comment-pagination="commentPagination"
    :loading="loading"
    @change-comment-type="changeCommentType"
    @change-comment-pagination="changeCommentPagination"
    @like="like"
    @reply="reply"
  />
</template>

<style lang="less" scoped>

</style>