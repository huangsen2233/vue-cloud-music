<script setup lang="ts">
  import { onMounted } from 'vue';
  import Home from "@/views/home/home.vue";

  onMounted(() => {
    // 修改element-plus主题色
    // document.body.style.setProperty('--el-color-primary', 'rgba(230,0,38)');
    // document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
    // document.body.style.setProperty('--el-color-primary-light-3', '#95d475');
  })
</script>

<template>
  <div id="app">
    <Home />
  </div>
</template>

<style scoped>
  #app {
    width: 100%;
    height: 100%;
    background-color: rgba(245,245,245);
  }
</style>
