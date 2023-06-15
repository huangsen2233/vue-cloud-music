<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  const props = defineProps<{}>();
  const emits = defineEmits<{(event: 'on-click', params: number): void}>();
</script>

<template>
  <div class="">
    歌词
  </div>
</template>

<style lang="less" scoped>

</style>