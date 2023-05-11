<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import type { MvDetailType, MvsType, commentMvType } from "./type"
  import { useRoute, useRouter } from 'vue-router';
  import { useVideoStore } from "@/stores/video";
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";
  import { getMvDetailApi, getSimiMvApi, getCommentMvApi } from "@/api/video";
  import VideoLeft from "./components/VideoLeft.vue";
  import VideoRight from "./components/VideoRight.vue";

  onMounted(() => {
    window.scrollTo(0, 0);
    const id = Number(route.query.id);
    if(id) {
      getMvDetail(id);
      getSimiMv(id);
      getCommentMv({ ...commentMvParams.value });
      useVideo.getMvUrl(id);
    }
  });

  const route = useRoute();
  const router = useRouter();
  const useVideo = useVideoStore();
  const useUser = useUserStore();
  const { profile } = storeToRefs(useUser);
  const { videoUrl } = storeToRefs(useVideo);
  const commentMvParams = ref<commentMvType>({ id: Number(route.query.id), limit: 20, offset: 0 });
  const comments: any = ref([]);
  const paginationProp = ref({ total: 0, currentPage: 1, pageSize: 20 });

  const mvDetail = ref<MvDetailType>({ 
    artistName: '', name: '', desc: '', playCount: 0, publishTime: '', shareCount: 0, subCount: 0
  });
  const mvs = ref<MvsType[]>([]);

  // 获取MV详情
  const getMvDetail = async (id: number) => {
    const result: any = await getMvDetailApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: mv详情", result)
    const { artistName, name, desc, playCount, publishTime, shareCount, subCount } = result.data;
    mvDetail.value = { artistName, name, desc, playCount, publishTime, shareCount, subCount };
  };

  // 获取相似MV
  const getSimiMv = async (id: number) => {
    const result: any = await getSimiMvApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: 相似mv", result)
    mvs.value.length = 0;
    result.mvs.forEach((item: any) => {
      const { id, artistName, artistId, name, cover, playCount, duration } = item;
      mvs.value.push({ id, artistName, artistId, name, cover, playCount, duration });
    });
  };

  // 获取MV评论
  const getCommentMv = async (params: commentMvType) => {
    const result: any = await getCommentMvApi(params);
    // console.log("🚀 ~ file: video.vue:53 ~ getCommentMv ~ 获取MV评论:", result)
    comments.value = [...result.comments];
    paginationProp.value.total = result.total;
  };
  
  // 切换mv
  const switchMv = (id: number) => {
    // console.log('视频id', id);
    // useVideo.getMvUrl(id);
    router.push({ path: '/video', query: { id } });
  };

  // 路由跳转到歌手详情
  const routerToSingerDetail = (id: number) => {
    router.push({ path: '/singer-detail', query: { id } })
  };

  // MV评论的分页改变
  const changePagination = ({ currentPage, pageSize }: any) => {
    paginationProp.value = { ...paginationProp.value, currentPage, pageSize };
    getCommentMv({ ...commentMvParams.value, limit: pageSize, offset: (currentPage - 1) * pageSize });
  };
</script>

<template>
  <div class="video">
    <VideoLeft 
      :video-url="videoUrl" 
      :mv-detail="mvDetail" 
      :comments="comments" 
      :pagination-prop="paginationProp" 
      :profile="profile"
      @change-pagination="changePagination" 
    />
    <VideoRight :mv-detail="mvDetail" :mvs="mvs" @switch-mv="switchMv" @router-singer-detail="routerToSingerDetail" />
  </div>
</template>

<style lang="less" scoped>
  .video {
    display: flex;

    &-left {
      flex: 1;
      padding: 0 30px;
    }
    
    &-right {
      // flex: 1;
      width: 550px;
      padding: 0 30px;
      border-left: 1px solid #ccc;
    }
  }
</style>