<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from 'vue-router';
  import type { NewSonglistType } from "../type";
  import { useMusicStore } from "@/stores/music";
  import { formatTimestamp } from "@/utils/dateFormat";
  import { getTopSongApi } from "@/api/recommend";

  onMounted(() => {
    getTopSong()
  });

  const router = useRouter();
  const { getSongUrl } = useMusicStore();
  const newSonglist = ref<NewSonglistType[]>([]);
  const activeType = ref<number>(0);
  const typelist = [
    { area: '全部', type: 0 },
    { area: '华语', type: 7 },
    { area: '欧美', type: 96 },
    { area: '日本', type: 8 },
    { area: '韩国', type: 16 },
  ];

  // 获取新歌速递
  const getTopSong = async () => {
    const { data }: any = await getTopSongApi(activeType.value)
    newSonglist.value.length = 0
    data.slice(0, 18).forEach((i: any) => {
      newSonglist.value.push({ id: i.id, picUrl: i.album.picUrl, name: i.name, song: i })
    })
    // console.log('获取新歌速递', data)
  };

  // 切换新歌类型
  const switchNewSong = (type: number) => {
    activeType.value = type
    getTopSong()
  };

  // 播放新音乐
  const playMusic = (params: NewSonglistType) => {
    const { id, name, picUrl, song: { artists, duration } } = params;
    const songInfo = { picUrl, duration, songId: id, songName: name, artists };
    getSongUrl(songInfo);
  };

  // 路由跳转到歌手详情
  const routerToSingerDetail = (id: number) => {
    router.push({ path: '/singer-detail', query: { id } })
  };
</script>

<template>
  <div class="newsong">
    <section class="newsong-title">
      <h2>新音乐</h2>
      <div class="newsong-title_type">
        <template v-for="i in typelist">
          <a :class="['area', activeType === i.type ? 'active' : '']" @click="switchNewSong(i.type)">{{ i.area }}</a>
        </template>
      </div>
    </section>
    <section class="newsong-content">
      <div class="item" v-for="i in newSonglist">
        <el-image style="width: 200px; height: 200px;" :src="i.picUrl" fit="cover" @click="playMusic(i)"/>
        <div class="item-duration">
          <el-icon><Clock /></el-icon>
          <span style="padding-left: 5px;">{{ formatTimestamp(i.song.duration, 'mm:ss') }}</span>
        </div>
        <div class="item-play" @click="playMusic(i)">
          <el-icon><VideoPlay /></el-icon>
        </div>
        <div class="item-name">
          <h4 class="songname">{{ i.name }}</h4>
          <div class="author">
            by 
            <template v-for="(j, index) in i.song.artists">
              <a @click="routerToSingerDetail(j.id)">{{ j.name }}</a>
              <span v-if="index !== i.song.artists.length - 1"> / </span>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .newsong {
    width: 100%;

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 5px solid var(--el-color-primary);
      margin: 20px 0;

      &_type {
        font-size: 18px;

        .area:not(:last-child)::after {
          content: '|';
          padding: 0 10px;
          color: #d8d8d8;
        }

        .area:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        .active {
          color: var(--el-color-primary);
        }
      }
    }

    &-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        flex-basis: 200px;
        display: flex;
        flex-direction: column;
        position: relative;
        // padding-bottom: 30px;

        .el-image:hover {
          cursor: pointer;
        }

        &-name {
          .songname {
            margin: 10px 0;
          }
          .author {
            font-size: 14px;
            color: #aaa;

            & > a {
              color: #000;
            }

            & > a:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }

        &-duration {
          position: absolute;
          top: 170px;
          left: 0;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
        }

        &-play {
          position: absolute;
          z-index: 9;
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 80px;
          color: #eee;
          display: none;

          &:hover {
            display: block;
            cursor: pointer;
          }
        }
        .el-image:hover ~ .item-play {
          display: block;
        }
      }

      .item:not(:nth-child(6n)) {
        margin: 0 auto 30px 0;
      }
    }
  }
</style>