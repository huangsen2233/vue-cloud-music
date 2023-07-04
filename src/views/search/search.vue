<script lang="ts" setup>
  import { ref, onMounted, provide, computed } from 'vue';
  import { useRoute, useRouter } from "vue-router";
  import { useMusicStore } from "@/stores/music";
  import { cloudSearchApi } from "@/api/search";
  import { getVideoDetailApi, getVideoUrlApi } from "@/api/video";
  import type { SearchType, MvType } from "./type";
  import type { TabPaneName } from 'element-plus';
  import SongTable from '@/components/songTable/SongTable.vue';
  import ArtistList from '@/components/artistList/ArtistList.vue';
  import PlaylistItem from '@/components/playlistItem/PlaylistItem.vue';
  import Mvs from '@/components/mvs/Mvs.vue';

  const route = useRoute();
  const router = useRouter();
  const { getSongUrl, addToPlaylist } = useMusicStore();

  onMounted(() => {
    cloudSearch({ ...cloudSearchParams.value });
  });

  const activeName = ref(1);
  const activeLable = ref('单曲');
  const songs = ref<any>([]);
  const artists = ref<any>([]);
  const playlists = ref<any>([]);
  const mvs = ref<MvType[]>([]);
  const cloudSearchParams = ref<SearchType>({ keywords: route.query.keywords as string, limit: 30, offset: 0, type: 1 });

  // 搜索结果的数量
  const searchNumber = computed(() => {
    let number;
    switch (activeName.value) {
      case 1: number = songs.value.length; break;
      case 100: number = artists.value.length; break;
      case 1000: number = playlists.value.length; break;
      case 1004: number = mvs.value.length; break;
      case 1014: number = mvs.value.length; break;
    };
    return number;
  });

  // 搜索
  const cloudSearch = async (params: SearchType) => {
    const { result }: any = await cloudSearchApi(params);
    console.log("🚀 ~ file: HeaderProfile.vue:31 ~ searchSuggestApi ~ 搜索结果:", result)
    switch (activeName.value) {
      case 1: 
        songs.value = result?.songs ?? []; 
        activeLable.value = '单曲';
        break;
      case 100: 
        artists.value = result?.artists ?? [];
        activeLable.value = '歌手';
        break;
      case 1000: 
        playlists.value = result?.playlists ?? []; 
        activeLable.value = '歌单';
        break;
      case 1004: 
        mvs.value.length = 0;
        if (result?.mvs) {
          for (let i of result?.mvs) {
            const { cover, playCount, duration, id, name, artistId, artistName, publishTime } = i;
            mvs.value.push({ cover, playCount, duration, id, name, artistId, artistName, publishTime })
          }
        }
        activeLable.value = 'MV';
        break;
      case 1014: 
        mvs.value.length = 0;
        if (result?.videos) {
          for (let i of result?.videos) {
            const { coverUrl, playTime, durationms, vid, title, creator } = i;
            mvs.value.push({ 
              cover: coverUrl, playCount: playTime, duration: durationms, id: vid, 
              name: title, artistId: creator[0].userId, artistName: creator[0].userName
            });
          }
        }
        activeLable.value = '视频';
        break;
    };
  };

  // 播放歌曲
  const playSong = (row: any) => {
    const { dt, al, ar, name, id } = row
    const songInfo = { songId: id, songName: name, picUrl: al.picUrl, duration: dt, artists: ar }
    getSongUrl(songInfo)
  };

  // 添加到播放列表
  const addPlaylist = (songInfo: any) => {
    addToPlaylist(songInfo)
  };

  // 路由跳转到歌单详情页
  const routerToPlaylistDetail = (id: number) => {
    router.push({ path: '/playlist-detail', query: { id } })
  };

  // 路由跳转到歌手详情页
  const routerToSingerDetail = (id: number, fansCount?: number) => {
    router.push({ path: '/singer-detail', query: { id, fansCount } });
  };

  // 路由跳转到MV视频
  const routerToVideo = (id: number | string) => {
    router.push({ path: '/video', query: { id } });
  };
  
  // tab的change事件
  const handleTabChange = (name: TabPaneName) => {
    cloudSearch({ ...cloudSearchParams.value, type: name as number})
  };

  provide('router-playlist-detail', routerToPlaylistDetail);
</script>

<template>
  <h3>搜索内容: <span style="color: var(--el-color-primary)">{{ route.query.keywords }}</span> , 找到{{ activeLable }}{{ searchNumber }}条</h3>
  <el-tabs type="border-card" v-model="activeName" @tab-change="handleTabChange">
    <el-tab-pane label="单曲" :name="1">
      <template #label><b style="font-size: 16px;">单曲</b></template>
      <template #default>
        <!-- 单曲 -->
        <SongTable :songs="songs" @play-song="playSong" @add-playlist="addPlaylist" @router-singer-detail="routerToSingerDetail" />
      </template>
    </el-tab-pane>
    <el-tab-pane label="歌手" :name="100">
      <template #label>
        <b style="font-size: 16px;">歌手</b>
      </template>
      <template #default>
        <!-- 歌手 -->
        <ArtistList :artists="artists" @router-singer-detail="routerToSingerDetail" />
      </template>
    </el-tab-pane>
    <el-tab-pane label="歌单" :name="1000">
      <template #label>
        <b style="font-size: 16px;">歌单</b>
      </template>
      <template #default>
        <!-- 歌单 -->
        <div class="playlist">
          <template v-for="item in playlists">
            <PlaylistItem 
              :id="item.id"
              :url="item.coverImgUrl" 
              :name="item.name" 
              :play-count="item.playCount" 
              :creator-name="item.creator.nickname"
              :creator-url="item.creator.avatarUrl"
              :user-id="item.creator.userId"
              :create-time="item.createTime"
              :signature="item.creator.signature"
              :tags="item.creator.expertTags"
            />
          </template>
        </div>
      </template>
    </el-tab-pane>
    <el-tab-pane label="MV" :name="1004">
      <template #label>
        <b style="font-size: 16px;">MV</b>
      </template>
      <template #default>
        <!-- MV -->      
        <Mvs :mvs="mvs" @play-mv="routerToVideo" @router-singer-detail="routerToSingerDetail" />
      </template>
    </el-tab-pane>
    <el-tab-pane label="视频" :name="1014">
      <template #label>
        <b style="font-size: 16px;">视频</b>
      </template>
      <template #default>
        <!-- 视频 -->
        <Mvs :mvs="mvs" @play-mv="routerToVideo" @router-singer-detail="routerToSingerDetail" />
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
  .playlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;

    &-item {
      flex: 15%;
      margin: 0 calc(10% / 5) 30px 0;
    }
    
    &-item:nth-child(6n) {
      margin-right: 0;
    }
  }
</style>