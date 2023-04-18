<script lang="ts" setup>
  import { inject } from "vue";
  import SingerListTag from './SingerListTag.vue';
  import SingerListImg from './SingerListImg.vue';

  const showTag = inject('showTag') as boolean;
</script>

<template>
  <div class="singer-list">
    <SingerListTag v-if="showTag" />
    <SingerListImg />
  </div>
</template>

<style scoped>
  .singer-list {
    flex: 1;
    padding: 0 30px;
  }
</style>