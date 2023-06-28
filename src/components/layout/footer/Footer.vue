<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { watchMusicInit, useMusicStore } from "@/stores/music";
  import localCache from "@/utils/cache";
  import FooterLeft from './FooterLeft.vue';
  import FooterCenter from './FooterCenter.vue';
  import FooterRight from './FooterRight.vue';

  onMounted(() => {
    // 音乐切换后的初始化相关数据
    watchMusicInit()
    // 本地缓存的音乐列表
    songList.value = localCache.getCache('songList') || []
  });

  const { songList, currentTime, duration } = storeToRefs(useMusicStore());
  const { changeTime } = useMusicStore();
</script>

<template>
  <div class="audio">
    <FooterLeft />
    <FooterCenter />
    <FooterRight />
    <!-- 歌曲进度条 -->
    <el-slider 
      v-model="currentTime" 
      :show-tooltip="false" 
      :min="0" 
      :max="duration" 
      :disabled="duration === 0 ? true : false"
      @input="changeTime" 
    />
  </div>
</template>

<style lang="less" scoped>
  .audio {
    width: 60%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #111;
    position: relative;

    &-left {
      flex-basis: 400px;
    }

    .el-slider {
      position: absolute;
      top: -18px;

      &:hover :deep(.el-slider__button-wrapper) {
        display: block;
      }

      :deep(.el-slider__button-wrapper) {
        color: red;
        display: none;
      }
      
      :deep(.el-slider__runway) {
        background-color: var(--el-color-primary-light-7);
      }
    }
  }
</style>