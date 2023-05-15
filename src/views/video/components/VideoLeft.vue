<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { MvDetailType, PaginationPropType } from "../type";
  import { formatTimestamp } from "@/utils/dateFormat";
  import dianzanIcon from "@/assets/imgs/dianzan.png";
  import BasePagination from '@/components/common/BasePagination.vue';

  const props = defineProps<{
    videoUrl: string
    isMv: boolean
    mvDetail: MvDetailType
    comments: any[]
    paginationProp: PaginationPropType
    profile: any
  }>();

  const emits = defineEmits<{
    (event: 'change-pagination', params: any): void
  }>();

  const changePagination = (params: any) => {
    emits('change-pagination', params);
  };

  const inputVal = ref('');
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
      <el-button round size="large" type="primary" plain icon="Select">点赞</el-button>
      <el-button round size="large" type="primary" plain icon="FolderAdd">收藏 ({{ mvDetail.subCount }})</el-button>
      <el-button round size="large" type="primary" plain icon="Share">分享 ({{ mvDetail.shareCount }})</el-button>
    </section>
    <section style="margin: 30px 0; border-bottom: 5px solid var(--el-color-primary);">
      <h2>
        评论<span style="font-size: 16px; font-weight: normal; padding-left: 15px;">共{{ paginationProp.total }}条评论</span>
      </h2>
    </section>
    <section style="display: flex; padding: 10px 0 20px;">
      <el-image :src="profile?.avatarUrl" style="width: 100px; height: 100px; border: 1px solid #fff;" fit="contain" />
      <div style="flex: 1; padding-left: 10px;">
        <el-input style="100%" type="textarea" :rows="3" placeholder="评论一下~~~" v-model="inputVal"></el-input>
        <el-button style="margin-top: 10px;;" type="primary">评论</el-button>
      </div>
    </section>
    <template v-for="i in comments">
      <div class="comment-item">
        <el-avatar style="width: 80px; height: 80px;" fit="scale-down" :src="i.user.avatarUrl" />
        <div class="contents">
          <div class="user">
            <a style="color: var(--el-color-primary)">{{ i.user.nickname }}</a> :
            <span style="padding-left: 5px;">{{ i.content }}</span>
          </div>
          <div v-if="i.beReplied.length > 0" style="margin: 15px 0;">
            <template v-for="j in i.beReplied as any[]">
              <div class="replied">
                <a style="color: var(--el-color-primary)">{{ j.user.nickname }}</a> :
                <span style="padding-left: 5px;">{{ j.content }}</span>
              </div>
            </template>
          </div>
          <div class="time">
            <span>{{ formatTimestamp(i.time, 'YYYY-MM-DD') }}</span>  
            <span style="display: flex; align-items: center;">
              <el-image style="width: 18px; height: 18px; cursor: pointer; padding: 0 5px;" :src="dianzanIcon"></el-image>
              <a>{{ i.likedCount }}</a>
              <el-icon style="cursor: pointer; padding: 0 5px 0 15px;"><ChatDotSquare /></el-icon>
              <a>回复</a>
            </span>
          </div>
        </div>
      </div>
    </template>
    <BasePagination 
      :total="paginationProp.total"
      :current-page="paginationProp.currentPage"
      :page-size="paginationProp.pageSize"
      :page-sizes="[20, 30, 40, 50]"
      @on-page="changePagination"
      @on-size="changePagination"
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

    .comment-item {
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
    }

    .el-pagination {
      padding: 40px 0 30px;
    }
  }
</style>