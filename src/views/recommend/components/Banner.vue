<script lang="ts" setup>
  import type { PropType } from 'vue';

  const props = defineProps({
    bannerList: Array as PropType<any[]>
  });
</script>

<template>
  <el-carousel type="card" trigger="click" arrow="hover" height="300px" :interval="3500" indicator-position="none">
    <el-carousel-item v-for="i in props.bannerList" :key="i">
      <el-image :src="i.imageUrl" style="width:100%; height:300px;" fit="scale-down" />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>

</style>