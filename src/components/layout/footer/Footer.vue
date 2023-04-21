<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { useMusicStore } from "@/stores/music";
  import { storeToRefs } from 'pinia';

  const useMusic = useMusicStore();
  const { allSong } = storeToRefs(useMusic);
  console.log('音乐数组', allSong);
  
</script>

<template>
  <div class="audio">
    <audio :src="allSong?.[0]?.url" autoplay loop controls></audio>
  </div>
</template>

<style scoped>
  .audio {
    width: 60%;
  }
</style>