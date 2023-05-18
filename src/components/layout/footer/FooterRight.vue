<script lang="ts" setup>
  import { ref, reactive} from 'vue';
  import { useMusicStore } from "@/stores/music";
  import { storeToRefs } from 'pinia';
  import { formatTimestamp } from '@/utils/dateFormat';

  // const props = defineProps<{}>();
  // const emits = defineEmits<{}>();

  const useMusic = useMusicStore();
  const { currentSongInfo, currentSongData, songList } = storeToRefs(useMusic);

  const songTime = ref(0)
  const nowTime = ref(0)
  const allTime = ref('03:50')
  const songNumber = ref(25)

  const drawer = ref(false);
</script>

<template>
  <audio :src="currentSongData?.[0]?.url" autoplay loop controls style="display: inline-block;"></audio>

  <div class="audio-right">
    <div class="song-time"><el-slider v-model="songTime" :show-tooltip="false" :min="0" :max="currentSongInfo.duration" /></div>
    <div class="duration">{{ nowTime }} / {{ formatTimestamp(currentSongInfo.duration, "mm:ss") || allTime }}</div>
    <div class="iconfont icon-bofanglan-geci" title="展示歌词"></div>
    <div class="iconfont icon-24gl-playlistMusic4" title="展示播放列表" @click="drawer = !drawer">
      <span v-if="songList.length > 0" style="font-size: 16px;">{{ songList.length }}</span>
    </div>
  </div>

  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h3>播放列表({{ songList.length }})</h3>
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
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column label="歌曲" min-width="300">
          <template v-slot="{ row }: any">
            <div class="song">
              <span>{{ row.songName }}</span>
              <span class="icon">
                <el-icon class="icon" title="播放"><CaretRight /></el-icon>
                <el-icon class="icon" title="添加到播放列表"><FolderAdd /></el-icon>
                <el-icon class="icon" title="下载"><Download /></el-icon>
                <el-icon class="icon" title="分享"><Share /></el-icon>
                <el-icon class="icon" title="更多"><MoreFilled /></el-icon>
              </span>
            </div>
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
    width: 50% !important;
  }
</style>