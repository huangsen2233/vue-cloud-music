<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { PropType } from 'vue';

  const { playlistInfo } = defineProps({
    playlistInfo: Object as any
  });
</script>

<template>
  <div class="playlist-item">
    <el-image style="width: 95%; height: 950%" :src="playlistInfo.picUrl" fit="contain" />
    <p>{{ playlistInfo.name }}</p>
  </div>
</template>

<style scoped>

</style>