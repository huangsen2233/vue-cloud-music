<script lang="ts" setup>
  import { ref, reactive, onMounted, watch } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";
  import { useMusicStore } from "@/stores/music";

  onMounted(() => {
    console.log('热门评论', props.hotComments);
    // currentComment.value = hotComments;
  });

  watch(() => props.hotComments, (newVal, oldVal) => {
    console.log('监视的热门评论', newVal, oldVal);
    
  }, { deep: true, immediate: true });

/*  watch(() => commentTotal, (newVal, oldVal) => {
    console.log('监视的总数', newVal, oldVal);
    
  }, { deep: true }); */

  const useMusic = useMusicStore();
  // { activeName, songs, hotComments, newComments, commentTotal }
  const props = defineProps<{
    activeName: string
    songs: any[]
    hotComments: any[]
    newComments: any[]
    commentTotal: number
  }>();

  const emits = defineEmits<{
    (event: 'tab-click', params?: any): void
  }>();

  const songUrls = ref([]);
  const currentComment: any = ref([]);
  const currentCommentType = ref('hot');

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
      <template #label>评论 {{ commentTotal }}</template>
      <!-- 评论 -->
      <template #default>
        <div>发表我的评论</div>
        <!-- <section>
          <div>
            <h3>热门评论</h3>
            <h3>最新评论</h3>
          </div>
          <div>
            <template v-for="i in currentComment">
              <div>评论
                {{ i.content }}1542286267820
              </div>
              <div>时间
                {{ formatTimestamp(i.time, 'YYYY-MM-DD') }}
              </div>
            </template>
          </div>
        </section> -->
      </template>
    </el-tab-pane>
    <el-tab-pane name="collect">
      <template #label>收藏 {{ 0 }}</template>
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