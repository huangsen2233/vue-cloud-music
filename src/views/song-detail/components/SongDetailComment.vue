<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { useUserStore } from "@/stores/user";
  import { useMusicStore } from "@/stores/music";
  import Comment from "@/components/comment/Comment.vue";
  import dianzanIcon from "@/assets/imgs/dianzan.png";

  type PaginationType = {
    currentPage: number
    pageSize: number
    total: number
  }

  type PaginationParamsType = {
    currentPage: number
    pageSize: number
  }
  
  const { profile } = storeToRefs(useUserStore())
  const { comments, hotComments, total, currentSongInfo } = storeToRefs(useMusicStore())
  watch(comments, (newVal, oldVal) => {
    currentComment.value = newVal 
  })
  const { getMusicComment } = useMusicStore()
  const currentCommentType = ref('new')
  const currentComment = ref<any[]>(comments.value)
  const commentPagination = ref<PaginationType>({ total: total.value, currentPage: 1, pageSize: 20 })
  const arr = ref<any>([{id:1, name:'a'}, {id:2, name:'b'}])

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

  // 评论的分页改变
  const changeCommentPagination = ({ currentPage, pageSize }: PaginationParamsType) => {
    commentPagination.value = { ...commentPagination.value, currentPage, pageSize }
    const params = { id: currentSongInfo.value.songId, limit: pageSize, offset: (currentPage - 1) * pageSize }
    getMusicComment(params)
  };
</script>

<template>
  <div class="comment">
    <Comment 
      :profile="profile" 
      :current-comment-type="currentCommentType" 
      :current-comment="currentComment" 
      :comment-pagination="commentPagination"
      :dianzan-icon="dianzanIcon"
      @change-comment-type="changeCommentType"
      @change-comment-pagination="changeCommentPagination"
    />
  </div>
</template>

<style lang="less" scoped>

</style>