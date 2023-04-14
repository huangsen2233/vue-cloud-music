<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  const props = withDefaults(defineProps<{
    currentPage?: number
    pageSize?: number
    pageSizes?: number[]
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
    (event: 'on-page', params: any): void
    (event: 'on-size', params: any): void
  }>();


  // 页数改变事件
  const handleCurrentChange = (currentPage: number) => {
    // console.log('页数改变', currentPage);
    emits('on-page', { currentPage, pageSize: props.pageSize });
  };

  // 每页个数改变事件
  const handleSizeChange = (pageSize: number) => {
    // console.log('每页个数改变', pageSize);
    emits('on-size', { pageSize, currentPage: props.currentPage });
  };

</script>

<template>
  <el-pagination
    :current-page="props.currentPage"
    :page-size="props.pageSize"
    :total="props.total"
    :page-sizes="props.pageSizes"
    :default-page-size="props.pageSizes?.[1]"
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