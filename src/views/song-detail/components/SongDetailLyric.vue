<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { storeToRefs } from "pinia"
  import { useMusicStore } from "@/stores/music";

  const { currentSongInfo, lyric } = storeToRefs(useMusicStore())
  const backgroundStyle = ref({
    backgroundImage: `url(${currentSongInfo.value.picUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  })
</script>

<template>
  <div class="lyric" :style="backgroundStyle">
    <section class="lyric-left">
      <div class="lyric-left_pic">
        <el-avatar :size="300" :src="currentSongInfo.picUrl" />
      </div>
    </section>
    <section class="lyric-right"></section>
  </div>
</template>

<style lang="less" scoped>
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .lyric {
    display: flex;
    height: 500px;
    margin-bottom: 30px;
    position: relative;

    &-left {
      flex: 40%;

      &_pic {
        .el-avatar {
          animation: rotate 30s linear infinite;
        }
      }
    }

    &-right {
      flex: 60%
    }
  }
</style>