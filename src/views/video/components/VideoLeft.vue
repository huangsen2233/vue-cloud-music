<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import type { MvDetailType, PaginationPropType, PaginationParamsType } from "../type";
  import Comment from '@/components/comment/Comment.vue';

  const props = defineProps<{
    videoUrl: string
    isMv: boolean
    mvDetail: MvDetailType
    profile: any
    hotComments: any[]
    newComments: any[]
    commentPagination: PaginationPropType
  }>();

  const emits = defineEmits<{
    (event: 'change-comment-pagination', params: PaginationParamsType): void
  }>();

  watch(() => props.newComments, (newVal, oldVal) => {
    currentComment.value = newVal;
  });

  const currentComment = ref<any[]>([]);
  const currentCommentType = ref('new');

  // 切换评论类型
  const changeCommentType = (type: string) => {
    if (type === 'hot') {
      currentComment.value = [...props.hotComments];
      currentCommentType.value = type;
    } else {
      currentComment.value = [...props.newComments];
      currentCommentType.value = type;
    }
  };

  // 评论的分页事件
  const changeCommentPagination = (params: PaginationParamsType) => {
    emits('change-comment-pagination', params);
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