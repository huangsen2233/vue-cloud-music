<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from "vue-router";
  import { toplistDetailApi, toplistArtistApi } from '@/api/ranking';
  import PlaylistRanking from './components/PlaylistRanking.vue';
  import SingerRanking from "./components/SingerRanking.vue";

  onMounted(() => {
    getToplistDetail();
    getToplistArtist(1);
  });

  const router = useRouter();
  const rankinglist = ref<any>([
    { title: '特色榜', list: [] },
    { title: '全球榜', list: [] }
  ]);
  const singerList = ref<any>([
    { label: '华语', name: 1, list: [] },
    { label: '欧美', name: 2, list: [] },
    { label: '韩国', name: 3, list: [] },
    { label: '日本', name: 4, list: [] }
  ]);
  const activeName = ref(1);

  // 获取所有歌曲榜单摘要
  const getToplistDetail = async () => {
    const result: any = await toplistDetailApi()
    rankinglist.value[0].list.push(...result.list.filter((i: any) => i?.ToplistType))
    rankinglist.value[1].list.push(...result.list.filter((i: any) => !i?.ToplistType))
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌曲榜单", rankinglist.value)
  };

  // 获取歌手榜单
  const getToplistArtist = async (type: number) => {
    const result: any = await toplistArtistApi(type)
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手榜单", result)
    const index = type - 1
    singerList.value[index].list.length = 0
    singerList.value[index].list.push(...result.list.artists)
  };

  // 跳转到歌单详情页
  const switchRanking = (id: number) => {
    router.push({ path: '/playlist-detail', query: { id } })
  };

  // 切换不同地区的歌手排行榜
  const switchSinger = (type: number) => {
    activeName.value = type
    getToplistArtist(type)
  }; 

  // 跳转到歌手详情页
  const routerToSingerDetail = (id: number, fansCount?: number) => {
    router.push({ path: '/singer-detail', query: { id, fansCount } })
  };
</script>

<template>
  <div class="ranking">
    <el-row :gutter="20">
      <el-col :span="6" style="border-right: 1px solid #e6e6e6;">
        <!-- 歌单排行榜 -->
        <PlaylistRanking :rankinglist="rankinglist" @switch-ranking="switchRanking" />
      </el-col>
      <el-col :span="18">
        <!-- 歌手排行榜 -->
        <SingerRanking :active-name="activeName" :singer-list="singerList" @switch-singer="switchSinger" @router-singer-detail="routerToSingerDetail" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>