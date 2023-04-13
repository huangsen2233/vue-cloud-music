<script lang="ts" setup>
  import { ref, reactive, inject } from 'vue';
  import BasePagination from "@/components/common/BasePagination.vue";

  const artists = inject('artists') as any;
  const total = inject('total') as number;

  const getPlaylist = () => {}
</script>

<template>
  <div class="imgs"> 
    <div class="img">
      <template v-for="i in artists">
        <el-image :src="i.img1v1Url" style="width: 60px; height: 60px;" fit="scale-down"></el-image>
      </template>
    </div>
    <!-- {{ artists }} -->
    <BasePagination 
      :total="total"
      :page-sizes="[15, 20, 30, 50]"
      @on-page="getPlaylist"
      @on-size="getPlaylist"
    />
  </div>
</template>

<style scoped>

</style>