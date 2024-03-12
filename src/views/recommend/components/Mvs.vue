<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import type { MvsType } from "../type";
  import { useRouter } from 'vue-router';
  import { getNewMvApi } from "@/api/recommend";
  import { count } from "@/utils/count";

  onMounted(() => {
    getNewMv();
  });

  const router = useRouter();
  const mvs = ref<MvsType[]>([]);

  // 获取最新MV
  const getNewMv = async () => {
    const { data }: any = await getNewMvApi({});
    // console.log("🚀 ~ file: recommend.vue:54 ~ getNewMv ~ 最新mv:", data)
    mvs.value.length = 0;
    for (let i of data) {
      const { id, artists, name, cover, playCount } = i;
      mvs.value.push({ id, artists, name, cover, playCount });
    }
  }

  // 路由跳转到MV视频
  const routerToVideo = (id: number) => {
    router.push({ path: '/video', query: { id } })
  };

  // 路由跳转到歌手详情
  const routerToSingerDetail = (id: number) => {
    router.push({ path: '/singer-detail', query: { id } })
  };
</script>

<template>
  <div class="mvs">
    <section class="mvs-title">
      <h2>最新MV</h2>
    </section>
    <section class="mvs-content">
      <div class="mv">
        <section class="mv-item" v-for="i in mvs">
          <el-image style="width: 300px; height: 180px; border-radius: 20px;" :src="i.cover" fit="cover" @click="routerToVideo(i.id)" />
          <div class="playcount">
            <div>
              <el-icon><VideoCamera /></el-icon>
              <span style="padding-left: 5px;">{{ count(i.playCount) }}</span>
            </div>
          </div>
          <div class="playicon" @click="routerToVideo(i.id)">
            <el-icon><VideoPlay /></el-icon>
          </div>
          <div>{{ i.name }}</div>
          <div class="author">
            by <a @click="routerToSingerDetail(i.artists[0].id)">{{ i.artists[0].name }}</a>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .mvs {
    width: 100%;

    &-title {
      border-bottom: 5px solid var(--el-color-primary);
      margin: 20px 0;
    }

    &-content {
      display: flex; 
      flex-wrap: wrap;

      .mv {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 20px;

        &-item {
          position: relative;
          width: 300px;

          .el-image {
            position: relative;
          }

          .el-image:hover ~ .playicon {
            opacity: 1;
            z-index: 1;
          }

          .playicon {
            box-sizing: border-box;
            position: absolute;
            z-index: -1;
            top: 0;
            height: 180px;
            width: 300px;
            border-radius: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
              opacity: 1;
              z-index: 1;
            }

            .el-icon {
              font-size: 80px;
              color: #fff;
            }
          }

          .playcount {
            box-sizing: border-box;
            position: absolute;
            top: 150px;
            right: 0px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            border-radius: 0 0 20px 20px;
            padding: 0 20px;
            background: rgba(54,48,51,0.4);
            color: #fff;

            & > div {
              display: flex;
              justify-content: flex-end;
              align-items: center;
            }
          }

          .author {
            color: var(--theme-card-font-color-2);
            font-size: 14px;
            padding-top: 5px;

            & > a {
              color: var(--theme-card-font-color-1);
            }
          }
          .author:hover a {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>