<script lang="ts" setup>
  import { ref, reactive, toRef, watch, onMounted } from 'vue';
  import type { TabsPaneContext } from 'element-plus'

  const props = defineProps<{
    activeName: number
    singerList: any[]
  }>();

  const emits = defineEmits<{
    (event: 'switch-singer', params: number): void
  }>();

  // tabs点击事件
  const handleTabClick = (tab: TabsPaneContext) => {
    emits('switch-singer', tab.paneName as number);
  }; 
</script>

<template>
  <el-tabs :model-value="activeName" stretch @tab-click="handleTabClick">
    <template v-for="i in singerList">
      <el-tab-pane :label="i.label" :name="i.name">
        <template #default>
          <div class="singer" v-for="j in i.list">
            <el-image style="width: 180px; height: 180px" :src="j.img1v1Url" fit="cover" />
            <!-- <el-image style="width: 60px; height: 60px" :src="j.picUrl" fit="cover" /> -->
            <div class="singer-info">
              <h1>{{ j.lastRank + 1 }}</h1>
              <span>{{ j.name }}</span>
              <span>热度: {{ j.score }}</span>
              <a>查看更多<el-icon><DArrowRight /></el-icon></a>
            </div>
          </div>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<style lang="less" scoped>
  .el-tab-pane {
    display: flex;
    flex-wrap: wrap;
  }
  .singer {
    flex: 33.3%;
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 30px;

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h1:nth-of-type(n) {
        color: rgba(221,22,29);
      }

      a:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
</style>