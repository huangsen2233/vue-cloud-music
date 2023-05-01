<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";

  const props = defineProps<{
    artist: any
    user: any
  }>();

  // 获取歌手单曲
  const getArtistDetail = async (id: number) => {
    // const result: any = await getArtistDetailApi(id);
    // console.log(" ~ file: ranking.vue:12 ~ getToplist ~ result: 歌手详情", result)
  };
</script>

<template>
  <div class="singer-info">
    <el-image style="width: 500px; height: 300px" :src="artist.avatar" fit="cover" />
    <section class="message">
      <h1>{{ artist.name }}</h1>
      <div>
        <b style="margin-right: 5px;">别称: </b>
        <span style="padding: 0 5px;" v-for="i in artist.alias">{{ i }}</span>
      </div>
      <div>
        <b style="margin-right: 5px;">职业: </b>
        <span style="padding-right: 10px;" v-for="j in artist.identities">{{ j }}</span>
      </div>
      <div v-if="user.userId">
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