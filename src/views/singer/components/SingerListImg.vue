<script lang="ts" setup>
  import { ref, reactive, inject } from 'vue';
  import type { offsetType, paginationType } from "../type";
  import BasePagination from "@/components/common/BasePagination.vue";

  const artists = inject('artists') as any[];
  const paginationProp = inject('paginationProp') as paginationType;
  const showPagination = inject('showPagination') as boolean;

  const switchOffset = inject('switch-offset') as (params: offsetType) => void;
  const routerToSingerDetail = inject('router-singer-detail') as (id: number, fansCount: number) => void;
</script>

<template>
  <div class="img-list">
    <!-- 歌手列表 -->
    <div class="img-item" v-for="i in artists">
      <el-image :src="i.picUrl" style="width: 100%; height: 100%;" fit="cover"></el-image>
      <div class="name">
        <a @click="routerToSingerDetail(i.id, i.fansCount)">{{ i.name }}</a>
        <el-avatar :title="`${i.name}的个人主页`" size="small" :src="i.img1v1Url" @click="routerToSingerDetail(i.id, i.fansCount)" />
      </div>
    </div>
  </div>
  <!-- 分页组件 -->
  <BasePagination
    v-if="showPagination"
    :total="paginationProp.total"
    :current-page="paginationProp.currentPage"
    :page-size="paginationProp.pageSize"
    :page-sizes="[18, 30, 60, 90]"
    @on-page="switchOffset"
    @on-size="switchOffset"
  />
</template>

<style lang="less" scoped>
  .img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .img-item {
      flex: 15%;
      margin: 20px calc(10% / 5) 30px 0;

      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .el-avatar {
          cursor: pointer;
        }
      }
    }

    .img-item:nth-child(6n) {
      margin-right: 0;
    }
  }

  .el-pagination {
    margin: 40px 0 30px;
  }
</style>