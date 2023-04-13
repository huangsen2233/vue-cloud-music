<script lang="ts" setup>
  import SingerListTag from './SingerListTag.vue';
  import SingerListImg from './SingerListImg.vue';

</script>

<template>
  <div class="singer-list">
    <SingerListTag />
    <SingerListImg />
  </div>
</template>

<style scoped>
  .singer-list {
    flex: 1;
    padding: 0 30px;
  }
</style>