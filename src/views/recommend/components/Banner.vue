<script lang="ts" setup>
  import type { PropType } from 'vue';

  const props = defineProps({
    bannerList: Array as PropType<any[]>
  });
  
</script>

<template>
  <el-carousel type="card" trigger="click" arrow="always" height="300px" :interval="3500" indicator-position="none">
    <el-carousel-item v-for="i in props.bannerList" :key="i">
      <el-image :src="i.imageUrl" fit="contain" />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>

</style>