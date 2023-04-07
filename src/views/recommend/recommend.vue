<script lang="ts" setup>
  import { reactive, onMounted } from 'vue';
  import { getBannerApi, personalizedApi } from "@/api/recommend";
  import Banner from "./components/Banner.vue";
  import Playlist from "./components/playlist.vue";

  onMounted(() => {
    getBannerData();
    getresourceData();
  });

  const bannerList: any[] = reactive([]);
  const playList: any[] = reactive([]);

  // 获取轮播图数据
  const getBannerData = async () => {
    const { banners } = await getBannerApi();
    bannerList.push(...banners);
  };

  // 获取推荐歌单
  const getresourceData = async () => {
    const { result } = await personalizedApi();
    playList.push(...result);
    console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 歌单", result)
  };
</script>

<template>
  <!-- 轮播图 -->
  <Banner :banner-list="bannerList" />
  <!-- 推荐歌单 -->
  <Playlist :play-list="playList" />
</template>

<style scoped>

</style>