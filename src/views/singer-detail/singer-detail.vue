<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from "vue-router";
  import { useMusicStore } from "@/stores/music";
  import {  
    getArtistDetailApi, getArtistAlbumApi, getArtistMvApi, 
    getArtistDescApi, getAlbumApi
  } from '@/api/singer';
  import SingerDetailHeader from "./components/SingerDetailHeader.vue";
  import SingerDetailBody from "./components/SingerDetailBody.vue";
  import type { ArtistAlbumType, PaginationPropType, MvType } from "./type";

  onMounted(() => {
    const id = Number(route.query.id)
    if (id) {
      getArtistDetail(id)
      getArtistAlbum({ ...artistAlbumParams.value, id })
      getArtistMv(id)
      getArtistDesc(id)
    }
    window.addEventListener('scroll', handleScroll)
  });

  const route = useRoute();
  const router = useRouter();
  const useMusic = useMusicStore();
  const artistAlbumParams = ref<ArtistAlbumType>({ id: 0, limit: 200, offset: 0 });
  const artist = ref<any>({});
  const user = ref<any>({});
  const identify = ref<any>({});
  const fansCount = route.query.fansCount ? Number(route.query.fansCount) : 0;
  const activeName  = ref(1);
  const activeCollapse = ref(0);
  const hotAlbums = ref<any[]>([]);
  const albums = ref<any[]>([]);
  const albumSize = ref<number>(0);
  const loading = ref<boolean>(false);
  const mvs = ref<MvType[]>([]);
  const briefDesc = ref('');
  const introduction = ref<any[]>([]);
  let timer: NodeJS.Timer;

  // 页面滚动事件
  const handleScroll = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loading.value = true
        getAlbumsDetail().then(() => {
          loading.value = false
        })
      }
    }, 1000)
  };

  // 获取歌手详情
  const getArtistDetail = async (id: number) => {
    const result: any = await getArtistDetailApi(id)
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手详情", result.data)
    artist.value = result.data.artist
    user.value = result.data.user ?? {}
    identify.value = result.data.identify
  };

  // 获取歌手专辑
  const getArtistAlbum = async (params: ArtistAlbumType) => {
    const { hotAlbums: album, artist }: any = await getArtistAlbumApi(params)
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手专辑", album.length)
    const count = album.length >= 4 ? 4 : album.length
    for(let i = 0; i < count; i++) {
      const albumData: any = await getAlbumApi(album[i].id)
      album[i].songs = [...albumData.songs]
    }
    albums.value = album
    hotAlbums.value = album.slice(0, count)
    albumSize.value = artist.albumSize
  };

  // 再次获取歌手专辑详情 (先获取四个专辑，后续请求每次再获取四个)
  const getAlbumsDetail = async () => {
    const albumsLength = albums.value.length
    const hotAlbumsLength = hotAlbums.value.length
    if (albumsLength - hotAlbumsLength === 0) {
      return 
    } else if (albumsLength - hotAlbumsLength > 4) {
      for(let i = hotAlbumsLength; i < hotAlbumsLength + 4; i++) {
        const albumData: any = await getAlbumApi(albums.value[i].id)
        albums.value[i].songs = [...albumData.songs]
      }
      hotAlbums.value.push(...albums.value.slice(hotAlbumsLength, hotAlbumsLength + 4))
    } else if (albums.value.length - hotAlbums.value.length < 4) {
      for(let i = hotAlbumsLength; i < albumsLength; i++) {
        const albumData: any = await getAlbumApi(albums.value[i].id)
        albums.value[i].songs = [...albumData.songs]
      }
      hotAlbums.value.push(...albums.value.slice(hotAlbumsLength))
    }
  };

  // 获取歌手MV
  const getArtistMv = async (id: number) => {
    const result: any = await getArtistMvApi(id)
    mvs.value.length = 0
    for (let i of result.mvs) {
      const { imgurl, playCount, duration, id, name, publishTime, artist: { id: artistId, name: artistName } } = i
      mvs.value.push({ playCount, duration, id, name, publishTime, artistId, artistName, cover: imgurl })
    }
  };

  // 获取歌手描述
  const getArtistDesc = async (id: number) => {
    const result: any = await getArtistDescApi(id)
    briefDesc.value = result.briefDesc || ''
    introduction.value = result.introduction
  };

  // 播放专辑歌曲
  const playAlbum = (row: any) => {
    const { dt, al, ar, name, id } = row
    const songInfo = { songId: id, songName: name, picUrl: al.picUrl, duration: dt, artists: ar }
    useMusic.getSongUrl(songInfo)
  };

  // 获取MV地址
  const playMv = async (mvid: number | string) => {
    router.push({ path: '/video', query: { id: mvid } })
  };
</script>

<template>
  <div class="singer">
    <SingerDetailHeader :artist="artist" :user="user" :identify="identify" :fans-count="fansCount" />
    <SingerDetailBody 
      :active-name="activeName" 
      :active-collapse="activeCollapse"
      :hot-albums="hotAlbums"
      :album-size="albumSize"
      :loading="loading"
      :mvs="mvs"
      :brief-desc="briefDesc"
      :introduction="introduction"
      @play-album="playAlbum"
      @play-mv="playMv"
    />
  </div>
</template>

<style scoped>

</style>