<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import type { TabsPaneContext } from 'element-plus'

  const props = defineProps<{
    activeName: string
  }>();

  const emits = defineEmits<{
    (event: 'switch-singer', params: number): void
    (event: 'update:modelValue', params?: any): void
  }>();

  // tabs点击事件
  const handleTabClick = (tab: TabsPaneContext) => {
    console.log('tab点击', tab);
    emits('update:modelValue', tab.paneName);
  }; 
</script>

<template>
  <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
  .ranking-list {
    padding-bottom: 40px;
    .list {
      .item {
        display: flex;
        padding: 15px;
        cursor: pointer;

        &-name {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 10px;
        }

        .el-image {
          flex-shrink: 0;
        }
      }
      .active-item {
        background: #E6E6E6;
      }
      }
  }
</style>