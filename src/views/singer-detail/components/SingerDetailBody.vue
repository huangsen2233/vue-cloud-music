<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";
  import type { MvType } from "../type";
  import Mvs from '@/components/mvs/Mvs.vue';

  const props = defineProps<{
    activeName: number
    activeCollapse: number
    hotAlbums: any[]
    albumSize: number
    loading: boolean
    mvs: MvType[]
    briefDesc: string
    introduction: any[]
  }>();

  const emits = defineEmits<{
    (event: 'play-album', params: any): void;
    (event: 'play-mv', mvid: number | string): void;
  }>();

  // 个人介绍的文字换行
  const _introduction = computed(() => {
    return props.introduction.map(item => {
      if (!item) []
      item.txt = [...item.txt.split('●')];
      return item;
    });
  });

  const text = computed(() => {
    if (props.hotAlbums.length === props.albumSize) {
      return '没有更多专辑啦！'
    }
    return '向下滚动获取更多专辑'
  })

  // 播放专辑
  const playAlbum = (row: any) => {
    emits('play-album', row);
  };

  // 路由跳转到MV视频
  const routerToVideo = (mvid: number | string) => {
    emits('play-mv', mvid)
  };
</script>

<template>
  <div class="singer-works">
    <el-tabs :model-value="activeName" class="demo-tabs">
      <el-tab-pane label="专辑" :name="1">
        <template #label>专辑 {{ albumSize }}</template>
        <!-- 专辑歌曲 -->
        <template #default>
          <div class="album">
            <section class="album-item" v-for="i in hotAlbums">
              <el-image style="width: 250px; height: 250px" :src="i.picUrl" fit="cover" />
              <div class="song">
                <b style="font-size: 20px; font-weight: bolder;">{{ i.name }}</b>
                <el-collapse :model-value="activeCollapse" style="margin-top: 20px;">
                  <el-collapse-item title="歌手" :name="1">
                    <template #title>
                      <b style="font-size: 14px;">歌手</b>
                    </template>
                    <span v-for="j in i.artists" style="padding-right: 10px;">{{ j.name }}</span>
                  </el-collapse-item>
                  <el-collapse-item title="发行时间" :name="2">
                    <template #title>
                      <b style="font-size: 14px;">发行时间</b>
                    </template>
                    {{ formatTimestamp(i.publishTime) }}
                  </el-collapse-item>
                  <el-collapse-item title="发行公司" :name="3">
                    <template #title>
                      <b style="font-size: 14px;">发行公司</b>
                    </template>
                    {{ i.company }}
                  </el-collapse-item>
                  <el-collapse-item title="专辑列表" :name="4">
                    <template #title>
                      <b style="font-size: 14px;">专辑列表</b>
                    </template>
                    <el-table :data="i.songs" border stripe :show-header="false">
                      <el-table-column type="index" width="120px">
                        <template v-slot="{ row, $index }: any">
                          <div style="display: flex; justify-content: space-around; align-items: center;">
                            <span>{{ $index + 1 }}</span>
                            <el-icon @click="playAlbum(row)"><VideoPlay /></el-icon>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column prop="name" label="歌名" align="center" />
                      <el-table-column prop="dt" label="时长" align="center">
                        <template v-slot="{ row }: any">{{ formatTimestamp(row.dt, 'mm:ss') }}</template>
                      </el-table-column>
                    </el-table>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </section>
          </div>
          <div class="loading">{{ loading ? '正在加载......' : text }}</div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="MV" :name="2">
        <template #label>MV {{ mvs.length }}</template>
        <!-- mv -->
        <template #default>
          <Mvs :mvs="mvs" @play-mv="routerToVideo" />
        </template>
      </el-tab-pane>
      <el-tab-pane label="个人介绍" :name="3">
        <template #label>个人介绍</template>
        <!-- 个人介绍 -->
        <template #default>
          <div class="introduce">
            <section class="introduce-personal">
              <h3>艺人简介</h3>
              <div>{{ briefDesc }}</div>
            </section>
            <section v-for="i in _introduction">
              <h3>{{ i.ti }}</h3>
              <div v-for="j in i.txt">{{ j }}</div>
            </section>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
  .singer-works {
    padding-top: 30px;

    .album {
      display: flex;
      flex-wrap: wrap;

      &-item {
        flex: 50%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 50px;

        .song {
          flex: 100%;
          width: 200px;
          padding: 0 20px;

          .el-table .el-icon{
            transition: all 0.1s;
            font-size: 16px;
          }
          .el-icon:hover {
            cursor: pointer;
            transform: scale(1.2);
          }
        }
      }
    }
    .loading {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
      text-align: center;
      padding: 20px 0;
      font-size: 20px;
    }

    .introduce {
      & > section {
        padding-bottom: 30px;
        & > div {
          text-indent: 2em;
          line-height: 2;
          letter-spacing: 1px;
        }
      }
    }
  }
</style>