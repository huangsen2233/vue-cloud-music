<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import logoPng from '@/assets/imgs/logo.png';

</script>

<template>
  <div class="header-logo">
    <el-image style="width: 60px; height: 60px" :src="logoPng" fit="contain" />
    <h2>Music</h2>
  </div>
</template>

<style lang="less" scoped>
  .header-logo {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    color: #fff;
    font: 22px bolder;

    .el-image {
      margin-right: 10px;
    }
  }
</style>