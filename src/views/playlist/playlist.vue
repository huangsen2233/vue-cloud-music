<script lang="ts" setup>
  import { ref, reactive, onMounted, provide } from 'vue';
  import { useRouter } from 'vue-router';
  import { playlistApi, playlistCatlistApi } from "@/api/playlist";
  import PlaylistTag from './components/PlaylistTag.vue';
  import Playlists from "./components/Playlists.vue";
  import BasePagination from '@/components/common/BasePagination.vue';
  import yzIcon from "@/assets/imgs/yuzhong.png";
  import fgIcon from "@/assets/imgs/fengge.png";
  import cjIcon from "@/assets/imgs/changjing.png";
  import qgIcon from "@/assets/imgs/qinggan.png";
  import ztIcon from "@/assets/imgs/zhuti.png";

  export type playlistType = {
    limit?: number
    order?: string
    cat?: string
    offset?: number
  };

  type paginationType = {
    currentPage: number
    pageSize: number
  };

  const router = useRouter();

  onMounted(() => {
    getTags();
    getPlaylist({...playlistParams.value});
  });

  const paginationProp = reactive({ total: 0, currentPage: 1, pageSize: 30 });
  const playlists = ref([]);
  const categoriesTags: any = ref([]);
  const subTags: any = ref([]);
  const tagsList: any = ref({}); // 全部标签
  const tagsIcons: any = ref({
    '语种': yzIcon,
    '风格': fgIcon,
    '场景': cjIcon,
    '情感': qgIcon,
    '主题': ztIcon
  }); // 标签图标
  const playlistParams = ref({ limit: 30, order: 'hot', cat: '全部', offset: 0 });
  
  // 获取歌单标签
  const getTags = async () => {
    const result: any = await playlistCatlistApi();
    categoriesTags.value = result.categories;
    subTags.value = result.sub;
    for(let i = 0; i < Object.keys(categoriesTags.value).length; i++) {
      tagsList.value[categoriesTags.value[i]] = subTags.value.filter((sub: any) => sub.category === i);
    }
    // console.log("🚀 ~ file: playlist.vue:17 ~ onMounted ~ tagsList 全部标签:", tagsList.value)
  };

  // 获取歌单列表
  const getPlaylist = async (params: playlistType) => {
    playlistParams.value = { ...playlistParams.value, ...params };
    // console.log('歌单列表参数', playlistParams.value);
    const result: any = await playlistApi(params);
    console.log("🚀 ~ file: playlist.vue:45 ~ getPlaylist ~ result: 歌单列表", result)
    playlists.value = result.playlists; 
    paginationProp.total = result.total; 
  };

  // 当前页数、每页的数量改变
  const changePagination = (params: paginationType) => {
    paginationProp.currentPage = params.currentPage;
    paginationProp.pageSize = params.pageSize;
    getPlaylist({ 
      offset: (params.currentPage - 1) * params.pageSize, 
      limit: params.pageSize
    });
  };

  // 路由跳转到歌单详情
  const routeToPlaylistdetail = (id: number) => {
    router.push({ name: 'playlist-detail', params: { id } });
  };

  provide('router-playlistdetail', routeToPlaylistdetail);
</script>

<template>
  <!-- 歌单标签 -->
  <PlaylistTag :tags-list="tagsList" :tags-icons="tagsIcons" @on-switch="getPlaylist"/>
  <!-- 歌单列表 -->
  <Playlists :play-lists="playlists" />
  <BasePagination 
    :total="paginationProp.total"
    :current-page="paginationProp.currentPage"
    :page-size="paginationProp.pageSize"
    :page-sizes="[18, 30, 60, 90]"
    @on-page="changePagination"
    @on-size="changePagination"
  />
  <!-- 分页 -->
  <!-- <PlaylistPagination
    :total="total"
    :page-sizes="[18, 24, 30, 60]"
    @on-page="getPlaylist"
    @on-size="getPlaylist"
  /> -->
</template>

<style scoped>
  .el-pagination {
    margin-bottom: 30px;
  }
</style>