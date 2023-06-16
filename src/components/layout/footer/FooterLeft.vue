<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useRouter } from "vue-router";
  import { useMusicStore } from "@/stores/music";
  import yinyueIcon from "@/assets/imgs/音乐封面.png";

  const router = useRouter()
  const { likeMusic } = useMusicStore();
  const { currentSongInfo, isLike, total } = storeToRefs(useMusicStore());

  // 路由跳转到歌曲详情页
  const routerToSongDetail = (id: number) => {
    router.push({ path: '/song-detail', query: { id } })
  }
</script>

<template>
  <div class="audio-left">
    <el-image :src="currentSongInfo.picUrl || yinyueIcon" fit="cover" />
    <section class="audio-left_author">
      <b>{{ currentSongInfo.songName || '暂无歌曲' }}</b>
      <a>{{ currentSongInfo.artists?.[0]?.name }}</a>
      <section class="audio-left_author_icon">
        <div :class="['iconfont', isLike ? 'icon-woxihuan-hongsetaoxin likeColor' : 'icon-woxihuan-morentaoxin']" :title="isLike ? '取消喜欢' : '喜欢'" @click="likeMusic"></div>
        <div class="iconfont icon-xiazai" title="下载该歌曲"></div>
        <div class="iconfont icon-gengduo" title="更多"></div>
        <el-badge :value="total" :max="999999" :hidden="total === 0 ? true : false" type="primary">
          <div class="iconfont icon-pinglun" title="查看评论" @click="routerToSongDetail(currentSongInfo.songId)"></div>
        </el-badge>
      </section>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .audio-left {
    display: flex;
    align-items: center;

    .el-image {
      width: 70px;
      height: 70px;
      border-radius: 8px;
    }

    &_author {
      padding-left: 10px;

      & > b {
        font-size: 16px;
      }
      & > a {
        font-size: 14px;
        padding-left: 10px;
      }

      &_icon {
        display: flex;
        padding-top: 15px;

        .iconfont {
          font-size: 22px;
          height: 30px;
          width: 30px;
          line-height: 30px;
          transition: all 0.2s;
          // padding-right: 10px;
        }
        .iconfont:hover {
          transform: scale(1.1);
          cursor: pointer;
        }

        .icon-woxihuan-hongsetaoxin, .icon-woxihuan-morentaoxin {
          font-size: 16px;
        }
      }
    }
  }

  .likeColor {
    color: rgba(255,106,106);
  }
</style>