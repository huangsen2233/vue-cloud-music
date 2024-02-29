<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import type { MvDetailType, MvsType } from "../type";
  import { formatTimestamp } from "@/utils/dateFormat";

  const props = defineProps<{
    mvDetail: MvDetailType
    mvs: MvsType[]
    isMv: boolean
  }>();

  const emits = defineEmits<{
    (event: 'switch-mv', id: number): void
    (event: 'router-singer-detail', id: number): void;
  }>();

  const publishTime = computed(() => (time: string | number) => {
    if (typeof(time) === 'string') {
      return time;
    } else {
      return formatTimestamp(time);
    }
  })
</script>

<template>
  <div class="video-right">
    <section class="detail">
      <h3>{{ isMv ? 'MV' : '视频' }}简介</h3>
      <div>发布时间: {{ publishTime(mvDetail.publishTime) }}</div>
      <div>播放次数: {{ mvDetail.playCount }}</div>
      <div>{{ mvDetail.desc }}</div>
    </section>
    <section class="detail">
      <h3>相关推荐</h3>
      <section class="mvs">
        <div class="mvs-item" v-for="i in mvs">
          <img style="width: 180px; height: 120px" v-lazy="i.cover" @click="emits('switch-mv', i.id)" />
          <div class="duration">
            <el-icon><Clock /></el-icon>
            <span style="padding-left: 5px;">{{ formatTimestamp(i.duration, 'mm:ss') }}</span>
          </div>
          <section style="padding-left: 15px; font-size: 12px;">
            <div>{{ i.name }}</div>
            <div class="author" style="color: #999; padding-top: 10px;">
              <span>by</span> 
              <a v-if="i.artistId" @click="emits('router-singer-detail', i.artistId)">{{ i.artistName }}</a>
              <a v-else>{{ i.userName }}</a>
            </div>
          </section>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .video-right {

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

          .duration {
            box-sizing: border-box;
            position: absolute;
            top: 90px;
            width: 180px;
            height: 30px;
            line-height: 30px;
            padding-right: 10px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }

          .el-image:hover {
            cursor: pointer;
          }

          .author {
            font-size: 14px;
            color: #aaa;

            & > a {
              color: #000;
              padding-left: 5px;
            }

            & > a:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }

        &-item:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
</style>