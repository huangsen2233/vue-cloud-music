<script lang="ts" setup>
  import { ref, reactive, onMounted, watchEffect } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";
  import { useMusicStore } from "@/stores/music";

  onMounted(() => {
    // console.log('歌曲', songs);
  });

  const useMusic = useMusicStore();

  const { activeName, songs } = defineProps<{
    activeName: string
    songs: any[]
  }>();

  const emits = defineEmits<{
    (event: 'tab-click', params?: any): void
  }>();

  const songUrls = ref([]);

  const handleDbClick = async (row: any) => {
    console.log('双击事件', row);
    useMusic.getSongUrl(row);
    /* const result = await getSongUrlApi([row.id]);
    console.log("🚀 ~ file: SongList.vue:24 ~ handleDbClick ~ result: 音乐url", result)
    if (result.code === 200) {
      songUrls.value = result.data;
    } */
  }
</script>

<template>
  <el-tabs :model-value="activeName" class="demo-tabs" @tab-click="emits('tab-click')">
    <el-tab-pane name="song">
      <template #label>歌曲 {{ songs.length }}</template>
      <template #default>
        <!-- 歌曲 -->
        <el-table 
          :data="songs" 
          stripe 
          style="width: 100%" 
          header-cell-class-name="table-header" 
          @row-dblclick="handleDbClick"
        >
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column label="歌曲标题">
            <template v-slot="{ row }">
              <span style="cursor: pointer;">{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时长" >
            <template v-slot="{ row }">
              <span style="cursor: pointer;">{{ formatTimestamp(row.dt, 'mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="歌手" >
            <template v-slot="{ row }">
              <span style="cursor: pointer;">{{ row.ar[0].name  }}</span>
            </template>
          </el-table-column>
          <el-table-column label="专辑">
          <template v-slot="{ row }">
              <span style="cursor: pointer;">{{ row.al.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
    <el-tab-pane name="comment">
      <template #label>评论 {{ activeName.length }}</template>
    </el-tab-pane>
    <el-tab-pane name="collect">
      <template #label>收藏 {{ activeName.length }}</template>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
  .el-table {
    border: 1px solid #ccc;

    :deep(.table-header) {
      background: linear-gradient(to bottom, #fff, #eee) !important;
      font-size: 16px;
      border-right: 1px solid #ccc !important;
      border-bottom: 1px solid #ccc !important;
    }
  }
</style>