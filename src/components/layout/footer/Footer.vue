<script lang="ts" setup>
  import { onMounted } from "vue"
  import { watchMusicInit } from "@/stores/music";
  import FooterLeft from './FooterLeft.vue';
  import FooterCenter from './FooterCenter.vue';
  import FooterRight from './FooterRight.vue';

  onMounted(() => {
    // 音乐切换后的初始化相关数据
    watchMusicInit()
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