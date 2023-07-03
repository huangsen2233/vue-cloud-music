<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useVideoStore } from "@/stores/video";
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";
  import { 
    getMvDetailApi, getSimiMvApi, getCommentMvApi, getMvDetailInfoApi,
    getVideoDetailApi, getRelatedVideoApi, getCommentVideoApi, getVideoDetailInfoApi
  } from "@/api/video";
  import VideoLeft from "./components/VideoLeft.vue";
  import VideoRight from "./components/VideoRight.vue";
  import type { MvDetailType, MvsType, CommentMvType, CommentVideoType, PaginationParamsType } from "./type";

  onMounted(() => {
    const reg = /\D/;
    if (reg.test(route.query.id as string)) { // 视频
      const id = String(route.query.id)
      videoId.value = id
      getVideoDetail(id)
      getRelatedVideo(id)
      getVideoDetailInfo(id)
      getCommentVideo({ ...commentVideoParams.value })
      useVideo.getVideoUrl(id)
    } else {  // MV
      const id = Number(route.query.id)
      videoId.value = id
      getMvDetail(id)
      getSimiMv(id)
      getMvDetailInfo(id)
      getCommentMv({ ...commentMvParams.value })
      useVideo.getMvUrl(id)
    }
  });

  const route = useRoute();
  const router = useRouter();
  const useVideo = useVideoStore();
  const useUser = useUserStore();
  const { profile } = storeToRefs(useUser);
  const { videoUrl, isMv } = storeToRefs(useVideo);
  const videoId = ref<number | string>(0);
  const commentMvParams = ref<CommentMvType>({ id: Number(route.query.id), limit: 20, offset: 0 });
  const commentVideoParams = ref<CommentVideoType>({ id: String(route.query.id), limit: 20, offset: 0 });
  const commentPagination = ref({ total: 0, currentPage: 1, pageSize: 20 });
  const mvDetail = ref<MvDetailType>({ 
    artistName: '', name: '', desc: '', playCount: 0, publishTime: '', shareCount: 0, subCount: 0, likedCount: 0
  });
  const mvs = ref<MvsType[]>([]);
  const hotComments = ref<any[]>([]);
  const newComments = ref<any[]>([]);
  const currentCommentType = ref('new');
  const currentComment = ref<any[]>([]);

  // 获取MV详情
  const getMvDetail = async (id: number) => {
    const result: any = await getMvDetailApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: mv详情", result)
    const { artistName, name, desc, playCount, publishTime, subCount } = result.data;
    mvDetail.value = { ...mvDetail.value, artistName, name, desc, playCount, publishTime, subCount };
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
  const getCommentMv = async (params: CommentMvType) => {
    const result: any = await getCommentMvApi(params);
    // console.log("🚀 ~ file: video.vue:53 ~ getCommentMv ~ 获取MV评论:", result)
    newComments.value = result.comments
    hotComments.value = result?.hotComments ?? hotComments.value
    commentPagination.value.total = result.total;
    changeCommentType(currentCommentType.value)
  };

  // 获取mv的点赞评论分享数
  const getMvDetailInfo = async (id: number) => {
    const result: any = await getMvDetailInfoApi(id);
    // console.log("🚀 ~ file: video.vue:81 ~ getMvDetailInfo ~ mv点赞评论转发:", result)
    const { likedCount, shareCount } = result;
    mvDetail.value = { ...mvDetail.value, likedCount, shareCount };
  };
  
  // 切换mv
  const switchMv = (id: number) => {
    // console.log('视频id', id);
    router.push({ path: '/video', query: { id } });
  };

  // 获取视频详情 
  const getVideoDetail = async (id: string) => {
    const result: any = await getVideoDetailApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: 视频的详情", result)
    const { creator: { nickname }, title, description, playTime, publishTime, subscribeCount } = result.data;
    mvDetail.value = { 
      ...mvDetail.value, artistName: nickname, name: title, desc: description, playCount: playTime, publishTime, subCount: subscribeCount
    };
  };
  
  // 获取视频评论
  const getCommentVideo = async (params: CommentVideoType) => {
    const result: any = await getCommentVideoApi(params);
    // console.log("🚀 ~ file: video.vue:53 ~ getCommentMv ~ 获取视频的评论:", result)
    newComments.value = result.comments
    hotComments.value = result?.hotComments ?? hotComments.value
    commentPagination.value.total = result.total
    changeCommentType(currentCommentType.value)
  };

  // 获取相关视频
  const getRelatedVideo = async (id: string) => {
    const result: any = await getRelatedVideoApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: 获取相关视频", result)
    mvs.value.length = 0;
    result.data.forEach((item: any) => {
      const { vid, creator, title, coverUrl, playTime, durationms } = item;
      mvs.value.push({ 
        id: vid, name: title, cover: coverUrl, playCount: playTime, duration: durationms, 
        userName: creator[0].userName, userId: creator[0].userId
      });
    });
  };

  // 获取视频的点赞评论分享数
  const getVideoDetailInfo = async (vid: string) => {
    const result: any = await getVideoDetailInfoApi(vid);
    // console.log("🚀 ~ file: video.vue:81 ~ getMvDetailInfo ~ 获取视频的点赞评论分享数:", result)
    const { likedCount, shareCount } = result;
    mvDetail.value = { ...mvDetail.value, likedCount, shareCount };
  };

  // 路由跳转到歌手详情
  const routerToSingerDetail = (id: number) => {
    router.push({ path: '/singer-detail', query: { id } })
  };

  // 评论的分页改变
  const changeCommentPagination = ({ currentPage, pageSize }: PaginationParamsType) => {
    if (isMv.value) {
      commentPagination.value = { ...commentPagination.value, currentPage, pageSize };
      getCommentMv({ ...commentMvParams.value, limit: pageSize, offset: (currentPage - 1) * pageSize });
    } else {
      commentPagination.value = { ...commentPagination.value, currentPage, pageSize };
      getCommentVideo({ ...commentVideoParams.value, limit: pageSize, offset: (currentPage - 1) * pageSize });
    }
  };

  // 评论的类型改变
  const changeCommentType = (type: string) => {
    if (type === 'hot') {
      currentComment.value = [...hotComments.value];
      currentCommentType.value = type;
    } else {
      currentComment.value = [...newComments.value];
      currentCommentType.value = type;
    }
  };
</script>

<template>
  <div class="video">
    <VideoLeft
      :video-id="videoId"
      :video-url="videoUrl"
      :is-mv="isMv"
      :mv-detail="mvDetail" 
      :profile="profile"
      :current-comment="currentComment"
      :current-comment-type="currentCommentType"
      :comment-pagination="commentPagination"
      @change-comment-type="changeCommentType" 
      @change-comment-pagination="changeCommentPagination"
    />
    <VideoRight 
      :mv-detail="mvDetail" 
      :mvs="mvs"
      :is-mv="isMv"
      @switch-mv="switchMv" 
      @router-singer-detail="routerToSingerDetail" />
  </div>
</template>

<style lang="less" scoped>
  .video {
    display: flex;

    &-left {
      width: 1000px;
      padding-right: 20px;
    }
    
    &-right {
      flex: 1;
      padding-left: 20px;
      border-left: 1px solid #ccc;
    }
  }
</style>