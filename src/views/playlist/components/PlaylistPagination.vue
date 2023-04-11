<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { playlistType } from "../playlist.vue";

  const props = withDefaults(defineProps<{
    currentPage?: number
    pageSize?: number
    total?: number
    small?: boolean
    disabled?: boolean
    background?: boolean
  }>(), {
    currentPage: 1,
    pageSize: 30,
    total: 0,
    small: false,
    disabled: false,
    background: true
  });

  const emits = defineEmits<{
    (event: 'on-page', params: playlistType): void
    (event: 'on-size', params: playlistType): void
  }>();


  // 页数改变事件
  const handleCurrentChange = (currentPage: number) => {
    console.log('页数改变', currentPage);
    emits('on-page', { offset: currentPage * props.pageSize });
  };

  // 每页个数改变事件
  const handleSizeChange = (pageSize: number) => {
    console.log('每页个数改变', pageSize);
    emits('on-size', { limit: pageSize });
    
  };

</script>

<template>
  <el-pagination
    :model-value:current-page="props.currentPage"
    model-value:page-size="props.pageSize"
    :total="props.total"
    :page-sizes="[30, 60, 90, 120]"
    :small="props.small"
    :disabled="props.disabled"
    :background="props.background"
    layout="total, sizes, prev, pager, next, jumper"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<style scoped>
  .el-pagination {
    display: flex;
    justify-content: center;
  }
</style>