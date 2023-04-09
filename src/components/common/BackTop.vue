<script lang="ts" setup>

  const { right, bottom, visibilityHeight } = withDefaults(defineProps<{
    right?: number
    bottom?: number
    visibilityHeight?: number
  }>(), {
    right: 100,
    bottom: 100,
    visibilityHeight: 100
  })
  
</script>

<template>
  <el-backtop :right="right" :bottom="bottom" :visibility-height="visibilityHeight">
    <div style="height: 100%; width: 100%; background-color: var(--el-bg-color-overlay); box-shadow: var(--el-box-shadow-lighter); text-align: center; line-height: 40px; color: #1989fa;">
      <el-icon><ArrowUpBold /></el-icon>
      TOP
    </div>
  </el-backtop>
</template>

<style lang="less" scoped>
  .el-backtop {
    width: 60px;
    height: 70px;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
  }
</style>