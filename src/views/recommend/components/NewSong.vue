<script lang="ts" setup>
  import type { NewSonglistType } from "../type";
  import { formatTimestamp } from "@/utils/dateFormat";

  const props = defineProps<{
    newSonglist: NewSonglistType[]
  }>();

  const emits = defineEmits<{
    (event: 'play-music', songInfo: NewSonglistType): void;
    (event: 'router-singer-detail', id: number): void;
  }>();
</script>

<template>
  <div class="newsong">
    <section class="newsong-title">
      <h2>新音乐</h2>
    </section>
    <section class="newsong-content">
      <div class="item" v-for="i in newSonglist">
        <el-image style="width: 250px; height: 250px;" :src="i.picUrl" fit="cover" @click="emits('play-music', i)"/>
        <div class="item-duration">
          <el-icon><Clock /></el-icon>
          <span style="padding-left: 5px;">{{ formatTimestamp(i.song.duration, 'mm:ss') }}</span>
        </div>
        <div class="item-play" @click="emits('play-music', i)">
          <el-icon><VideoPlay /></el-icon>
        </div>
        <div class="item-name">
          <h4 class="songname">{{ i.name }}</h4>
          <div class="author">
            by 
            <template v-for="(j, index) in i.song.artists">
              <a @click="emits('router-singer-detail', j.id)">{{ j.name }}</a>
              <span v-if="index !== i.song.artists.length - 1"> / </span>
            </template>
          </div>
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
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        flex: 0 1 250px;
        display: flex;
        flex-direction: column;
        position: relative;
        padding-bottom: 30px;

        .el-image:hover {
          cursor: pointer;
        }

        &-name {
          .songname {
            margin: 10px 0;
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

        &-duration {
          position: absolute;
          top: 220px;
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
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
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
    }
  }
</style>