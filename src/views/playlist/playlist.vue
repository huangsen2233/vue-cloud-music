<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { playlistApi, playlistCatlistApi, playlistHotApi, highqualityTagsApi } from "@/api/playlist";
  import PlaylistTag from './components/playlistTag.vue';
  import Playlists from "./components/Playlists.vue";
  import PlaylistPagination from './components/playlistPagination.vue';

  onMounted(async () => {
    // const res = await playlistApi();
    // console.log("🚀 ~ file: song.vue:7 ~ onMounted ~ res 歌曲分类:", res)

    // const result = await hotPlaylistApi();
    // console.log("🚀 ~ file: song.vue:7 ~ onMounted ~ res 热门歌曲分类:", result)

    const result: any = await playlistApi();
    playlists.value = result.playlists; 
    total.value = result.total; 
    console.log("🚀 ~ file: song.vue:7 ~ onMounted ~ res 歌单:", result.playlists, result.total)
  });
  const playlists = ref([]);
  const total = ref();
</script>

<template>
  <!-- 歌单标签 -->
  <PlaylistTag />
  <!-- 歌单列表 -->
  <Playlists :play-lists="playlists" />
  <!-- 分页 -->
  <PlaylistPagination :total="total" />
</template>

<style scoped>

</style>