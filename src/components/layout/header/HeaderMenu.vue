<script lang="ts" setup>
  import { ref, reactive } from 'vue'

</script>

<template>
  <div class="header-menu">
    <el-menu
      router
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="home">主页推荐</el-menu-item>
      <el-menu-item index="myMusic">我的音乐</el-menu-item>
      <el-menu-item index="3">关注</el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>

</style>