<script lang="ts" setup>
  import { ref, reactive, onActivated, onMounted } from 'vue';
  import type { MvDetailType, MvsType, commentMvType } from "./type"
  import { useRoute, useRouter } from 'vue-router';
  import { useVideoStore } from "@/stores/video";
  import { storeToRefs } from "pinia";
  import { getMvDetailApi, getSimiMvApi, getCommentMvApi } from "@/api/video";
  import VideoLeft from "./components/VideoLeft.vue";
  import VideoRight from "./components/VideoRight.vue";

  onMounted(() => {
    const id = Number(route.query.id);
    if(id) {
      getMvDetail(id);
      getSimiMv(id);
      getCommentMv({ ...commentMvParams.value, id });
    }
  });

  const route = useRoute();
  const router = useRouter();
  const useVideo = useVideoStore();
  const { videoUrl } = storeToRefs(useVideo);
  const commentMvParams = ref<commentMvType>({ id: 0, limit: 20, offset: 0 });
  const comments: any = ref([]);
  const paginationProp = ref({ total: 0, currentPage: 1, pageSize: 20 });

  const mvDetail = ref<MvDetailType>({ 
    artistName: '', name: '', desc: '', playCount: 0, publishTime: ''
  });
  const mvs = ref<MvsType[]>([]);

  // 获取MV详情
  const getMvDetail = async (id: number) => {
    const result: any = await getMvDetailApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: mv详情", result)
    const { artistName, name, desc, playCount, publishTime } = result.data;
    mvDetail.value = { artistName, name, desc, playCount, publishTime };
  };

  // 获取相似MV
  const getSimiMv = async (id: number) => {
    const result: any = await getSimiMvApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: 相似mv", result)
    mvs.value.length = 0;
    result.mvs.forEach((item: any) => {
      const { id, artistName, name, cover, playCount, duration } = item;
      mvs.value.push({ id, artistName, name, cover, playCount, duration });
    });
  };

  // 获取MV评论
  const getCommentMv = async (params: commentMvType) => {
    const result: any = await getCommentMvApi(params);
    console.log("🚀 ~ file: video.vue:53 ~ getCommentMv ~ 获取MV评论:", result)
    comments.value = [...result.comments];
    paginationProp.value.total = result.total;
  };

  // 切换mv
  const switchMv = (id: number) => {
    // console.log('视频id', id);
    useVideo.getMvUrl(id);
    router.push({ path: '/video', query: { id } });
  };

  // MV评论的分页改变
  const changePagination = ({ currentPage, pageSize }) => {
    paginationProp.value = { ...paginationProp.value, currentPage, pageSize };
  };
</script>

<template>
  <div class="video">
    <VideoLeft 
      :video-url="videoUrl" 
      :mv-detail="mvDetail" 
      :comments="comments" 
      :pagination-prop="paginationProp" 
      @change-pagination="changePagination" 
    />
    <VideoRight :mv-detail="mvDetail" :mvs="mvs" @switch-mv="switchMv" />
  </div>
</template>

<style lang="less" scoped>
  .video {
    display: flex;

    &-right {
      flex: 1;
      margin-left: 50px;
      border-left: 1px solid #ccc;
    }
  }
</style>