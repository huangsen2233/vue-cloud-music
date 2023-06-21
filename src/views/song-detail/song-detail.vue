<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router"
  import SongDetailLyric from "./components/SongDetailLyric.vue";
  import SongDetailComment from "./components/SongDetailComment.vue";

  const route = useRoute()

  onMounted(() => {
    const { isScroll } = route.query
    if (isScroll === 'true') {
      document.documentElement.scrollTop = 660
    }
  })
</script>

<template>
  <div class="song-detail">
    <SongDetailLyric />
    <SongDetailComment />
  </div>
</template>

<style lang="less" scoped>

</style>