<script lang="ts" setup>
  import { ref } from 'vue';
  import type { TabsPaneContext } from 'element-plus';

  const props = defineProps<{
    activeName: number
    singerList: any[]
  }>();

  const emits = defineEmits<{
    (event: 'switch-singer', params: number): void
    (event: 'router-singer-detail', id: number, fansCount?: number): void
  }>();

  // tabs点击事件
  const handleTabClick = (tab: TabsPaneContext) => {
    emits('switch-singer', tab.paneName as number);
  }; 

  // 跳转到歌手详情页
  const routerToSingerDetail = (id: number) => {
    emits('router-singer-detail', id);
  };
</script>

<template>
  <el-tabs :model-value="activeName" stretch @tab-click="handleTabClick">
    <template v-for="i in singerList">
      <el-tab-pane :label="i.label" :name="i.name">
        <template #label>
          <b style="font-size: 18px;">{{ i.label }}</b>
        </template>
        <template #default>
          <div class="singer" v-for="(j, index) in i.list.slice(0, 9)">
            <el-image style="width: 180px; height: 180px" :src="j.img1v1Url" fit="cover" />
            <div class="singer-info">
              <h1>{{ index + 1 }}</h1>
              <b>{{ j.name }}</b>
              <span>热度: {{ j.score }}</span>
              <a @click="routerToSingerDetail(j.id)">查看更多<el-icon><DArrowRight /></el-icon></a>
            </div>
          </div>
          <div class="singer singer-content" v-for="(j, index) in i.list.slice(9)">
            <h1>{{ index + 10 }}</h1>
            <a @click="routerToSingerDetail(j.id)">{{ j.name }}</a>
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
    justify-content: flex-start;
    padding: 30px 0;

    .singer {
      display: flex;
      justify-content: flex-start;
      width: 30%;
      margin: 0 auto 30px 0;

      &-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
        h1 {
          color: rgba(221,22,29);
          margin: 5px 0;
        }
        a {
          display: flex;
          align-items: center;
        }
        a:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }

      &-content {
        position: relative;
        & > h1 {
          color: rgba(221,22,29);
          margin: 5px 0;
        }
        & > a {
          position: absolute;
          left: 65px;
          bottom: 10px;
          font-weight: bolder;
          font-size: 16px;
        }
        & > a:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
</style>