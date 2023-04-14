<script lang="ts" setup>
  import { ref, reactive, onMounted, watch, provide, nextTick } from 'vue';
  import { artistApi } from "@/api/singer";
  import type { artistsType, titleType, offsetType, initialType } from "./type";
  import SingerType from "./components/SingerType.vue";
  import SingerList from "./components/SingerList.vue";

  onMounted(() => {
    getArtist(artistParams.value);
  });

  // 获取歌手列表的默认参数
  const artistParams = ref({ limit: 30, offset: 0, initial: '0', type: -1, area: -1 });
  const tagTitle = ref('全部');
  const visible = ref(true);
  const artists: any[] = reactive([]);
  const paginationProp = reactive({ total: 360, currentPage: 1, pageSize: 30 });

  // 重新挂载子组件SingerList
  watch(tagTitle, (newVal, oldVal) => {
    visible.value = false;
    artistParams.value = { ...artistParams.value, limit: 30, offset: 0, initial: '0' }
    nextTick(() => {
      visible.value = true;
      getArtist(artistParams.value);
    });
  });

  // 获取歌手列表
  const getArtist = async (params: artistsType) => {
    const result: any = await artistApi(params);
    console.log("🚀 ~ file: singer.vue:12 ~ getArtist ~ result 歌手列表:", result.artists)
    artists.length = 0;
    artists.push(...result.artists);
  };

  // 歌手的地区、分类改变
  const switchType = ({ title, area, type }: titleType) => {
    tagTitle.value = title;
    artistParams.value = { ...artistParams.value, area, type };
    // console.log('地区、分类改变', artistParams.value);
  };

  // 歌手的首字母改变
  const switchInitial = (params: initialType) => {
    artistParams.value = { ...artistParams.value, ...params };
    // console.log('首字母改变', artistParams.value);
    getArtist(artistParams.value);
  };

  // 歌手的偏移量、个数改变
  const switchOffset = ({ currentPage, pageSize }: offsetType) => {
    paginationProp.currentPage = currentPage;
    paginationProp.pageSize = pageSize;
    artistParams.value = { ...artistParams.value, limit: pageSize, offset: (currentPage - 1) * pageSize };
    // console.log('偏移量、个数改变', artistParams.value);
    getArtist(artistParams.value);
  };

  provide('tagTitle', tagTitle);
  provide('artists', artists);
  provide('paginationProp', paginationProp);
  provide('switch-type', switchType);
  provide('switch-initial', switchInitial);
  provide('switch-offset', switchOffset)
</script>

<template>
  <div class="singer">
    <!-- 歌手类型 -->
    <SingerType />
    <!-- 歌手列表 -->
    <SingerList v-if="visible" />
  </div>
</template>

<style scoped>
  .singer {
    display: flex;
  }
</style>