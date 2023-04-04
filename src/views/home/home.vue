<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useHomeStore } from "@/stores/home";
  import { loginStatusApi, logoutApi } from "@/api/login";
  import Header from "@/components/layout/header/Header.vue";

  const { homeId } = useHomeStore();

  
</script>

<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style scoped>
  .el-header, .el-main, .el-footer {
    padding-left: 0;
    padding-right: 0;
  }
  .el-header {
    height: 80px;
    background: rgba(36,36,36);
  }
</style>