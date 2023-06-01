<script lang="ts" setup>
  import { ref, reactive} from 'vue';
  import { useMusicStore } from "@/stores/music";
  import { storeToRefs } from 'pinia';
  import yinyueIcon from "@/assets/imgs/音乐封面.png";

  // const props = defineProps<{}>();
  // const emits = defineEmits<{}>();

  const useMusic = useMusicStore();
  const { currentSongInfo } = storeToRefs(useMusic);
</script>

<template>
  <div class="audio-left">
    <el-image :src="currentSongInfo.picUrl || yinyueIcon" fit="cover" />
    <section class="author">
      <b>{{ currentSongInfo.songName }}</b>
      <template v-for="i in currentSongInfo.artists">
        <a>{{ i.name }}</a>
      </template>
      <section class="icon">
        <div class="iconfont icon-woxihuan" title="喜欢"></div>
        <div class="iconfont icon-xiazai" title="下载该歌曲"></div>
        <div class="iconfont icon-gengduo" title="更多"></div>
        <el-badge :value="1000" :max="999" type="primary">
          <div class="iconfont icon-pinglun" title="查看评论"></div>
        </el-badge>
      </section>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .audio-left {
    display: flex;
    // align-items: center;

    .el-image {
      width: 70px;
      height: 70px;
      border-radius: 8px;
    }

    .author {
      padding-left: 10px;

      & > b {
        font-size: 16px;
      }
      & > a {
        font-size: 14px;
        padding-left: 10px;
      }

      .icon {
        display: flex;
        padding-top: 15px;

        .iconfont {
          font-size: 22px;
          height: 30px;
          width: 30px;
          line-height: 30px;
          transition: all 0.2s;
          padding-right: 10px;
        }
        .iconfont:hover {
          transform: scale(1.1);
          cursor: pointer;
          color: var(--el-color-primary);
        }
      }
    }
  }
</style>