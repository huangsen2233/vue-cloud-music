<script lang="ts" setup>
  import { reactive, onMounted, provide } from 'vue';
  import { useRouter } from 'vue-router';
  import { getBannerApi, personalizedApi, newsongApi } from "@/api/recommend";
  import Banner from "./components/Banner.vue";
  import Playlist from "./components/playlist.vue";
  import NewMusic from "./components/NewMusic.vue";

  onMounted(() => {
    getBannerData();
    getresourceData();
    // getNewsongData();
  });

  const router = useRouter();

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
    // console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 歌单", result)
  };

  // 获取推荐新音乐
  const getNewsongData = async () => {
    const { result } = await newsongApi();
    // playList.push(...result);
    // console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 获取推荐新音乐", result)
  };

  const routeToSong = () => {
    router.push('/song');
  };
  
  provide('on-router', routeToSong);
</script>

<template>
  <!-- 轮播图 -->
  <Banner :banner-list="bannerList" />
  <!-- 推荐歌单 -->
  <Playlist :play-list="playList" @on-router="routeToSong" />
  <!-- 新音乐 -->
  <NewMusic />
</template>

<style scoped>

</style>