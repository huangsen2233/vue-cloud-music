<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { toplistApi, toplistDetailApi, toplistArtistApi } from '@/api/ranking';
  import { playlistDetailApi, playlistCommentApi, playlistSubscribersApi  } from "@/api/playlist";
  import RankingList from './components/RankingList.vue';
  import SingerList from "./components/SingerList.vue";

  onMounted(() => {
    getToplistDetail();
    getToplistArtist();
  });

  const featurelist = ref<any>([]);
  const globallist = ref<any>([]);
  const rankinglist = ref<any>([
    { title: '特色榜', list: [] },
    { title: '全球榜', list: [] }
  ]);

  const singerList = ref<any>([
    { title: '华语', list: [] },
    { title: '欧美', list: [] },
    { title: '韩国', list: [] },
    { title: '日本', list: [] }
  ]);
  const activeName = ref('first')

  // 获取所有歌曲榜单摘要
  const getToplistDetail = async () => {
    const result: any = await toplistDetailApi();
    rankinglist.value[0].list.push(...result.list.filter((i: any) => i?.ToplistType));
    rankinglist.value[1].list.push(...result.list.filter((i: any) => !i?.ToplistType));
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌曲榜单", rankinglist.value)
  };

  // 获取歌手榜单
  const getToplistArtist = async () => {
    const result: any = await toplistArtistApi();
    console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手榜单", result)
  };
  
  // 获取歌单详情
  const getPlaylistDetail = async (id: number) => {                                                                                                                                                                                                             
    const result = await playlistDetailApi({ id });
    console.log("🚀 ~ file: ranking.vue:18 ~ getPlaylistDetail ~ result: 歌单详情", result)
    const res: any = await playlistCommentApi({ id, limit: 20, offset: 0 });
    console.log("🚀 ~ file: usePlaylistDetail.ts:6 ~ getPlaylistDetail ~ result: 歌单评论", res);
  };

  // 切换不同地区的歌手排行榜
  const switchSinger = (type: number) => {
    console.log('切换歌手');
    
  }; 
</script>

<template>
  <div class="ranking">
    <el-row :gutter="20">
      <el-col :span="6" style="border-right: 1px solid #e6e6e6;">
        <RankingList :rankinglist="rankinglist" @switch-ranking="getPlaylistDetail" />
      </el-col>
      <el-col :span="18">
        <SingerList v-model="activeName" @switch-singer="switchSinger" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>