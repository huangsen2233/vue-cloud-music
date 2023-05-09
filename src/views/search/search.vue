<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import { searchSuggestApi } from "@/api/search";

  const route = useRoute();

  onMounted(() => {
    const keywords = route.query.keywords as string;
    searchSuggest(keywords);
  })

  // 搜索关键字
  const searchSuggest = async (keywords: string) => {
    const result = await searchSuggestApi(keywords);
    console.log("🚀 ~ file: HeaderProfile.vue:31 ~ searchSuggestApi ~ 搜索结果:", result)
  };
</script>

<template>
  <div>搜索</div>
</template>

<style scoped>

</style>