<script lang="ts" setup>
  import { ref, reactive} from 'vue';
  import { useMusicStore } from "@/stores/music";
  import { storeToRefs } from 'pinia';

  // const props = defineProps<{}>();
  // const emits = defineEmits<{}>();

  const useMusic = useMusicStore();
  const { songData } = storeToRefs(useMusic);
</script>

<template>
  <div class="audio-center">
    <audio :src="songData?.[0]?.url" autoplay loop controls></audio>
  </div>
</template>

<style lang="less" scoped>

</style>