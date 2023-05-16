<script lang="ts" setup>
  import { ref, reactive} from 'vue';
  import { useMusicStore } from "@/stores/music";
  import { storeToRefs } from 'pinia';
  import logoIcon from "@/assets/imgs/logo.png";

  // const props = defineProps<{}>();
  // const emits = defineEmits<{}>();

  const useMusic = useMusicStore();
  const { currentSongInfo } = storeToRefs(useMusic);
</script>

<template>
  <div class="audio-left">
    <!-- 
      阿里巴巴图标库再重新找个图标logo 
    -->
    <el-image style="width: 80px; height: 80px" :src="currentSongInfo.picUrl || logoIcon" fit="cover" />
    <section>
      <span>{{ currentSongInfo.name }}</span>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .audio-left {
    // display: flex;
    // align-items: center;
  }
</style>