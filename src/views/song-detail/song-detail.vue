<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import SongDetailLyric from "./components/SongDetailLyric.vue";
  import SongDetailComment from "./components/SongDetailComment.vue";

  onMounted(() => {
    const { isScroll } = route.query
    const songDetailOffsetTop = songDetailRef.value?.offsetTop
    const commentOffsetTop = commentRef.value?.$el.offsetTop
    if (isScroll === 'true') {
      document.documentElement.scrollTop = songDetailOffsetTop + commentOffsetTop - 20
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