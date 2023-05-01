<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";

  const { playlistDetail } = defineProps<{
    playlistDetail: any
  }>();

  // 歌单播放次数
  const count = computed(() => {
    return function(value: number) {
      if (value) {
        const str = value.toString();
        return str.slice(0, str.length - 4);
      }
    }
  });
</script>

<template>
  <div class="title">
    <section class="title-img">
      <el-image style="width: 200px; height: 200px" :src="playlistDetail.coverImgUrl" fit="contain" />
    </section>
    <section class="title-content">
      <h3 style="margin: 0; padding-bottom: 10px;">
        <el-tag type="danger" size="large" style="font-size: 18px; padding: 20px; margin-right: 10px;">歌单</el-tag>
        {{ playlistDetail.name }}
      </h3>
      <div class="creator">
        <el-avatar size="small" style="width: 32px; height: 32px; border: 1px solid #ccc" :src="playlistDetail?.creator?.avatarUrl" />
        <span>{{ playlistDetail?.creator?.nickname }}</span>
        <span>
          {{ formatTimestamp(playlistDetail.createTime, 'YYYY-MM-DD HH:mm:ss') }} 
          <b>创建</b>
        </span>
      </div>
      <div>
        <b>歌曲:</b> 
        {{ playlistDetail.trackIds?.length }} 首
      </div>
      <div>
        <b>播放:</b> 
        {{ count(playlistDetail.playCount) }} 万
      </div>
      <div>
        <b>标签:</b>
        <template v-for="i in playlistDetail.tags">
          <el-tag style="margin-right: 20px;">{{ i }}</el-tag>
        </template>
      </div>
      <div style="width: 80%;">
        <b>介绍:</b>
        {{ playlistDetail.description }} 
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .title {
    display: flex;
    padding-bottom: 30px;

    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 30px;

      .creator {
        display: flex;
        align-items: center;

        span:nth-of-type(2) {
          padding: 0 30px 0 20px;
        }
      }

      & > div {
        padding-bottom: 10px;

        b {
          padding-right: 10px;
        }
      }
    }
  }
</style>