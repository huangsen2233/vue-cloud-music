<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import type { MvDetailType } from "../type"

  onMounted(() => {
    
  });

  const props = defineProps<{
    mvDetail: MvDetailType
  }>();

  // 获取MV详情
  const getMvDetail = async (id: number) => {
    // const result: any = await getMvDetailApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: mv详情", result)
    // const { artistName, name, desc, playCount, publishTime } = result.data;
    // mvDetail.value = { artistName, name, desc, playCount, publishTime };
  };
</script>

<template>
  <div class="video-right">
    {{ mvDetail }}
  </div>
</template>

<style lang="less" scoped>

</style>