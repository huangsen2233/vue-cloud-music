<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { MvDetailType, MvsType } from "../type";
  import { formatTimestamp } from "@/utils/dateFormat";

  const props = defineProps<{
    mvDetail: MvDetailType
    mvs: MvsType[]
  }>();

  const emits = defineEmits<{
    (event: 'switch-mv', id: number): void
  }>();
</script>

<template>
  <div class="video-right">
    <section class="detail">
      <h3>MV简介</h3>
      <div>发布时间: {{ mvDetail.publishTime }}</div>
      <div>播放次数: {{ mvDetail.playCount }}</div>
      <div>{{ mvDetail.desc }}</div>
    </section>
    <section class="detail">
      <h3>相关推荐</h3>
      <section class="mvs">
        <div class="mvs-item" v-for="i in mvs">
          <el-image style="width: 240px; height: 150px" :src="i.cover" fit="cover" @click="emits('switch-mv', i.id)" />
          <div class="duration">{{ formatTimestamp(i.duration, 'mm:ss') }}</div>
          <section style="padding-left: 15px;">
            <div>{{ i.name }}</div>
            <div style="color: #999; padding-top: 10px;">{{ i.artistName }}</div>
          </section>
        </div>
      </section>
    </section>

    <!-- {{ mvDetail }} -->
  </div>
</template>

<style lang="less" scoped>
  .video-right {
    padding: 0 20px;

    .detail {
      h3 {
        line-height: 2;
        border-bottom: 1px solid #ccc;
      }

      & > div {
        padding-bottom: 10px;
      }

      .mvs {
        &-item {
          display: flex;
          padding-bottom: 30px;
          position: relative;

          .el-image {
            flex: 0 0 auto;
          }

          .duration {
            box-sizing: border-box;
            position: absolute;
            top: 120px;
            width: 240px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            padding-right: 10px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.5);
          }

          .el-image:hover {
            cursor: pointer;
          }
        }

        &-item:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
</style>