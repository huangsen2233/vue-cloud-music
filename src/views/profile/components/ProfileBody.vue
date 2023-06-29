<script lang="ts" setup>
  import { ref, onMounted, provide } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRouter } from 'vue-router';
  import { useUserStore } from "@/stores/user";
  import { useMusicStore } from "@/stores/music";
  import { getUserPlaylistApi, getRecentSongApi } from "@/api/user";
  import PlaylistItem from '@/components/playlistItem/PlaylistItem.vue';
  import SongTable from '@/components/songTable/SongTable.vue';

  onMounted(() => {
    const { id } = account.value 
    getUserPlaylist(id)
    getRecentSong()
  });

  const { account, collectPlaylists } = storeToRefs(useUserStore());
  const { getSongUrl, addToPlaylist } = useMusicStore();
  const router = useRouter();
  const createPlaylist = ref<any[]>([]); // 创建的歌单
  const collectPlaylist = ref<any[]>([]); // 收藏的歌单
  const songs = ref<any[]>([]); // 播放记录 - 歌曲

  // 获取用户歌单
  const getUserPlaylist = async (id: number) => {
    const { playlist }: any = await getUserPlaylistApi({ uid: id })
    // console.log("🚀 ~ file: Profile.vue:12 ~ onMounted ~ 用户歌单:", playlist)
    collectPlaylists.value = playlist
    playlist.forEach((i: any) => {
      if (i.subscribed === true) {
        collectPlaylist.value.push(i)
      } else {
        createPlaylist.value.push(i)
      }
    })
  };

  // 获取用户播放记录
  const getRecentSong = async () => {
    const { data: { list } }: any = await getRecentSongApi()
    songs.value = list.map((i: any) => i.data)
  };

  // 路由跳转到歌单详情
  const routerToPlaylistDetail = (id: number) => {
    router.push({ path: '/playlist-detail', query: { id } })
  };

  // 路由跳转到歌手详情
  const routerToSingerDetail = (id: number) => {
    router.push({ path: '/singer-detail', query: { id } })
  };

  // 播放歌曲
  const playSong = async (row: any) => {
    const { dt, al, ar, name, id } = row;
    const songInfo = { songId: id, songName: name, picUrl: al.picUrl, duration: dt, artists: ar };
    getSongUrl(songInfo);
  };

  // 添加到播放列表
  const addPlaylist = (songInfo: any) => {
    addToPlaylist(songInfo)
  };

  provide('router-playlist-detail', routerToPlaylistDetail);
</script>

<template>
  <div class="profile-body">
    <section class="profile-body-record">
      <h3>我的听歌记录({{ songs.length }})</h3>
      <SongTable :songs="songs" @play-song="playSong" @add-playlist="addPlaylist" @router-singer-detail="routerToSingerDetail" />
    </section>
    <section class="profile-body-create">
      <h3>我创建的歌单({{ createPlaylist.length }})</h3>
      <div class="profile-body-create_playlist">
        <template v-for="i in createPlaylist">
          <PlaylistItem  
            :id="i.id"
            :url="i.coverImgUrl" 
            :name="i.name" 
            :play-count="i.playCount" 
          />
        </template>
      </div>
    </section>
    <section class="profile-body-collect">
      <h3>我收藏的歌单({{ collectPlaylist.length }})</h3>
      <div class="profile-body-collect_playlist">
        <template v-for="i in collectPlaylist">
          <PlaylistItem  
            :id="i.id"
            :url="i.coverImgUrl" 
            :name="i.name" 
            :play-count="i.playCount" 
            :creator-name="i.creator.nickname"
            :creator-url="i.creator.avatarUrl"
            :user-id="i.creator.userId"
            :create-time="i.createTime"
            :signature="i.creator.signature"
            :tags="i.tags"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .profile-body {
    &-record {
      padding-bottom: 30px;

      & > h3 {
        padding: 20px 0;
        border-bottom: 5px solid var(--el-color-primary);
      }

      & > .song {
        max-height: 400px;
        overflow-y: scroll;
      }
    }

    &-create, &-collect {
      & > h3 {
        padding: 20px 0;
        border-bottom: 5px solid var(--el-color-primary);
      }
      &_playlist {
        display: flex;
        flex-wrap: wrap;
        .playlist-item {
          flex-basis: 200px;
          margin: 0 30px 30px 0;
        }
      }
    }

    // &-collect {
    //   & > h3 {
    //     padding: 20px 0;
    //     border-bottom: 5px solid var(--el-color-primary);
    //   }
    //   &_playlist {
    //     display: flex;
    //     flex-wrap: wrap;
    //     .playlist-item {
    //       flex-basis: 200px;
    //       margin: 0 30px 30px 0;
    //     }
    //   }
    // }
  }
</style>