<script lang="ts" setup>
  import type { NewSonglistType } from "../type";
  import { formatTimestamp } from "@/utils/dateFormat";

  const props = defineProps<{
    newSonglist: NewSonglistType[]
  }>();
</script>

<template>
  <div class="newsong">
    <section class="newsong-title">
      <h2>新音乐</h2>
    </section>
    <section class="newsong-content">
      <div class="item" v-for="i in newSonglist">
        <el-image style="width: 200px; height: 200px;" :src="i.picUrl" fit="cover" />
        <div class="item-duration">
          <el-icon><Clock /></el-icon>
          <span style="padding-left: 5px;">{{ formatTimestamp(i.song.duration, 'mm:ss') }}</span>
        </div>
        <div class="item-play">
          <el-icon><VideoPlay /></el-icon>
        </div>
        <div class="item-name">
          <h4 style="margin: 0 0 20px;">{{ i.name }}</h4>
          <div v-for="j in i.song.artists">{{ j.name }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .newsong {
    width: 100%;

    &-title {
      border-bottom: 5px solid var(--el-color-primary);
      margin: 20px 0;
    }

    &-content {
      display: flex;
      flex-wrap: wrap;

      .item {
        flex: 30%;
        display: flex;
        margin: 0 calc(10% / 2) 20px 0;
        position: relative;

        .el-image {
          flex-shrink: 0;
        }

        .el-image:hover {
          cursor: pointer;
        }

        &-name {
          padding-left: 20px;
        }

        &-duration {
          position: absolute;
          top: 170px;
          left: 0;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
        }

        &-play {
          position: absolute;
          z-index: 9;
          top: 60px;
          left: 60px;
          font-size: 80px;
          color: #eee;
          display: none;
        }

        &-play:hover {
          display: block;
          cursor: pointer;
        }

        .el-image:hover ~ .item-play {
          display: block;
        }



      }

      .item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
</style>