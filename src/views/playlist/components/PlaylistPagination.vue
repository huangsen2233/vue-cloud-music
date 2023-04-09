<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  const props = defineProps<{
    total: number
  }>()

</script>

<template>
  <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="props.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style scoped>

</style>