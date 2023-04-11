<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { artistApi } from "@/api/singer";
  import SingerType from "./components/SingerType.vue";
  import SingerList from "./components/SingerList.vue";

  type artistsType = {
    limit?: number
    offset?: number
    initial?: string | number
    type?: number
    area?: number
  };

  onMounted(() => {
    getArtist({});
  });

  const artists: any[] = reactive([]);

  // 获取歌手分类列表
  const getArtist = async (params: artistsType) => {
    const result: any = await artistApi(params);
    console.log("🚀 ~ file: singer.vue:12 ~ getArtist ~ result 歌手列表:", result)
    artists.length = 0;
    artists.push(...result.artists);
    
  };

</script>

<template>
  <div class="singer">
    <!-- 歌手类型 -->
    <SingerType />
    <!-- 歌手列表 -->
    <SingerList />
  </div>
</template>

<style scoped>

</style>