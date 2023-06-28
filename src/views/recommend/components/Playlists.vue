<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from 'vue-router';
  import type { PlayListType } from "../type";
  import { personalizedApi } from "@/api/recommend";
  import PlaylistItem from "@/components/playlistItem/PlaylistItem.vue";

  onMounted(() => {
    getPersonalizedPlaylist()
  });

  const router = useRouter();
  const playList = ref<PlayListType[]>([]);

  // 获取推荐歌单
  const getPersonalizedPlaylist = async () => {
    const { result } = await personalizedApi();
    playList.value.length = 0;
    for (let i of result) {
      const { id, picUrl, name, playCount } = i;
      playList.value.push({ id, picUrl, name, playCount });
    }
    // console.log("🚀 ~ file: recommend.vue:23 ~ getresourceData ~ res: 歌单", result)
  };

  // 路由跳转到歌单
  const routerToPlaylist = () => {
    router.push('/playlist');
  };
</script>

<template>
  <div class="playlist">
    <section class="playlist-title">
      <h2>推荐歌单</h2>
      <a @click.prvent="routerToPlaylist">更多<el-icon><DArrowRight /></el-icon></a>
    </section>
    <section class="playlist-content">
      <div class="item" v-for="item in playList">
        <PlaylistItem :id="item.id" :url="item.picUrl" :name="item.name" :play-count="item.playCount" />
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .playlist {
    width: 100%;

    &-title {
      border-bottom: 5px solid var(--el-color-primary);
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > h2 {
        cursor: pointer;
      }

      & > a {
        display: flex;
        align-items: center;
        padding: 10px 0;
        font: 18px bolder;
        cursor: pointer;

        .el-icon {
          vertical-align: middle;
          font-size: 20px;
        }
      }

      & > a:hover {
        text-decoration: underline;
      }
    }

    &-content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .item {
        flex-basis: 200px;
      }

      .item:not(:nth-child(6n)) {
        margin: 0 auto 30px 0;
      }
    }
  }
</style>