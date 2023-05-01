<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import { getArtistDetailApi, getArtistSongApi, getArtistApi, getArtistAlbumApi, getArtistMvApi, getArtistDescApi } from '@/api/singer';
  import SingerInfo from "./components/SingerInfo.vue";
  import SingerWorks from "./components/SingerWorks.vue";

  type artistSongType = {
    id: number
    order: string
    limit: number
    offset: number
  }

  type artistAlbumType = {
    id: number
    limit: number
    offset: number
  }


  onMounted(() => {
    const id = Number(route.query.id);
    if (id) {
      getArtistDetail(id);
      getArtistAlbum({ ...artistAlbumParams.value, id });
      getArtistMv(id);
      getArtistDesc(id);
      // getArtist(id);
      // getArtistSong({ ...artistSongParmas.value, id });
    }
  });

  const route = useRoute();

  const artistSongParmas = ref<artistSongType>({ id: 0, order: 'hot', limit: 20, offset: 0 });
  const artistAlbumParams = ref<artistAlbumType>({ id: 0, order: 'hot', limit: 20, offset: 0 });
  const artist = ref<any>({});
  const user = ref<any>({});
  const activeName  = ref<any>(1);
  const tabslist = [
    { label: '专辑', name: 1 },
    { label: 'MV', name: 2 },
    { label: '专辑', name: 3 },
    { label: '个人介绍', name: 4 },
  ]

  // 获取歌手详情
  const getArtistDetail = async (id: number) => {
    const result: any = await getArtistDetailApi(id);
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手详情", result.data)
    artist.value = result.data.artist;
    user.value = result.data.user ?? {};
  };

  // 获取歌手专辑
  const getArtistAlbum = async (params: artistAlbumType) => {
    const result: any = await getArtistAlbumApi(params);
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手专辑", result)
  };

  // 获取歌手MV
  const getArtistMv = async (id: number) => {
    const result: any = await getArtistMvApi(id);
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手MV", result)
  };

  // 获取歌手描述
  const getArtistDesc = async (id: number) => {
    const result: any = await getArtistDescApi(id);
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手描述", result)
  };


  // 获取歌手单曲
  // const getArtist = async (id: number) => {
  //   const result: any = await getArtistApi(id);
  //   console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手单曲", result)
  // };

  // 获取歌手的歌曲
  // const getArtistSong = async (params: artistSongType) => {
  //   const result: any = await getArtistSongApi(params);
  //   console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手的歌曲", result)
  // };
</script>

<template>
  <div class="singer">
    <SingerInfo :artist="artist" :user="user" />
    <SingerWorks :active-name="activeName" :tabslist="tabslist" />
  </div>
</template>

<style scoped>

</style>