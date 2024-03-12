<script lang="ts" setup>
  import { ref, provide } from 'vue';
  import { useRouter } from 'vue-router';
  import Banner from "./components/Banner.vue";
  import Playlists from "./components/Playlists.vue";
  import NewSong from "./components/NewSong.vue";
  import Mvs from "./components/Mvs.vue";

  const router = useRouter();

  // 路由跳转到歌单详情
  const routerToPlaylistDetail = (id: number) => {
    router.push({ path: '/playlist-detail', query: { id } });
  };

  provide('router-playlist-detail', routerToPlaylistDetail);
</script>

<template>
  <!-- 轮播图 -->
  <Banner />
  <!-- 推荐歌单 -->
  <Playlists />
  <!-- 新音乐 -->
  <NewSong />
  <!-- 新MV -->
  <Mvs />
</template>

<style scoped>
  
</style>