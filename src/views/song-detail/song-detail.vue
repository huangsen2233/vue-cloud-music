<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import SongDetailLyric from "./components/SongDetailLyric.vue";
  import SongDetailComment from "./components/SongDetailComment.vue";

  onMounted(() => {
    const { isScroll } = route.query
    const el = commentRef.value?.$el
    if (isScroll === 'true') {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const route = useRoute();
  const commentRef = ref<InstanceType<typeof SongDetailComment>>();
  const songDetailRef = ref();
</script>

<template>
  <div class="song-detail" ref="songDetailRef">
    <SongDetailLyric />
    <SongDetailComment ref="commentRef" />
  </div>
</template>

<style lang="less" scoped>
  .song-detail {
    position: relative;
  }
</style>