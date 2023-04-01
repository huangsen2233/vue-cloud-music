<script setup lang="ts">
  import { useHomeStore } from "@/stores/home";
  // console.log(useHomeStore);
  const { homeId } = useHomeStore();
  // console.log('--------', homeId);
  
  
</script>

<template>
  <div>home</div>
  <div> {{ homeId }}</div>

  <el-button type="primary">Primary</el-button>
  <el-link type="primary">primary</el-link>
</template>

<style scoped>

</style>