<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import { playlistDetailApi, playlistCommentApi, playlistSubscribersApi } from "@/api/playlist";
  import { getSongDetailApi } from "@/api/music";
  import type { PlaylistCommentType, PaginationType, PaginationParamsType, PlaylistSubscribersType } from "./type";
  import SongTitle from "./components/SongTitle.vue";
  import SongList from "./components/SongList.vue";

  onMounted(() => {
    const id = Number(route.params.id);
    if (id) {
      getPlaylistDetail(id);
      getPlaylistComment({ ...commentParams.value, id });
      getPlaylistSubscribers({ ...subscribersParams.value, id });
    }
  });

  const route = useRoute();
  const playlistDetail: any = ref({});
  const songs: any = ref([]);
  const activeName = ref('collect'); 
  const commentParams = ref({ id: 0, limit: 20, offset: 0 });
  const subscribersParams = ref({ id: 0, limit: 40, offset: 0 });
  const hotComments: any = ref([]);
  const newComments: any = ref([]);
  const commentPagination = ref<PaginationType>({ total: 0, currentPage: 1, pageSize: 20 });
  const subscriberPagination = ref<PaginationType>({ total: 0, currentPage: 1, pageSize: 20 });
  const subscribers = ref([]);

  // 获取歌单详情
  const getPlaylistDetail = async (id: number) => {
    const result: any = await playlistDetailApi({ id });
    // console.log("🚀 ~ file: usePlaylistDetail.ts:6 ~ getPlaylistDetail ~ result: 歌单详情", result);
    playlistDetail.value = result.playlist;
    let ids = result.playlist.trackIds.map((i: any) => i.id);
    const res: any = await getSongDetailApi(ids);
    // console.log("🚀 ~ file: playlist-detail.vue:22 ~ getPlaylistDetail ~ 获取歌曲详情:", res.songs);
    songs.value = [...res.songs];
  };

  // 获取歌单评论
  const getPlaylistComment = async (params: PlaylistCommentType) => {
    const result: any = await playlistCommentApi({ ...params });
    // console.log("🚀 ~ file: usePlaylistDetail.ts:6 ~ getPlaylistDetail ~ result: 歌单评论", result);
    commentPagination.value.total = result.total;
    newComments.value = result.comments;
    if (hotComments.value.length === 0) {
      hotComments.value = result.hotComments
    }
  };

  // 获取歌单的收藏者
  const getPlaylistSubscribers = async (params: PlaylistSubscribersType) => {
    const result: any = await playlistSubscribersApi(params);
    console.log("🚀 ~ file: playlist-detail.vue:54 ~ getPlaylistSubscribers ~ result: 歌单的收藏者", result)
    subscribers.value = result.subscribers;
    subscriberPagination.value.total = result.total;
  };

  // tab的点击事件
  const handleTabClick = (tabName: string) => {
    activeName.value = tabName;
  };

  // 最新评论的分页改变
  const handleChangePagination = (params: PaginationParamsType)  => {
    commentPagination.value = { ...commentPagination.value, ...params };
    console.log('当前的分页参数', { ...commentParams.value, limit: params.pageSize, offset: params.currentPage - 1 });
    getPlaylistComment({ ...commentParams.value, id: Number(route.params.id), limit: params.pageSize, offset: (params.currentPage - 1) * params.pageSize });
  };
</script>

<template>
  <SongTitle :playlist-detail="playlistDetail" />
  <SongList
    :active-name="activeName" 
    :songs="songs"
    :comment-pagination="commentPagination"
    :hot-comments="hotComments" 
    :new-comments="newComments"
    :subscribers="subscribers" 
    :subscriber-pagination="subscriberPagination"
    @tab-click="handleTabClick"
    @change-pagination="handleChangePagination"
  />
</template>

<style scoped>

</style>