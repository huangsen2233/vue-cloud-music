<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import { useMusicStore } from "@/stores/music";
  import { 
    getArtistDetailApi, getArtistSongApi, getArtistApi, 
    getArtistAlbumApi, getArtistMvApi, getArtistDescApi,
    getAlbumApi
  } from '@/api/singer';
  import type { ArtistSongType, ArtistAlbumType, PaginationPropType } from "./type";
  import SingerInfo from "./components/SingerInfo.vue";
  import SingerWorks from "./components/SingerWorks.vue";

  onMounted(() => {
    const id = Number(route.query.id);
    if (id) {
      getArtistDetail(id);
      // getArtistAlbum({ ...artistAlbumParams.value, id });
      getArtistMv(id);
      // getArtistDesc(id);
      // getArtist(id);
      // getArtistSong({ ...artistSongParmas.value, id });
    }
  });

  const route = useRoute();
  const useMusic = useMusicStore();

  const artistSongParmas = ref<ArtistSongType>({ id: 0, order: 'hot', limit: 50, offset: 0 });
  const artistAlbumParams = ref<ArtistAlbumType>({ id: 0, limit: 10, offset: 0 });
  const artist = ref<any>({});
  const user = ref<any>({});
  const activeName  = ref<any>(2);
  const hotAlbums = ref<any[]>([]);
  const paginationProp = ref<PaginationPropType>({ total: 0, currentPage: 1, pageSize: 10 });
  const mvs = ref<any[]>([]);

  // 获取歌手详情
  const getArtistDetail = async (id: number) => {
    const result: any = await getArtistDetailApi(id);
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手详情", result.data)
    artist.value = result.data.artist;
    user.value = result.data.user ?? {};
  };

  // 获取歌手专辑
  const getArtistAlbum = async (params: ArtistAlbumType) => {
    const result: any = await getArtistAlbumApi(params);
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手专辑", result)
    for(let i = 0; i < result.hotAlbums.length; i++) {
      const albumData: any = await getAlbumApi(result.hotAlbums[i].id);
      result.hotAlbums[i].songs = [...albumData.songs];
    }
    hotAlbums.value = result.hotAlbums; 
    paginationProp.value.total = result.artist.albumSize;
  };

  // 获取歌手MV
  const getArtistMv = async (id: number) => {
    const result: any = await getArtistMvApi(id);
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手MV", result)
    mvs.value = result.mvs;
  };

  // 获取歌手描述
  const getArtistDesc = async (id: number) => {
    const result: any = await getArtistDescApi(id);
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手描述", result)
  };

  // 播放专辑歌曲
  const playAlbum = (row: any) => {
    useMusic.getSongUrl(row);
  };

  // 专辑的分页改变
  const changePagination = ({ currentPage, pageSize }: any) => {
    paginationProp.value = { ...paginationProp.value, currentPage, pageSize };
    getArtistAlbum({ 
      ...artistAlbumParams.value, id: Number(route.query.id), limit: pageSize, offset: (currentPage - 1) * pageSize
    });
  };

  // 获取歌手单曲
  // const getArtist = async (id: number) => {
  //   const result: any = await getArtistApi(id);
  //   console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手单曲", result)
  // };

  // 获取歌手的歌曲
  // const getArtistSong = async (params: ArtistSongType) => {
  //   const result: any = await getArtistSongApi(params);
  //   console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手的歌曲", result)
  // };
</script>

<template>
  <div class="singer">
    <SingerInfo :artist="artist" :user="user" />
    <SingerWorks 
      :active-name="activeName" 
      :hot-albums="hotAlbums" 
      :pagination-prop="paginationProp"
      :mvs="mvs"
      @play-album="playAlbum"
      @change-pagination="changePagination"
    />
  </div>
</template>

<style scoped>

</style>