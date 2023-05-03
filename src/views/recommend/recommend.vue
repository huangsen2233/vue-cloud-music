<script lang="ts" setup>
  import { reactive, onMounted, provide } from 'vue';
  import { useRouter } from 'vue-router';
  import { getBannerApi, personalizedApi, newsongApi } from "@/api/recommend";
  import { usePlaylistDetail } from "@/hooks/usePlaylistDetail";
  import Banner from "./components/Banner.vue";
  import Playlists from "./components/Playlists.vue";
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
    console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 歌单", result)
  };

  // 获取推荐新音乐
  const getNewsongData = async () => {
    const { result } = await newsongApi();
    // playList.push(...result);
    // console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 获取推荐新音乐", result)
  };

  // 路由跳转到歌单
  const routeToPlaylist = () => {
    router.push('/playlist');
  };

  // 路由跳转到歌单详情
  const routeToPlaylistdetail = (id: number) => {
    router.push({ path: '/playlist-detail', query: { id } });
  };
  
  provide('on-router', routeToPlaylist);
  provide('router-playlistdetail', routeToPlaylistdetail);
</script>

<template>
  <!-- 轮播图 -->
  <Banner :banner-list="bannerList" />
  <!-- 推荐歌单 -->
  <Playlists :play-list="playList" @on-router="routeToPlaylist" />
  <!-- 新音乐 -->
  <NewMusic />
</template>

<style scoped>

</style>