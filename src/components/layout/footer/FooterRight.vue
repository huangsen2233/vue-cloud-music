<script lang="ts" setup>
  import { ref, reactive} from 'vue';

  // const props = defineProps<{}>();
  // const emits = defineEmits<{}>();
  const nowTime = ref('02:20')
  const allTime = ref('03:50')
  const songNumber = ref(25)
</script>

<template>
  <div class="audio-right">
    <div class="duration">{{ nowTime }} / {{ allTime }}</div>
    <div class="iconfont icon-bofanglan-geci" title="展示歌词"></div>
    <div class="iconfont icon-24gl-playlistMusic4" title="展示播放列表">
      <span style="font-size: 16px;">{{ songNumber }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .audio-right {
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > div {
      padding-right: 20px;
    }

    .iconfont {
      font-size: 25px;
    }
    .iconfont:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }
</style>