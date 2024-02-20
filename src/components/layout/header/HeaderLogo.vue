<script lang="ts" setup>
  import { ref } from 'vue';

</script>

<template>
  <div class="header-logo">
    <div class="iconfont icon-yinle1"></div>
    <h2>Listen Music</h2>
  </div>
</template>

<style lang="less" scoped>
  .header-logo {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    color: #fff;
    font: 18px bolder;

    .icon-yinle1 {
      width: 50px;
      height: 50px;
      font-size: 50px;
      color: var(--el-color-primary);
      margin-right: 10px;
    }
  }
</style>