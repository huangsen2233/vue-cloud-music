<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { titleType } from "../type";
  
  const emits = defineEmits<{
    (event: 'switch-type', params: titleType): void
  }>();

  const collapseList = [
    { title: '全部', name: -1 },
    { title: '华语', name: 7 },
    { title: '欧美', name: 96 },
    { title: '日本', name: 8 },
    { title: '韩国', name: 16 },
    { title: '其它', name: 0 },
  ];

  const collapseItemList = [
    { title: '男歌手', name: 1 },
    { title: '女歌手', name: 2 },
    { title: '组合/乐队', name: 3 }
  ];

  const activeNameArr = reactive([-1]);

  const isActive1 = ref();
  const isActive2 = ref();

  // 切换歌手分类
  const changeSinger = (index1: number, index2: number, i: any, j: any) => {
    isActive1.value = index1;
    isActive2.value = index2;
    emits('switch-type', { area: i.name, type: j.name, title: `${i.title}${j.title}` });
  };
</script>

<template>
  <div class="type">
    <el-collapse :model-value="activeNameArr">
      <el-collapse-item v-for="(i,index1) in collapseList" :title="i.title" :name="i.name">
        <div v-for="(j,index2) in collapseItemList" :key="index2" @click="changeSinger(index1,index2,i,j)">
          <a :class="[isActive1 === index1 && isActive2 === index2 ? 'activeColor' : '']">{{ i.title }}{{ j.title }}</a>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="less" scoped>
  .type {
    width: 200px;
    border-right: 1px solid rgb(230, 230, 230);
    // border-right: 1px solid rgb(230, 230, 230);
    padding-left: 10px;
    background-color: var(--theme-card-bg-color);
  }

  :deep(.el-collapse) {
    background-color: red;
    
    &-item {
      &__header {
        font-size: 16px;
        font-weight: 600;
        font-family: "Microsoft Yahei";
      }

      &__content {
        font-size: 14px;

        & > div {
          padding: 10px 0 10px 20px;
          position: relative;
        }

        & > div::before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--theme-card-bg-color);
        }

        & > div:hover a {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
  .activeColor {
    color: var(--el-color-primary);
  }
</style>