<script lang="ts" setup>
  import { ref, reactive, onMounted, provide, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { artistApi } from "@/api/singer";
  import type { artistsType, titleType, offsetType, initialType, paginationType } from "./type";
  import SingerType from "./components/SingerType.vue";
  import SingerList from "./components/SingerList.vue";

  onMounted(() => {
    getArtist({ ...artistParams.value });
  });

  const router = useRouter();

  // 获取歌手列表的默认参数
  const artistParams = ref({ limit: 30, offset: 0, initial: '-1', type: -1, area: -1 });
  const tagTitle = ref('全部');
  const showPagination = ref(true);
  const showTag = ref(true);
  const artists: any[] = reactive([]);
  const paginationProp = ref<paginationType>({ total: 360, currentPage: 1, pageSize: 30 });

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
    artistParams.value = { ...artistParams.value, limit: 30, offset: 0, initial: '0', area, type }; // 重置请求歌手列表的参数
    paginationProp.value = { total: 360, currentPage: 1, pageSize: 30 };
    showPagination.value = false;
    showTag.value = false;
    nextTick(() => {
      showPagination.value = true;
      showTag.value = true;
      getArtist(artistParams.value);
    });
  };

  // 歌手的首字母改变
  const switchInitial = (params: initialType) => {
    paginationProp.value = { total: 360, currentPage: 1, pageSize: 30 };
    artistParams.value = { ...artistParams.value, limit: 30, offset: 0, ...params }; // 重置请求歌手列表的参数
    showPagination.value = false;
    nextTick(() => {
      showPagination.value = true;
      getArtist(artistParams.value);
    });
  };

  // 歌手的偏移量、个数改变
  const switchOffset = ({ currentPage, pageSize }: offsetType) => {
    paginationProp.value.currentPage = currentPage;
    paginationProp.value.pageSize = pageSize;
    artistParams.value = { ...artistParams.value , limit: pageSize, offset: (currentPage - 1) * pageSize };
    getArtist(artistParams.value);
  };

  // 跳转到歌手详情页
  const routerToSingerDetail = (id: number, fansCount: number) => {
    router.push({ path: '/singer-detail', query: { id, fansCount } });
  };

  provide('tagTitle', tagTitle);
  provide('artists', artists);
  provide('paginationProp', paginationProp);
  provide('switch-type', switchType);
  provide('switch-initial', switchInitial);
  provide('switch-offset', switchOffset);
  provide('showPagination', showPagination);
  provide('showTag', showTag);
  provide('router-singer-detail', routerToSingerDetail);
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