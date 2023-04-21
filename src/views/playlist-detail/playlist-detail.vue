<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import { playlistDetailApi, playlistCommentApi } from "@/api/playlist";
  import { getSongDetailApi } from "@/api/music";
  import SongTitle from "./components/SongTitle.vue";
  import SongList from "./components/SongList.vue";

  type PlaylistCommentType = {
    id: number
    limit?: number
    offset?: number
    before?: number
  }

  onMounted(() => {
    const id = Number(route.params.id);
    if (id) {
      getPlaylistDetail(id);
      getPlaylistComment({ ...commentParams, id });
    }
  });

  const route = useRoute();
  const playlistDetail: any = ref({});
  const songs: any = ref([]);
  const activeName = ref('song'); 
  const commentParams = ref({ id: 0, limit: 20, offset: 0 });
  const commentTotal = ref(0);
  const hotComments: any = ref([]);
  const newComments: any = ref([]);

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
    console.log("🚀 ~ file: usePlaylistDetail.ts:6 ~ getPlaylistDetail ~ result: 歌单评论", result);
    commentTotal.value = result.total;
    hotComments.value = result.hotComments;
    newComments.value = result.comments;
  };
</script>

<template>
  <SongTitle :playlist-detail="playlistDetail" />
  <SongList
    :active-name="activeName" 
    :songs="songs"
    :comment-total="commentTotal"
    :hot-comments="hotComments" 
    :new-comments="newComments" 
  />
</template>

<style scoped>

</style>