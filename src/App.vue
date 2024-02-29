<script setup lang="ts">
  import { onMounted } from 'vue';
  import Home from "@/views/home/home.vue";

  onMounted(() => {
    // 修改element-plus主题色
    // document.body.style.setProperty('--el-color-primary', 'rgba(230,0,38)');
    // document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
    // document.body.style.setProperty('--el-color-primary-light-3', '#95d475');
    // document.body.style.setProperty('--light-theme', 'rgba(245,245,245)');
    // document.body.style.setProperty('--dark-theme', 'rgba(0,0,0)');
    document.querySelector('html')?.setAttribute('class', 'light')
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
    /* background-color: var(--theme-bg-color); */
  }
</style>
