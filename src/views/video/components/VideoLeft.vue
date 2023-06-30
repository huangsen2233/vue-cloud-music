<script lang="ts" setup>
  import { ref } from 'vue';
  import { commentLikeApi } from "@/api/comment";
  import Comment from '@/components/comment/Comment.vue';
  import type { MvDetailType, PaginationPropType, PaginationParamsType } from "../type";

  const props = defineProps<{
    videoId: number | string
    videoUrl: string
    isMv: boolean
    mvDetail: MvDetailType
    profile: any
    currentCommentType: string
    currentComment: any[]
    commentPagination: PaginationPropType
  }>();

  const emits = defineEmits<{
    (event: 'change-comment-pagination', params: PaginationParamsType): void
    (event: 'change-comment-type', params: string): void
  }>();

  // 切换评论类型
  const changeCommentType = (type: string) => {
    emits('change-comment-type', type)
  };

  // 评论的分页事件
  const changeCommentPagination = (params: PaginationParamsType) => {
    emits('change-comment-pagination', params);
  };

  // 点赞MV的评论
  const like = async (commentInfo: any) => {
    const likeParams = {
      id: props.videoId,
      cid: commentInfo.commentId,
      t: commentInfo.liked ? 0 : 1,
      type: props.isMv ? 1 : 5
    }
    const { code }: any = await commentLikeApi(likeParams)
    if (code === 200) {
      const commentParams = { 
        pageSize: props.commentPagination.pageSize, 
        currentPage: props.commentPagination.currentPage
      }
      emits('change-comment-pagination', commentParams)
      if (commentInfo.liked) {
        ElMessage({ message: '取消点赞', type: 'success' })
      } else {
        ElMessage({ message: '点赞成功', type: 'success' })
      }
    }
  };
</script>

<template>
  <div class="video-left">
    <h3>
      <el-tag type="danger" size="large">{{ isMv ? 'MV' : '视频' }}</el-tag>
      {{ mvDetail.name }}
      <span class="author">{{ mvDetail.artistName }}</span>
    </h3>
    <video controls :src="videoUrl" width="960" height="540"></video>
    <section style="padding-top: 30px">
      <el-button round size="large" type="primary" plain icon="Select">点赞 ({{ mvDetail.likedCount }})</el-button>
      <el-button round size="large" type="primary" plain icon="FolderAdd">收藏 ({{ mvDetail.subCount }})</el-button>
      <el-button round size="large" type="primary" plain icon="Share">分享 ({{ mvDetail.shareCount }})</el-button>
    </section>
    <section style="margin: 30px 0; border-bottom: 5px solid var(--el-color-primary);">
      <h2>
        评论<span style="font-size: 16px; font-weight: normal; padding-left: 15px;">共{{ commentPagination.total }}条评论</span>
      </h2>
    </section>
    <Comment 
      :avatar-url="profile.avatarUrl"
      :current-comment-type="currentCommentType" 
      :current-comment="currentComment" 
      :comment-pagination="commentPagination"
      @change-comment-type="changeCommentType"
      @change-comment-pagination="changeCommentPagination"
      @like="like"
    />
  </div>
</template>

<style lang="less" scoped>
  .video-left {

    .el-tag {
      font-size: 20px; 
      padding: 20px; 
      margin-right: 10px;
    }

    .author {
      font-size: 14px; 
      font-weight: normal; 
      padding-left: 10px;
    }

    /* .comment-item {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #ccc;

      .el-avatar {
        flex-shrink: 0;
      }

      .contents {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 10px;

        .time {
          display: flex;
          justify-content: space-between;
        }

        .replied {
          width: 80%;
          padding: 15px;
          background-color: #F4F4F4;
        }

        a:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    } */
  }
</style>