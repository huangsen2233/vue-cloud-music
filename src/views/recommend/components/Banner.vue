<script lang="ts" setup>
  import { reactive, onMounted } from 'vue';
  import type { PropType } from 'vue';
  import { getBannerApi } from "@/api/recommend";

  onMounted(() => {
    getBanner();
  });

  const bannerList: any[] = reactive([]);

  // 获取轮播图数据
  const getBanner = async () => {
    const { banners } = await getBannerApi();
    bannerList.push(...banners);
  };
</script>

<template>
  <el-carousel type="card" trigger="click" arrow="hover" height="300px" :interval="3500" indicator-position="none">
    <el-carousel-item v-for="i in bannerList" :key="i">
      <el-image :src="i.imageUrl" style="width:100%; height:300px;" fit="scale-down" />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>

</style>