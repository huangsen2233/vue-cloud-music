<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import HeaderLogo from './HeaderLogo.vue';
  import HeaderMenu from './HeaderMenu.vue';
  import HeaderProfile from './HeaderProfile.vue';

</script>

<template>
  <header class="header">
    <HeaderLogo />
    <HeaderMenu />
    <HeaderProfile />
  </header>
</template>

<style scoped>
  .header {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
  }
</style>