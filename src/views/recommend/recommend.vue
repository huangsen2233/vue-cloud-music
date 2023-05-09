<script lang="ts" setup>
  import { reactive, ref, onMounted, provide } from 'vue';
  import type { PlayListType, NewSonglistType, MvsType } from "./type";
  import { useRouter } from 'vue-router';
  import { useMusicStore } from "@/stores/music";
  import { getBannerApi, personalizedApi, newsongApi, getNewMvApi } from "@/api/recommend";
  import Banner from "./components/Banner.vue";
  import Playlists from "./components/Playlists.vue";
  import NewSong from "./components/NewSong.vue";
  import Mvs from "./components/Mvs.vue";

  onMounted(() => {
    getBanner();
    getPersonalizedPlaylist();
    getNewsong();
    getNewMv();
  });

  const router = useRouter();
  const useMusic = useMusicStore();

  const bannerList: any[] = reactive([]);
  const playList = ref<PlayListType[]>([]);
  const newSonglist = ref<NewSonglistType[]>([]);
  const mvs = ref<MvsType[]>([]);

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

  // 获取新音乐
  const getNewsong = async () => {
    const { result } = await newsongApi();
    newSonglist.value.length = 0;
    for (let i of result.slice(0, 9)) {
      const { id, picUrl, name, song } = i;
      newSonglist.value.push({ id, picUrl, name, song });
    }
    // console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 获取新音乐", result)
  };

  // 获取最新MV
  const getNewMv = async () => {
    const { data }: any = await getNewMvApi({});
    // console.log("🚀 ~ file: recommend.vue:54 ~ getNewMv ~ 最新mv:", data)
    mvs.value.length = 0;
    for (let i of data) {
      const { id, artists, name, cover, playCount } = i;
      mvs.value.push({ id, artists, name, cover, playCount });
    }
  }

  // 路由跳转到歌单
  const routerToPlaylist = () => {
    router.push('/playlist');
  };

  // 路由跳转到歌单详情
  const routerToPlaylistDetail = (id: number) => {
    router.push({ path: '/playlist-detail', query: { id } });
  };

  // 播放新音乐
  const playMusic = (songInfo: NewSonglistType) => {
    useMusic.getSongUrl(songInfo);
  };

  // 路由跳转到MV视频
  const routerToVideo = (id: number) => {
    router.push({ path: '/video', query: { id } })
  };

  // 路由跳转到歌手详情
  const routerToSingerDetail = (id: number) => {
    router.push({ path: '/singer-detail', query: { id } })
  };
  
  // provide('router-playlist', routerToPlaylist);
  provide('router-playlist-detail', routerToPlaylistDetail);
</script>

<template>
  <!-- 轮播图 -->
  <Banner :banner-list="bannerList" />
  <!-- 推荐歌单 -->
  <Playlists :play-list="playList" @router-playlist="routerToPlaylist" />
  <!-- 新音乐 -->
  <NewSong :new-songlist="newSonglist" @play-music="playMusic" @router-singer-detail="routerToSingerDetail" />
  <!-- 新MV -->
  <Mvs :mvs="mvs" @router-video="routerToVideo" @router-singer-detail="routerToSingerDetail" />
</template>

<style scoped>

</style>