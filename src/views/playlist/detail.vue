<template>
  <div>
    盲盒的内容
  </div>

  <!-- <router-view v-if="$route.path === '/xxx/detail'"></router-view> -->
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('detail---------');
});
</script>