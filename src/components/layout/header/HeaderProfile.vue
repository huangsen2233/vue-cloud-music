<script lang="ts" setup>
  import { ref, reactive } from 'vue'

  const searchValue = ref();
</script>

<template>
  <div class="header-profile">
    <el-input v-model="searchValue" placeholder="请输入" size="large">
      <template #prefix>
        <el-icon class="el-input__icon"><Search /></el-icon>
      </template>
    </el-input>
    <div class="profile">
      <el-icon><Avatar /></el-icon>
      <span>请先登录</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .header-profile {
    display: flex;
    color: #fff;
    font-size: 20px;

    .profile{
      color: #fff;
    }
  }
  
  .el-input__icon {
    font-size: 20px;
    color: blue;
  }
</style>