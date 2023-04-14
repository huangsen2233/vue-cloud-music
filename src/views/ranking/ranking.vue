<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { toplistApi, toplistDetailApi } from '@/api/ranking';

  onMounted(() => {
    getToplistDetail();
  });

  // 获取所有榜单摘要
  const getToplistDetail = async () => {
    const result = await toplistDetailApi();
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 所有榜单详情", result)
  }
  
</script>

<template>
  <div>排行榜</div>
</template>

<style scoped>

</style>