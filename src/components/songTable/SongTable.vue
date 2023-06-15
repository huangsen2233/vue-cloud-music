<script lang="ts" setup>
  import { ref, reactive} from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";

  const props = defineProps<{
    songs: any[]
  }>();

  const emits = defineEmits<{
    (event: 'play-song', params: any): void
    (event: 'router-singer-detail', id: number): void
  }>();
</script>

<template>
  <div class="song">
    <el-table 
      :data="songs" 
      stripe
      highlight-current-row
      :cell-style="{'text-align': 'center'}"
      header-cell-class-name="table-header" 
      @row-dblclick="(row: any) => emits('play-song', row)"
    >
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column label="歌曲" min-width="300">
        <template v-slot="{ row }: any">
          <div class="song">
            <span>{{ row.name }}</span>
            <span class="icon">
              <el-icon class="icon" title="播放" @click="emits('play-song', row)"><CaretRight /></el-icon>
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
          <span>{{ formatTimestamp(row.dt, 'mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template v-slot="{ row }: any">
          <div class="singer">
            <a @click="emits('router-singer-detail', row.ar[0].id)">{{ row.ar[0].name }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template v-slot="{ row }: any">
          <span>{{ row.al.name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped>
  .el-table {
    border: 1px solid #ccc;

    :deep(.table-header) {
      text-align: center;
      background: linear-gradient(to bottom, #fff, #eee) !important;
      font-size: 16px;
      border-right: 1px solid #ccc !important;
      border-bottom: 1px solid #ccc !important;
    }

    .song {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;

      .icon {
        opacity: 0;
        .el-icon {
          cursor: pointer;
          font-size: 20px;
          padding-left: 10px;
          transition: all 0.2s;
        }
        .el-icon:hover {
          transform: scale(1.2);
          color: var(--el-color-primary);
        }
      }
    }

    .song:hover .icon {
      opacity: 1;
    }

    .singer:hover a {
      cursor: pointer;
      text-decoration: underline;
    }
  }
</style>