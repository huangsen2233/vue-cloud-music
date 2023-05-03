<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import type { MvDetailType } from "../type"

  onMounted(() => {

  });

  const props = defineProps<{
    videoUrl: string
  }>();

  const getMvDetail = async (id: number) => {
    // const result: any = await getMvDetailApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: mv详情", result)
  };
</script>

<template>
  <div class="video-left">
    <h3>视频</h3>
    <video controls :src="videoUrl" width="600" height="300"></video>
  </div>
</template>

<style lang="less" scoped>

</style>