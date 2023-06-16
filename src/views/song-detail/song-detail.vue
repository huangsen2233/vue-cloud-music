<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRoute } from "vue-router";
  import { storeToRefs } from "pinia"
  import { useMusicStore } from "@/stores/music";
  import SongDetailLyric from "./components/SongDetailLyric.vue";
  import SongDetailComment from "./components/SongDetailComment.vue";

</script>

<template>
  <div class="song-detail">
    <SongDetailLyric />
    <SongDetailComment />
  </div>
</template>

<style lang="less" scoped>

</style>