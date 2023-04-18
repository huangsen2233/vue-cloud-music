<script lang="ts" setup>
  import { ref, reactive, onMounted, watchEffect } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";

  onMounted(() => {
    // console.log('歌曲', songs);
  });

  const { activeName, songs } = defineProps<{
    activeName: string
    songs: any[]
  }>();

  const emits = defineEmits<{
    (event: 'tab-click', params?: any): void
  }>();

  const songTableData = ref([]);
</script>

<template>
  <el-tabs :model-value="activeName" class="demo-tabs" @tab-click="emits('tab-click')">
    <el-tab-pane name="song">
      <template #label>歌曲 {{ songs.length }}</template>
      <template #default>
        <!-- 歌曲 -->
        <el-table :data="songs" stripe style="width: 100%" header-row-class-name="table-header">
          <el-table-column type="index" width="100" align="center" />
          <el-table-column label="歌曲标题" min-width="100px" >
            <template v-slot="{ row }">
              <el-tooltip 
                effect="light" 
                placement="bottom" 
                :content="row.alia[0]" 
                :show-arrow="false"
                :show-after="600">
              {{ row.name }}</el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="时长" min-width="100px" >
            <template v-slot="{ row }">
              {{ formatTimestamp(row.dt, 'mm:ss') }}
            </template>
          </el-table-column>
          <el-table-column label="歌手" min-width="100px" >
            <template v-slot="{ row }">
              {{ row.ar[0].name }}
            </template>
          </el-table-column>
          <el-table-column label="专辑" min-width="300px">
          <template v-slot="{ row }">
              {{ row.al.name }}
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
  :deep(.table-header) {
    background-color: red;
    color: blue;
    font-size: 16px;
  }
</style>