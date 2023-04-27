<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { toplistApi, toplistDetailApi } from '@/api/ranking';
  import { playlistDetailApi } from "@/api/playlist";
  import RankingList from './components/RankingList.vue';

  onMounted(() => {
    getToplistDetail();
    // getPlaylistDetail(19723756); // 19723756 飙升榜
  });

  const featurelist = ref<any>([]);
  const globallist = ref<any>([]);
  const rankinglist = ref<any>([
    { title: '特色榜', list: [] },
    { title: '全球榜', list: [] }
  ])

  // 获取所有榜单摘要
  const getToplistDetail = async () => {
    const result: any = await toplistDetailApi();
    rankinglist.value[0].list.push(...result.list.filter((i: any) => i?.ToplistType));
    rankinglist.value[1].list.push(...result.list.filter((i: any) => !i?.ToplistType));
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 所有榜单详情", rankinglist.value)
  };
  
  // 获取歌单详情
  const getPlaylistDetail = async (id: number) => {                                                                                                                                                                                                             
    const result = await playlistDetailApi({ id });
    console.log("🚀 ~ file: ranking.vue:18 ~ getPlaylistDetail ~ result: 歌单详情", result)
  };
</script>

<template>
  <div class="ranking">
    <el-row :gutter="20">
      <el-col :span="6" style="border-right: 1px solid #e6e6e6;">
        <RankingList :rankinglist="rankinglist" />
      </el-col>
      <el-col :span="18">
        <div>榜单列表</div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>