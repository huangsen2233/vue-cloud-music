<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import type { MvDetailType, MvsType } from "../type";
  import { formatTimestamp } from "@/utils/dateFormat";

  const props = defineProps<{
    mvDetail: MvDetailType
    mvs: MvsType[]
  }>();

  const emits = defineEmits<{
    (event: 'switch-mv', id: number): void
    (event: 'router-singer-detail', id: number): void;
  }>();

  const publishTime = computed(() => (time: string | number) => {
    if (typeof(time) === 'string') {
      return time;
    } else {
      return formatTimestamp(time)
    }
  })
</script>

<template>
  <div class="video-right">
    <section class="detail">
      <h3>MV简介</h3>
      <div>发布时间: {{ publishTime(mvDetail.publishTime) }}</div>
      <div>播放次数: {{ mvDetail.playCount }}</div>
      <div>{{ mvDetail.desc }}</div>
    </section>
    <section class="detail">
      <h3>相关推荐</h3>
      <section class="mvs">
        <div class="mvs-item" v-for="i in mvs">
          <el-image style="width: 180px; height: 120px" :src="i.cover" fit="cover" @click="emits('switch-mv', i.id)" />
          <div class="duration">
            <el-icon><Clock /></el-icon>
            <span style="padding-left: 5px;">{{ formatTimestamp(i.duration, 'mm:ss') }}</span>
          </div>
          <section style="padding-left: 15px;">
            <div>{{ i.name }}</div>
            <div class="author" style="color: #999; padding-top: 10px;">
              by <a @click="emits('router-singer-detail', i.artistId)">{{ i.artistName }}</a>
            </div>
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