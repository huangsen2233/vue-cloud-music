<script lang="ts" setup>
  import { onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { watchMusicInit, useMusicStore } from "@/stores/music";
  import localCache from "@/utils/cache";
  import FooterLeft from './FooterLeft.vue';
  import FooterCenter from './FooterCenter.vue';
  import FooterRight from './FooterRight.vue';

  const { songList } = storeToRefs(useMusicStore())

  onMounted(() => {
    // 音乐切换后的初始化相关数据
    watchMusicInit()
    // 本地缓存的音乐列表
    songList.value = localCache.getCache('songList') || []
  })
</script>

<template>
  <div class="audio">
    <FooterLeft />
    <FooterCenter />
    <FooterRight />
  </div>
</template>

<style lang="less" scoped>
  .audio {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #111;

    &-left {
      flex-basis: 500px;
    }
  }
</style>