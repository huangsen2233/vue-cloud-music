<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { storeToRefs } from "pinia"
  import { formatTimestamp } from "@/utils/dateFormat";
  import { count } from "@/utils/count";
  import { useUserStore } from "@/stores/user";
  import { useMusicStore } from "@/stores/music";
  import { getUserPlaylistApi } from "@/api/user";
  import { getSongUrlApi } from "@/api/music";
  import { playlistSubscribeApi } from "@/api/playlist";

  const props = defineProps<{
    playlistId: number
    playlistDetail: any
    songs: any[]
  }>();

  const isCollect = computed(() => {
    const index = collectPlaylists.value.findIndex(i => i.id === props.playlistId)
    return index === -1 ? false : true
  });

  const { collectPlaylists, account } = storeToRefs(useUserStore());
  const { getSongUrl, addToPlaylist } = useMusicStore();

  // 获取用户收藏歌单
  const getUserPlaylist = async () => {
    const { playlist }: any = await getUserPlaylistApi({ uid: account.value.id })
    collectPlaylists.value = playlist
  };

  // 收藏、取消收藏歌单
  const handleCollect = async () => {
    const params = {
      id: props.playlistId,
      t: isCollect.value ? 2 : 1
    }
    const { code }: any = await playlistSubscribeApi(params)
    code === 200 && getUserPlaylist()
  };

  // 播放全部歌曲
  const handlePlayAll = () => {
    const allSongInfo = props.songs.map(i => ({ songId: i.id, songName: i.name, picUrl: i.al.picUrl, duration: i.dt, artists: i.ar }))
    addToPlaylist(allSongInfo)
    ElMessage({ message: '歌单成功添加到播放列表', type: 'success' })
    getSongUrl(allSongInfo[0])
  };
</script>

<template>
  <div class="title">
    <section class="title-img">
      <el-image style="width: 200px; height: 200px" :src="playlistDetail.coverImgUrl" fit="cover" />
    </section>
    <section class="title-content">
      <h3 style="margin: 0; padding-bottom: 10px;">
        <el-tag type="danger" size="large" style="font-size: 20px; padding: 20px; margin-right: 10px;">歌单</el-tag>
        {{ playlistDetail.name }}
      </h3>
      <div class="creator">
        <el-avatar size="small" style="width: 32px; height: 32px; border: 1px solid #ccc" :src="playlistDetail?.creator?.avatarUrl" />
        <span>{{ playlistDetail?.creator?.nickname }}</span>
        <span>
          {{ formatTimestamp(playlistDetail.createTime, 'YYYY-MM-DD HH:mm:ss') }} 
          <b>创建</b>
        </span>
      </div>
      <div>
        <el-button type="primary" size="large" @click="handlePlayAll">
          <el-icon style="margin-right: 5px;" size="18px"><VideoPlay /></el-icon>播放全部
        </el-button>
        <el-button :type="isCollect ? 'danger' : 'primary'" size="large" @click="handleCollect">
          <el-icon style="margin-right: 5px;" size="18px">
            <Close v-if="isCollect" />
            <Plus v-else />
          </el-icon>
          {{ isCollect ? '取消收藏' : '收藏歌单' }}
        </el-button>
      </div>
      <div v-if="playlistDetail.playCount > 0">
        <b>播放:</b> 
        {{ count(playlistDetail.playCount) }}
      </div>
      <div v-if="playlistDetail.tags?.length > 0">
        <b>标签:</b>
        <template v-for="i in playlistDetail.tags">
          <el-tag style="margin-right: 20px;">{{ i }}</el-tag>
        </template>
      </div>
      <div v-if="playlistDetail.description?.length > 0" style="width: 90%;">
        <b>介绍:</b>
        {{ playlistDetail.description }} 
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .title {
    display: flex;
    padding-bottom: 30px;

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 30px;

      .creator {
        display: flex;
        align-items: center;

        span:nth-of-type(2) {
          padding: 0 30px 0 20px;
        }
      }

      & > div {
        padding-bottom: 10px;

        b {
          padding-right: 10px;
        }
      }
    }
  }
</style>