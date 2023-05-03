<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import type { MvDetailType } from "./type"
  import { useRoute } from 'vue-router';
  import { useVideoStore } from "@/stores/video";
  import { storeToRefs } from "pinia";
  import { getMvDetailApi } from "@/api/video";
  import VideoLeft from "./components/VideoLeft.vue";
  import VideoRight from "./components/VideoRight.vue";

  onMounted(() => {
    const id = Number(route.query.id);
    if(id) {
      getMvDetail(id);
    }
  });

  const route = useRoute();

  const props = defineProps<{
    
  }>();

  const useVideo = useVideoStore();
  const { videoUrl } = storeToRefs(useVideo);

  const mvDetail = ref<MvDetailType>({ 
    artistName: '', name: '', desc: '', playCount: 0, publishTime: ''
  });

  // 获取MV详情
  const getMvDetail = async (id: number) => {
    const result: any = await getMvDetailApi(id);
    // console.log("🚀 ~ file: video.vue:27 ~ getMvDetail ~ result: mv详情", result)
    const { artistName, name, desc, playCount, publishTime } = result.data;
    mvDetail.value = { artistName, name, desc, playCount, publishTime };
  };
</script>

<template>
  <div class="video">
    <el-row>
      <el-col :span="16">
        <VideoLeft :video-url="videoUrl" />
      </el-col>
      <el-col :span="8" class="video-right">
        <VideoRight :mv-detail="mvDetail" />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
  .video-right {
    border-left: 1px solid #ccc;
  }
</style>