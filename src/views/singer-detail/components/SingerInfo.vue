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
      <b style="font-size: 30px;">
        {{ artist.name }} 
        <span style="padding: 0 5px; font-size: 16px; color: ;" v-for="i in artist.alias">{{ i }}</span>
      </b>
      <div>
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
      font-size: 20px;
    }

    .el-button .el-icon {
      font-size: 16px;
    }
  }
</style>