<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import { playlistDetailApi } from "@/api/playlist";
  import { getSongDetailApi } from "@/api/music";
  import SongTitle from "./components/SongTitle.vue";
  import SongList from "./components/SongList.vue";

  onMounted(() => {
    const id = Number(route.params.id);
    if (id) {
      getPlaylistDetail(id);
    }
  });

  const route = useRoute();
  const playlistDetail: any = ref({});
  const songs: any = ref([]);
  const activeName = ref('song'); 

  // 获取歌单详情
  const getPlaylistDetail = async (id: number) => {
    const result: any = await playlistDetailApi({ id });
    console.log("🚀 ~ file: usePlaylistDetail.ts:6 ~ getPlaylistDetail ~ result: 歌单详情", result);
    playlistDetail.value = result.playlist;
    let ids = result.playlist.trackIds.map((i: any) => i.id);
    const res: any = await getSongDetailApi(ids);
    console.log("🚀 ~ file: playlist-detail.vue:22 ~ getPlaylistDetail ~ 获取歌曲详情:", res.songs);
    songs.value = [...res.songs];
  };
</script>

<template>
  <SongTitle :playlist-detail="playlistDetail" />
  <SongList :active-name="activeName" :songs="songs" />
</template>

<style scoped>

</style>