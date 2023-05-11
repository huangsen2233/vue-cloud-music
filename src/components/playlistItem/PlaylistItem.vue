<script lang="ts" setup>
  import { ref, reactive, computed, inject } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";
  import { count } from '@/utils/count';

  const routeToPlaylistDetail = inject('router-playlist-detail') as (id: number) => void;

  const { url, name, playCount, creatorName, creatorUrl, createTime, signature, tags } = defineProps<{
    id: number
    url: string
    name: string
    playCount: number
    creatorName?: string
    creatorUrl?: string
    createTime?: number
    userId?: number
    signature?: string
    tags?: string[]
  }>();
</script>

<template>
  <div class="playlist-item">
    <div class="img">
      <el-image style="width: 100%; height: 200px;" :src="url" :title="name" fit="cover" @click="routeToPlaylistDetail(id)" />
      <div class="count">
        <el-icon><Headset /></el-icon>
        <span>{{ count(playCount, 'W') }}</span>
        <el-icon color="#ddd" @click="routeToPlaylistDetail(id)"><VideoPlay /></el-icon>
      </div>
    </div>
    <a class="content" @click="routeToPlaylistDetail(id)"><span>{{ name }}</span></a>
    <div class="creator" v-if="creatorName">
      by
      <!-- 弹出框-歌单信息 -->
      <el-popover placement="bottom" width="auto" trigger="click" popper-class="elpopover">
        <template #reference>
          <a style="color:#000;">{{ creatorName }}</a>
        </template>
        <el-descriptions title="歌单信息" border :column="1">
          <el-descriptions-item label="创建人" label-align="right">
            {{ creatorName }}
            <el-avatar :src="creatorUrl" shape="circle" style="width: 30px; height: 30px; vertical-align: middle; margin-left: 5px;"></el-avatar>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间" label-align="right">{{ formatTimestamp(createTime as number) }}</el-descriptions-item>
          <el-descriptions-item label="播放次数" label-align="right">{{ playCount }} 次</el-descriptions-item>
          <el-descriptions-item label="歌单签名" label-align="right">{{ signature || '暂无签名...' }} </el-descriptions-item>
          <el-descriptions-item label="歌单标签" label-align="right">
            <el-tag style="margin: 0 5px;" v-for="tag in tags">{{ tag }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-popover>
    </div>
  </div>
</template>

<style lang="less">
  .img {
    position: relative;

    .el-image {
      border-radius: 10px;
    }

    .el-image:hover {
      cursor: pointer;
    }

    .count {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      padding: 0 20px;
      border-radius: 0 0 10px 10px;
      color: #eee;
      font-size: 22px;
      background: rgba(54,48,51,0.4);
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > span {
        flex: 1;
        padding-left: 10px;
        font-size: 14px;
      }

      & > .el-icon:nth-of-type(2) {
        transition: all 0.3s;
      }

      & > .el-icon:nth-of-type(2):hover {
        cursor: pointer;
        color: #fff;
        transform: scale(1.2);
      }
    }
  }

  .content {
    display: block;
    font-weight: 600;
    padding-top: 10px;

    & > span {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      line-clamp: 1;
      -webkit-line-clamp: 1;
    }
  }

  .content:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .creator {
    padding-top: 10px;
    color: rgba(0,0,0,0.6);
    font-size: 14px;
  }
  .creator:hover a{
    cursor: pointer;
    text-decoration: underline;
  }
</style>