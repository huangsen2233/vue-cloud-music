<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import { cloudSearchApi } from "@/api/search";
  import type { SearchType } from "./type";
  import Single from "./components/Single.vue";

  const route = useRoute();

  onMounted(() => {
    const keywords = route.query.keywords as string;
    cloudSearch({ ...cloudSearchParams.value, keywords });
  });

  const activeName = ref(1);
  const songs = ref<any>([]);

  const cloudSearchParams = ref<SearchType>({ keywords: '', limit: 30, offset: 0, type: 1 });

  // 搜索
  const cloudSearch = async (params: SearchType) => {
    const result: any = await cloudSearchApi(params);
    console.log("🚀 ~ file: HeaderProfile.vue:31 ~ searchSuggestApi ~ 搜索结果:", result)
  };
</script>

<template>
  <div>搜索内容: {{ route.query.keywords }}</div>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="单曲" :name="1">
      <template #label><b style="font-size: 16px;">单曲</b></template>
      <!-- 单曲 -->
      <template #default>
        <Single :songs="songs" />
      </template>
    </el-tab-pane>
    <el-tab-pane label="歌手" :name="1000">
      <template #label>
        <b style="font-size: 16px;">歌手</b>
      </template>
      <!-- 歌手 -->
      <template #default></template>
    </el-tab-pane>
    <el-tab-pane label="歌单" :name="1002">
      <template #label>
        <b style="font-size: 16px;">歌单</b>
      </template>
      <!-- 歌单 -->
      <template #default></template>
    </el-tab-pane>
    <el-tab-pane label="视频" :name="1018">
      <template #label>
        <b style="font-size: 16px;">视频</b>
      </template>
      <!-- 视频 -->
      <template #default></template>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>

</style>