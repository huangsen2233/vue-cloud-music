<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import FooterLeft from './FooterLeft.vue';
  import FooterCenter from './FooterCenter.vue';
  import FooterRight from './FooterRight.vue';
</script>

<template>
  <div class="audio">
    <FooterLeft />
    <FooterCenter />
    <FooterRight />
  </div>
</template>

<style lang="less" scoped>
  .audio {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #111;

    &-left {
      flex-basis: 500px;
    }
  }
</style>