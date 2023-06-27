<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from "vue-router";
  import { useMusicStore } from "@/stores/music";
  import { 
    getArtistDetailApi, getArtistAlbumApi, getArtistMvApi, 
    getArtistDescApi, getAlbumApi
  } from '@/api/singer';
  import type { ArtistAlbumType, PaginationPropType, MvType } from "./type";
  import SingerDetailHeader from "./components/SingerDetailHeader.vue";
  import SingerDetailBody from "./components/SingerDetailBody.vue";

  onMounted(() => {
    const id = Number(route.query.id);
    if (id) {
      getArtistDetail(id);
      getArtistAlbum({ ...artistAlbumParams.value, id });
      getArtistMv(id);
      getArtistDesc(id);
    }
  });

  const route = useRoute();
  const router = useRouter();
  const useMusic = useMusicStore();

  const artistAlbumParams = ref<ArtistAlbumType>({ id: 0, limit: 10, offset: 0 });
  const artist = ref<any>({});
  const user = ref<any>({});
  const identify = ref<any>({});
  const fansCount = route.query.fansCount ? Number(route.query.fansCount) : 0;
  const activeName  = ref(1);
  const activeCollapse = ref(0);
  const hotAlbums = ref<any[]>([]);
  const paginationProp = ref<PaginationPropType>({ total: 0, currentPage: 1, pageSize: 10 });
  const mvs = ref<MvType[]>([]);

  const briefDesc = ref('');
  const introduction = ref<any[]>([]);

  // 获取歌手详情
  const getArtistDetail = async (id: number) => {
    const result: any = await getArtistDetailApi(id);
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手详情", result.data)
    artist.value = result.data.artist;
    user.value = result.data.user ?? {};
    identify.value = result.data.identify;
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
    mvs.value.length = 0;
    for (let i of result.mvs) {
      const { imgurl, playCount, duration, id, name, publishTime, artist: { id: artistId, name: artistName } } = i;
      mvs.value.push({ playCount, duration, id, name, publishTime, artistId, artistName, cover: imgurl });
    }
  };

  // 获取歌手描述
  const getArtistDesc = async (id: number) => {
    const result: any = await getArtistDescApi(id);
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手描述", result)
    briefDesc.value = result.briefDesc;
    introduction.value = result.introduction;
  };

  // 播放专辑歌曲
  const playAlbum = (row: any) => {
    // console.log('当前的歌曲信息', row);
    const { dt, al, ar, name, id } = row;
    const songInfo = { songId: id, songName: name, picUrl: al.picUrl, duration: dt, artists: ar };
    useMusic.getSongUrl(songInfo);
  };

  // 专辑的分页改变
  const changePagination = ({ currentPage, pageSize }: any) => {
    paginationProp.value = { ...paginationProp.value, currentPage, pageSize };
    getArtistAlbum({ 
      ...artistAlbumParams.value, id: Number(route.query.id), limit: pageSize, offset: (currentPage - 1) * pageSize
    });
  };

  // 获取MV地址
  const playMv = async (mvid: number) => {
    // console.log('mv的id', mvid);
    router.push({ path: '/video', query: { id: mvid } });
  };
</script>

<template>
  <div class="singer">
    <SingerDetailHeader :artist="artist" :user="user" :identify="identify" :fans-count="fansCount" />
    <SingerDetailBody 
      :active-name="activeName" 
      :active-collapse="activeCollapse"
      :hot-albums="hotAlbums" 
      :pagination-prop="paginationProp"
      :mvs="mvs"
      :brief-desc="briefDesc"
      :introduction="introduction"
      @play-album="playAlbum"
      @play-mv="playMv"
      @change-pagination="changePagination"
    />
  </div>
</template>

<style scoped>

</style>