<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";

  const props = defineProps<{
    artist: any
    user: any
    identify: any
    fansCount: number
  }>();

  // 获取歌手单曲
  const getArtistDetail = async (id: number) => {
    // const result: any = await getArtistDetailApi(id);
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手详情", result)
  };
</script>

<template>
  <div class="singer-info">
    <el-image style="width: 400px; height: 250px" :src="artist.avatar" fit="cover" />
    <section class="message">
      <h3 style="margin: 0;">
        <el-tag type="danger" size="large" style="font-size: 20px; padding: 20px; margin-right: 10px;">歌手</el-tag>
      </h3>
      <div>
        <b>{{ artist.name }}</b> 
        <span style="padding-left: 14px; font-size: 14px;" v-for="i in artist.alias">{{ i }}</span>
      </div>
      <div v-if="fansCount">
        <b>粉丝数: </b>
        <span>{{ fansCount }}</span>
      </div>
      <div v-if="identify">
        <b style="margin-right: 5px;">简介: </b>
        <span>{{ identify?.imageDesc }}</span>
      </div>
      <div v-if="user.signature">
        <b style="margin-right: 5px;">签名: </b>
        {{ user.signature }}
      </div>
      <el-button type="primary" size="large" icon="Plus">关注</el-button>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .singer-info {
    display: flex;

    .message {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      align-items: flex-start;
      padding-left: 30px;
      // font-size: 20px;
    }

    .el-button .el-icon {
      font-size: 16px;
    }
  }
</style>