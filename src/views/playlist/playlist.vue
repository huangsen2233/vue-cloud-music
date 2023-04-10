<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { playlistApi, playlistCatlistApi, playlistHotApi, highqualityTagsApi } from "@/api/playlist";
  import PlaylistTag from './components/PlaylistTag.vue';
  import Playlists from "./components/Playlists.vue";
  import PlaylistPagination from './components/PlaylistPagination.vue';

  onMounted(() => {
    // getPlaylist();
    getTags();
/*     const result = await playlistHotApi();
    console.log("🚀 ~ file: song.vue:7 ~ onMounted ~ res 热门歌曲分类:", result)
    const resu = await highqualityTagsApi();
    console.log("🚀 ~ file: playlist.vue:18 ~ onMounted ~ resu: 精品标签", resu) */
  });
  const playlists = ref([]);
  const total = ref();

  const categoriesTags: any = ref([]);
  const subTags: any = ref([]);
  const tagsList: any = ref({}); // 全部标签

  // 获取歌单列表
  const getPlaylist = async () => {
    const result: any = await playlistApi({ limit: 48 });
    playlists.value = result.playlists; 
    total.value = result.total; 
  };

  // 获取歌单标签
  const getTags = async () => {
    const result: any = await playlistCatlistApi();
    categoriesTags.value = result.categories;
    subTags.value = result.sub;
    for(let i = 0; i < Object.keys(categoriesTags.value).length; i++) {
      tagsList.value[categoriesTags.value[i]] = subTags.value.filter((sub: any) => sub.category === i);
    }
    console.log("🚀 ~ file: playlist.vue:17 ~ onMounted ~ tagsList 全部标签:", tagsList.value)
  };
</script>

<template>
  <!-- 歌单标签 -->
  <PlaylistTag :tags-list="tagsList" />
  <!-- 歌单列表 -->
  <Playlists :play-lists="playlists" />
  <!-- 分页 -->
  <!-- <PlaylistPagination :total="total" /> -->
</template>

<style scoped>

</style>