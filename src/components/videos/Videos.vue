<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { formatTimestamp } from '@/utils/dateFormat';
  import { count } from '@/utils/count';

  const props = defineProps<{
    videos: any[]
  }>();

  const emits = defineEmits<{
    (event: 'play-video', id: string): void
  }>();
</script>

<template>
  <div class="mv">
    <section class="mv-item" v-for="i in videos">
      <el-image :src="i.coverUrl" fit="cover" />
      <div class="playcount">
        <span>{{ count(i.playTime) }}</span>
        <span>{{ formatTimestamp(i.durationms, 'mm:ss') }}</span>
      </div>
      <div class="playicon" @click="emits('play-video', i.vid)">
        <el-icon><VideoPlay /></el-icon>
      </div>
      <div>{{ i.title }}</div>
      <div class="author">
        by <span>{{ i.creator[0].userName }}</span>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .mv {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    &-item {
      position: relative;
      width: 320px;
      // margin: 0 20px 20px 0;

      .el-image {
        position: relative;
        width: 320px;
        height: 180px;
        border-radius: 20px;
      }

      .el-image:hover ~ .playicon {
        opacity: 1;
        z-index: 1;
      }

      .playicon {
        box-sizing: border-box;
        position: absolute;
        z-index: -1;
        top: 0;
        height: 180px;
        width: 320px;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          opacity: 1;
          z-index: 1;
        }

        .el-icon {
          font-size: 80px;
          color: #fff;
        }
      }

      .playcount {
        box-sizing: border-box;
        position: absolute;
        top: 150px;
        right: 0px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 0 0 20px 20px;
        text-align: right;
        padding: 0 20px;
        background: rgba(54,48,51,0.4);
        color: #fff;
        display: flex;
        justify-content: space-between;
      }

      .author {
        color: #aaa;
        font-size: 14px;
        padding-top: 5px;

        & > span {
          color: #000;
        }
      }
    }
  }
</style>