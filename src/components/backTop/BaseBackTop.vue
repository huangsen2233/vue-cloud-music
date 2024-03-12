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
    <div class="box">
      <el-icon><ArrowUpBold /></el-icon>
      <span>TOP</span>
    </div>
  </el-backtop>
</template>

<style lang="less" scoped>
  .el-backtop {
    width: 60px;
    height: 60px;
    background-color: var(--theme-backTop-bg-color);

    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
  }
</style>