<script lang="ts" setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { artistApi } from "@/api/singer";
  import SingerLeft from "./components/SingerLeft.vue";
  import SingerRight from "./components/SingerRight.vue";
  import type { artistsType, titleType, initialType } from "./type";

  onMounted(() => {
    getArtist({ ...artistParams.value })
    window.addEventListener("scroll", handleScroll)
  });

  const router = useRouter();
  const artistParams = ref({ limit: 100, offset: 0, initial: '-1', type: -1, area: -1 });
  const tagTitle = ref('全部');
  const showTag = ref(true);
  const artists = ref<any[]>([]);
  const time = ref<number>(1); // 滚动次数
  const loading = ref<boolean>(false);
  let timer: NodeJS.Timer; // 控制防抖的定时器

  // 页面滚动事件
  const handleScroll = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动到歌手页面底部
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        loading.value = true
        const params = { ...artistParams.value, limit: 30, offset: artistParams.value.limit + 30 * time.value }
        getArtist(params).then(() => {
          time.value++
          loading.value = false
        })
      }
    }, 1000)
  };

  // 获取歌手列表
  const getArtist = async (params: artistsType) => {
    const result: any = await artistApi(params)
    // console.log("🚀 ~ file: singer.vue:12 ~ getArtist ~ result 歌手列表:", result.artists)
    if (loading.value) {
      artists.value.push(...result.artists)
    } else {
      artists.value = result.artists
    }
  };

  // 歌手的地区、分类改变
  const switchType = ({ title, area, type }: titleType) => {
    tagTitle.value = title
    artistParams.value = { ...artistParams.value, limit: 100, offset: 0, initial: '0', area, type } // 重置请求歌手列表的参数
    showTag.value = false
    nextTick(() => {
      showTag.value = true
      getArtist(artistParams.value)
    })
  };

  // 歌手的首字母改变
  const switchInitial = (params: initialType) => {
    artistParams.value = { ...artistParams.value, limit: 50, offset: 0, ...params }; // 重置请求歌手列表的参数
    nextTick(() => {
      getArtist(artistParams.value);
    });
  };

  // 跳转到歌手详情页
  const routerToSingerDetail = (id: number, fansCount?: number) => {
    router.push({ path: '/singer-detail', query: { id, fansCount } });
  };
</script>

<template>
  <div class="singer">
    <!-- 歌手类型 -->
    <SingerLeft @switch-type="switchType" />
    <!-- 歌手列表 -->
    <SingerRight 
      :show-tag="showTag"
      :tag-title="tagTitle" 
      :artists="artists"
      :loading="loading" 
      @switch-initial="switchInitial"
      @router-singerdetail="routerToSingerDetail"
    />
  </div>
</template>

<style scoped>
  .singer {
    display: flex;
  }
</style>