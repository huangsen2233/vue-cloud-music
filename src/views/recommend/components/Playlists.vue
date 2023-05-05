<script lang="ts" setup>
  import type { PlayListType } from "../type";
  import PlaylistItem from "@/components/playlistItem/PlaylistItem.vue";

  const props = defineProps<{
    playList: PlayListType[]
  }>();

  const emits = defineEmits<{
    (event: 'router-playlist'): void
  }>();
</script>

<template>
  <div class="playlist">
    <section class="playlist-title">
      <h2>推荐歌单</h2>
      <a @click.prvent="emits('router-playlist')">更多<el-icon><DArrowRight /></el-icon></a>
    </section>
    <section class="playlist-content">
      <div class="item" v-for="item in playList">
        <PlaylistItem :id="item.id" :url="item.picUrl" :name="item.name" :play-count="item.playCount" />
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .playlist {
    width: 100%;

    &-title {
      border-bottom: 5px solid var(--el-color-primary);
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > h2 {
        cursor: pointer;
      }

      & > a {
        display: flex;
        align-items: center;
        padding: 10px 0;
        font: 18px bolder;
        cursor: pointer;

        .el-icon {
          vertical-align: middle;
          font-size: 20px;
        }
      }

      & > a:hover {
        text-decoration: underline;
      }
    }

    &-content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .item {
        box-sizing: border-box;
        flex: 15%;
        margin: 0 calc(10% / 5) 30px 0;
      }

      .item:nth-child(6n) {
        margin-right: 0;
      }
    }
  }
</style>