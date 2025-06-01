<script lang="ts" setup>
  import { ref, onMounted, provide, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { playlistApi, playlistCatlistApi } from "@/api/playlist";
  import PlaylistHeader from './components/PlaylistHeader.vue';
  import PlaylistBody from "./components/PlaylistBody.vue";
  import BasePagination from '@/components/pagination/BasePagination.vue';
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

  type paginationPropType = {
    total: number
    currentPage: number
    pageSize: number
  }

  onMounted(() => {
    getTags();
    getPlaylist(playlistParams.value);
  });

  const router = useRouter();
  const paginationProp = ref<paginationPropType>({ total: 0, currentPage: 1, pageSize: 30 }); // 分页的数据
  const playlists = ref([]);
  const categoriesTags: any = ref([]);
  const subTags: any = ref([]);
  const tagsList: any = ref({}); // 全部标签
  const tagsIcons: any = ref({ '语种': yzIcon, '风格': fgIcon, '场景': cjIcon, '情感': qgIcon, '主题': ztIcon }); // 标签图标
  const playlistParams = ref({ limit: 30, order: 'hot', cat: '全部', offset: 0 });
  let visible = ref(true);
  let showPopover = ref(false);
  
  // 获取歌单标签
  const getTags = async () => {
    const result = await playlistCatlistApi();
    categoriesTags.value = result.categories;
    subTags.value = result.sub;
    for(let i = 0; i < Object.keys(categoriesTags.value).length; i++) {
      tagsList.value[categoriesTags.value[i]] = subTags.value.filter((sub: any) => sub.category === i);
    }
  };

  // 获取歌单列表
  const getPlaylist = async (params: playlistType) => {
    const result = await playlistApi(params);
    // console.log("🚀 ~ file: playlist.vue:45 ~ getPlaylist ~ result: 歌单列表", result)
    playlists.value = result.playlists; 
    paginationProp.value.total = result.total; 
  };

  // 切换歌单标签
  const changeTag = (params: any) => {
    visible.value = false;
    nextTick(() => {
      visible.value = true; // 重新挂载分页组件
      paginationProp.value = { total: 0, currentPage: 1, pageSize: 30 };
      getPlaylist({ ...playlistParams.value, ...params });
    });
  };

  // 当前页数、每页的数量改变
  const changePagination = (params: paginationType) => {
    paginationProp.value.currentPage = params.currentPage;
    paginationProp.value.pageSize = params.pageSize;
    const paginationParams = { offset: (params.currentPage - 1) * params.pageSize, limit: params.pageSize };
    getPlaylist({ ...playlistParams.value, ...paginationParams});
  };

  // 路由跳转到歌单详情
  const routeToPlaylistDetail = (id: number) => {
    router.push({ path: '/playlist-detail', query: { id } });
  };

  provide('router-playlist-detail', routeToPlaylistDetail);
</script>

<template>
  <!-- 歌单标签 -->
  <PlaylistHeader v-model:showPopover="showPopover" :tags-list="tagsList" :tags-icons="tagsIcons" @on-change="changeTag"/>
  <!-- 歌单列表 -->
  <PlaylistBody :play-lists="playlists" />
  <!-- 分页 -->
  <BasePagination
    v-if="visible"
    :total="paginationProp.total"
    :current-page="paginationProp.currentPage"
    :page-size="paginationProp.pageSize"
    :page-sizes="[18, 30, 60, 90]"
    @on-page="changePagination"
    @on-size="changePagination"
  />
  <button @click="router.push({ path: '/playlist/detail'})">点击</button>

  <router-view ></router-view>
</template>

<style scoped>
  .el-pagination {
    margin-bottom: 30px;
  }
</style>