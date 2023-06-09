<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useMusicStore } from "@/stores/music";
  import { formatTimestamp, formatDuration } from '@/utils/dateFormat';
  import type { CurrentSongInfoType } from "./type"

  const { clearList, changeTime, restoreState, deleteSong, play, getSongUrl } = useMusicStore();
  const { songList, currentTime, duration, currentSongInfo, isPlay } = storeToRefs(useMusicStore());

  const openDrawer = ref(false);

  // 播放歌曲高亮效果
  const rowStyle = ({ row }: any) => {
    return row.songId ===  currentSongInfo.value.songId ? 'background: rgba(160,207,255,0.3)' : ''
  }

  const playSong = (row: CurrentSongInfoType) => {
    if (row.songId === currentSongInfo.value.songId) {
      play();  // 继续播放当前歌曲
    } else {
      getSongUrl(row);  // 播放其它歌曲
    }
  }

  const handleDeleteSong = (row: CurrentSongInfoType) => {
    if (row.songId === currentSongInfo.value.songId) {
      restoreState() 
    }
    ElMessage({ message: `成功删除${row.songName}>`, type: 'success' })
    deleteSong(row.songId) // 删除歌曲
  }
</script>

<template>
  <audio src="" autoplay loop controls style="display: none;"></audio>
  <div class="audio-right">
    <div class="song-time">
      <el-slider v-model="currentTime" :show-tooltip="false" :min="0" :max="duration" @change="changeTime" :disabled="duration === 0 ? true : false" />
    </div>
    <div class="duration">{{ formatDuration(currentTime) }} / {{ formatDuration(duration) }}</div>
    <div class="iconfont icon-bofanglan-geci" title="展示歌词"></div>
    <div class="iconfont icon-24gl-playlistMusic4" title="展示播放列表" @click="openDrawer = !openDrawer">
      <span v-if="songList.length > 0" style="font-size: 16px;">{{ songList.length }}</span>
    </div>
  </div>
  <!-- 播放列表 -->
  <el-drawer v-model="openDrawer" direction="rtl">
    <template #header>
      <h2>播放列表({{ songList.length }})</h2>
      <span class="iconfont icon-qingkonghuancun" @click="clearList">清空列表</span>
    </template>
    <template #default>
      <el-table 
        :data="songList" 
        empty-text="暂无歌曲~"
        :show-header="false"
        header-cell-class-name="table-header" 
        :row-style="rowStyle"
      >
        <el-table-column label="歌曲">
          <template v-slot="{ row }: any">
            <b style="font-size: 16px;">{{ row.songName }}</b>
            <div>
              <template v-for="(j, index) in row.artists">
                <a>{{ j.name }}</a>
                <span v-if="index !== row.artists.length - 1"> / </span>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template v-slot="{ row }">
            <el-icon v-show="isPlay && row.songId === currentSongInfo.songId" class="icon" title="暂停" @click="play"><VideoPause /></el-icon>
            <el-icon v-show="!isPlay || row.songId !== currentSongInfo.songId" class="icon" title="播放" @click="playSong(row)"><VideoPlay /></el-icon>
            <el-icon class="icon" title="下载"><Download /></el-icon>
            <el-icon class="icon" title="分享"><Share /></el-icon>
            <el-icon class="icon" title="删除" @click="handleDeleteSong(row)"><Delete /></el-icon>
          </template> 
        </el-table-column>
        <el-table-column label="时长" width="100px">
          <template v-slot="{ row }: any">
            <span>{{ formatTimestamp(row.duration, 'mm:ss') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-drawer>
</template>

<style lang="less">
  .audio-right {
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > div {
      padding-right: 20px;
    }

    .song-time {
      width: 200px;
    }

    .iconfont {
      font-size: 25px;
    }
    .iconfont:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }

  .el-drawer.rtl {
    width: 30% !important;

    .el-drawer__header {
      margin-bottom: 0;
      border-bottom: 1px solid #ccc;
    }

    .icon-qingkonghuancun {
      padding-right: 20px;
    }
  }

  .iconfont {
    font-size: 20px;
  }
  .iconfont:hover {
    cursor: pointer;
    color: var(--el-color-primary);
  }

  .el-table {
    .el-icon {
      cursor: pointer;
      font-size: 20px;
      padding-left: 10px;
      transition: all 0.2s;
    }
    .el-icon:hover {
      transform: scale(1.1);
      color: var(--el-color-primary);
    }
  }
</style>