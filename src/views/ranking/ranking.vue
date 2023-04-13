<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { toplistApi } from '@/api/ranking';

  onMounted(() => {
    getToplist();
  });

  // 获取所有榜单
  const getToplist = async () => {
    const result = await toplistApi();
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 所有榜单", result)
  }
  
</script>

<template>
  <div>排行榜</div>
</template>

<style scoped>

</style>