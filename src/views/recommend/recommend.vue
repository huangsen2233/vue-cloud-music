<script lang="ts" setup>
  import { reactive, ref, onMounted, provide } from 'vue';
  import type { PlayListType, NewSonglistType } from "./type";
  import { useRouter } from 'vue-router';
  import { getBannerApi, personalizedApi, newsongApi } from "@/api/recommend";
  import Banner from "./components/Banner.vue";
  import Playlists from "./components/Playlists.vue";
  import NewSong from "./components/NewSong.vue";

  onMounted(() => {
    getBanner();
    getPersonalizedPlaylist();
    getNewsong();
  });

  const router = useRouter();

  const bannerList: any[] = reactive([]);
  const playList = ref<PlayListType[]>([]);
  const newSonglist = ref<NewSonglistType[]>([]);

  // 获取轮播图数据
  const getBanner = async () => {
    const { banners } = await getBannerApi();
    bannerList.push(...banners);
  };

  // 获取推荐歌单
  const getPersonalizedPlaylist = async () => {
    const { result } = await personalizedApi();
    playList.value.length = 0;
    for (let i of result) {
      const { id, picUrl, name, playCount } = i;
      playList.value.push({ id, picUrl, name, playCount });
    }
    // console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 歌单", result)
  };

  // 获取推荐新音乐
  const getNewsong = async () => {
    const { result } = await newsongApi();
    newSonglist.value.length = 0;
    for (let i of result) {
      const { id, picUrl, name, song } = i;
      newSonglist.value.push({ id, picUrl, name, song });
    }
    console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 获取推荐新音乐", result)
  };

  // 路由跳转到歌单
  const routerToPlaylist = () => {
    router.push('/playlist');
  };

  // 路由跳转到歌单详情
  const routerToPlaylistdetail = (id: number) => {
    router.push({ path: '/playlist-detail', query: { id } });
  };
  
  // provide('router-playlist', routerToPlaylist);
  provide('router-playlistdetail', routerToPlaylistdetail);
</script>

<template>
  <!-- 轮播图 -->
  <Banner :banner-list="bannerList" />
  <!-- 推荐歌单 -->
  <Playlists :play-list="playList" @router-playlist="routerToPlaylist" />
  <!-- 新音乐 -->
  <NewSong :new-songlist="newSonglist" />
</template>

<style scoped>

</style>