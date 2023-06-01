<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useMusicStore } from "@/stores/music";
  import { storeToRefs } from 'pinia';
  import { formatTimestamp, formatDuration } from '@/utils/dateFormat';

  // const props = defineProps<{}>();
  // const emits = defineEmits<{}>();

  const { clearList, changeTime } = useMusicStore();
  const { songList, currentTime, duration } = storeToRefs(useMusicStore());

  const openDrawer = ref(false);

  const audioRef = ref<HTMLAudioElement>()
</script>

<template>
  <audio ref="audioRef" src="" autoplay loop controls style="display: none;"></audio>
  <div class="audio-right">
    <div class="song-time"><el-slider v-model="currentTime" :show-tooltip="false" :min="0" :max="duration" @change="changeTime" /></div>
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
        stripe
        highlight-current-row
        empty-text="暂无歌曲~"
        :show-header="false"
        :cell-style="{'text-align': 'center'}"
        header-cell-class-name="table-header" 
      >
        <el-table-column label="歌曲">
          <template v-slot="{ row }: any">
            <span>{{ row.songName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default>
            <el-icon class="icon" title="暂停" v-if="false"><VideoPause /></el-icon>
            <el-icon class="icon" title="播放"><VideoPlay /></el-icon>
            <el-icon class="icon" title="下载"><Download /></el-icon>
            <el-icon class="icon" title="分享"><Share /></el-icon>
            <el-icon class="icon" title="删除"><Delete /></el-icon>
          </template> 
        </el-table-column>
        <el-table-column label="时长">
          <template v-slot="{ row }: any">
            <span>{{ formatTimestamp(row.duration, 'mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="歌手">
          <template v-slot="{ row }: any">
            <div class="singer" v-for="(j, index) in row.artists">
              <a>{{ j.name }}</a>
              <span v-if="index !== row.artists.length - 1"> / </span>
            </div>
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
    width: 40% !important;
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