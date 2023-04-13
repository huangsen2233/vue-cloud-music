<script lang="ts" setup>
  import { ref, reactive, onMounted, provide } from 'vue';
  import { artistApi } from "@/api/singer";
  import SingerType from "./components/SingerType.vue";
  import SingerList from "./components/SingerList.vue";

  type artistsType = {
    limit?: number
    offset?: number
    initial?: string
    type?: number
    area?: number
  };

  type singerType = {
    title: string
    type: number
    area: number
  };

  onMounted(() => {
    getArtist({});
  });

  const artists: any[] = reactive([]);
  const total = ref(30);

  const tagParams = ref({
    title: '全部',
    area: -1,
    type: -1
  });

  // 获取歌手分类列表
  const getArtist = async (params: artistsType) => {
    const result: any = await artistApi(params);
    console.log("🚀 ~ file: singer.vue:12 ~ getArtist ~ result 歌手列表:", result)
    artists.length = 0;
    artists.push(...result.artists);
  };

  // 歌手的分类改变
  const switchSinger = ({ title, area, type }: singerType) => {
    tagParams.value = { title, area, type };
    getArtist({ area, type });
  }

  provide('tagParams', tagParams);
  provide('on-switch-type', switchSinger);
  provide('on-switch-letter', getArtist);
  provide('artists', artists);
  provide('total', total);
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
  .singer {
    display: flex;
  }
</style>