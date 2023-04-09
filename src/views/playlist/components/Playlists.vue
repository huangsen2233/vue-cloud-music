<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { PropType } from 'vue';
  import PlaylistItem from '@/components/common/PlaylistItem.vue';

  const props = defineProps({
    playLists: Array as PropType<any[]>
  });
</script>

<template>
  <div v-for="item in playLists" :key="item"> 
    <PlaylistItem :url="item.coverImgUrl" :name="item.name" :play-count="item.playCount" :creator-name="item.creator.nickname"/>
  </div>
</template>

<style scoped>

</style>