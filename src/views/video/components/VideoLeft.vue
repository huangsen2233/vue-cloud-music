<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { MvDetailType, PaginationPropType } from "../type";
  import BasePagination from '@/components/common/BasePagination.vue';

  const props = defineProps<{
    videoUrl: string
    mvDetail: MvDetailType
    comments: any[]
    paginationProp: PaginationPropType
  }>();

  const emits = defineEmits<{
    (event: 'change-pagination', params: any): void
  }>();

  const changePagination = (params: any) => {
    emits('change-pagination', params);
  };
</script>

<template>
  <div class="video-left">
    <h3>
      <el-tag type="danger" size="large">MV</el-tag>
      {{ mvDetail.name }}
      <span class="author">{{ mvDetail.artistName }}</span>
    </h3>
    <video controls autoplay :src="videoUrl" width="960" height="540"></video>
    <section style="padding-top: 30px">
      <el-button round size="large" type="primary" plain icon="Select">点赞</el-button>
      <el-button round size="large" type="primary" plain icon="FolderAdd">收藏</el-button>
      <el-button round size="large" type="primary" plain icon="Share">分享</el-button>
    </section>

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
  }
</style>