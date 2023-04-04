<script setup lang="ts">
  import { onMounted } from 'vue';

  onMounted(() => {
    // 修改element-plus主题色
    // 230,0,38 - 图标的红色
    // document.body.style.setProperty('--el-color-primary', 'rgba(230,0,38)');
    // document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
    // document.body.style.setProperty('--el-color-primary-light-3', '#95d475');
  })
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
