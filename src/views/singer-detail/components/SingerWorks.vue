<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";
  import type { PaginationPropType } from "../type";
  import BasePagination from '@/components/common/BasePagination.vue';

  const props = defineProps<{
    activeName: number
    hotAlbums: any[]
    paginationProp: PaginationPropType
    mvs: any[]
  }>();

  const emits = defineEmits<{
    (event: 'play-album', params: any): void;
    (event: 'change-pagination', params: PaginationPropType): void;
  }>();

  const handleClick = async (id: number) => {

  };

  // mv播放次数
  const count = computed(() => {
    return function(value: number) {
      if (String(value).length > 4) {
        const str = value.toString();
        return str.slice(0, str.length - 4) + '万';
      } else {
        return value + '次';
      }
    }
  });

  // 播放专辑
  const playAlbum = (row: any) => {
    emits('play-album', row);
  };

  // 分页改变
  const changePagination = (params: any) => {
    // console.log('分页改变', params);
    emits('change-pagination', params)
  };
</script>

<template>
  <div class="singer-works">
    <el-tabs :model-value="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="专辑" :name="1">
        <template #label>专辑 {{ paginationProp.total }}</template>
        <!-- 专辑歌曲 -->
        <template #default>
          <div class="album">
            <section class="album-item" v-for="i in hotAlbums">
              <el-image style="width: 200px; height: 200px" :src="i.picUrl" fit="cover" />
              <div class="song">
                <div style="font-size: 20px; font-weight: bolder;">{{ i.name }}</div>
                <div style="padding: 10px 0;">{{ formatTimestamp(i.publishTime) }}</div>
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
              </div>
            </section>
          </div>
          <BasePagination 
            :total="paginationProp.total"
            :current-page="paginationProp.currentPage"
            :page-size="paginationProp.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            @on-page="changePagination"
            @on-size="changePagination"
          />
        </template>
      </el-tab-pane>
      <el-tab-pane label="MV" :name="2">
        <template #label>MV {{ mvs.length }}</template>
        <!-- mv视频 -->
        <template #default>
          <div class="mv">
            <!--  publishTime  name playCount -->
            <section class="mv-item" v-for="i in mvs">
              <el-image style="width: 280px; height: 150px; border-radius: 5%;" :src="i.imgurl" fit="cover" />
              <div class="playcount">
                {{ count(i.playCount) }}
              </div>
              <div class="playicon">
                <el-icon><VideoPlay /></el-icon>
              </div>
              <div>{{ i.name }}</div>
              <div>{{ i.publishTime }}</div>
            </section>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="个人介绍" :name="3"></el-tab-pane>
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
        padding-bottom: 30px;

        .song {
          flex: 100%;
          width: 200px;
          padding: 0 20px;

          .el-table {
            max-height: 140px;
            overflow-y: auto;

            .el-icon {
              transition: all 0.1s;
              font-size: 16px;
            }
            .el-icon:hover {
              cursor: pointer;
              transform: scale(1.5);
            }
          }
        }
      }
    }

    .el-pagination {
      padding: 30px 0 20px;
    }

    .mv {
      display: flex;
      flex-wrap: wrap;

      &-item {
        position: relative;
        width: 280px;
        margin: 0 20px 20px 0;

        .el-image:hover {
          cursor: pointer;
          border-radius: 20%;
          // background-color: rgba(54,48,51,0.4);
        }

        .playcount {
          box-sizing: border-box;
          position: absolute;
          bottom: 60px;
          right: 0px;
          width: 100%;
          height: 30px;
          line-height: 30px;
          border-radius: 5%;
          text-align: right;
          padding-right: 20px;
          background: rgba(54,48,51,0.4);
          color: #fff;
        }

        .playicon {
          display: none;
          box-sizing: border-box;
          position: absolute;
          bottom: 40%;
          right: 35%;
          // width: 100%;
          // height: 30px;
          // font-size: 50px;
          // line-height: 30px;
          color: #fff;

          .el-icon {
            font-size: 80px;
            color: var(--el-color-primar);
          }
        }
        .el-image:hover .playicon{
          display: block;
        }
      }
    }
  }
</style>