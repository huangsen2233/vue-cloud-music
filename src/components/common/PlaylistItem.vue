<script lang="ts" setup>
  import { ref, reactive, computed, inject } from 'vue';

  const { url, name, playCount, creatorName } = defineProps<{
    url: string
    name: string
    playCount: number
    creatorName?: string
  }>();

  // 歌单播放次数
  const count = computed(() => {
    return function(value: number) {
      return value.toString().slice(0,4);
    }
  });

  const handleRouter = inject('on-router');
</script>

<template>
  <div class="playlist-item">
    <div class="img">
      <el-image style="width: 100%; height: 100%;" :src="url" :title="name" fit="contain" @click="handleRouter" />
      <div class="count">
        <el-icon><Headset /></el-icon>
        <span>{{ count(playCount) }}W</span>
        <el-icon color="#ddd" @click="handleRouter"><VideoPlay /></el-icon>
      </div>
    </div>
    <a class="content"><span>{{ name }}</span></a>
    <span>by <a>{{ creatorName }}</a></span>
  </div>
</template>

<style lang="less" scoped>
  .img {
    position: relative;

    .el-image {
      border-radius: 5%;
    }

    .count {
      position: absolute;
      bottom: 4px;
      box-sizing: border-box;
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
        padding: 0 20px;
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
</style>