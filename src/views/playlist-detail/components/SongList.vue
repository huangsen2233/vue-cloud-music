<script lang="ts" setup>
  import { ref, reactive, onMounted, watch } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";
  import { useMusicStore } from "@/stores/music";
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";

  import type { PaginationType, PaginationParamsType } from "../type";
  import dianzanIcon from "@/assets/imgs/dianzan.png"
  import BasePagination from '@/components/common/BasePagination.vue';

  watch(() => props.newComments, (newVal, oldVal) => {
    currentComment.value = newVal;
  });

  /* watch(() => props.newComments, (newVal, oldVal) => {
    currentComment.value = newVal;
  }); */

  const useMusic = useMusicStore();
  const useUser = useUserStore();

  const { profile } = storeToRefs(useUser);

  const props = defineProps<{
    activeName: string
    songs: any[]
    hotComments: any[]
    newComments: any[]
    commentPagination: PaginationType
    subscribers: any[]
    subscriberPagination: PaginationType
  }>();

  const emits = defineEmits<{
    (event: 'tab-click', params: any): void
    (event: 'comment-pagination', params: any): void
    (event: 'subscribers-pagination', params: any): void
  }>();

  const currentComment = ref<any[]>([]);
  const currentCommentType = ref('new');

  // 表格的双击事件-播放歌曲
  const handleDbClick = async (row: any) => {
    console.log('双击播放的歌曲', row);
    useMusic.getSongUrl(row);
  };

  // 切换评论类型
  const changeCommentType = (type: string) => {
    if (type === 'hot') {
      currentComment.value = [...props.hotComments];
      currentCommentType.value = type;
    } else {
      currentComment.value = [...props.newComments];
      currentCommentType.value = type;
    }
  };

  // tab的点击事件
  const tabClick = (pane: any) => {
    emits('tab-click', pane.paneName)
  };

  // 最新评论的分页事件
  const changeCommentPagination = (params: PaginationParamsType) => {
    emits('comment-pagination', params);
  };

  // 收藏者的分页事件
  const changSubscribersPagination = (params: PaginationParamsType) => {
    emits('subscribers-pagination', params);
  };

  const myComment = ref(''); // 我的评论
</script>

<template>
  <el-tabs :model-value="activeName" id="tabs" @tab-click="tabClick">
    <el-tab-pane name="song">
      <template #label>歌曲 {{ songs.length }}</template>
      <template #default>
        <!-- 歌曲 -->
        <el-table 
          :data="songs" 
          stripe
          :cell-style="{'text-align': 'center'}"
          header-cell-class-name="table-header" 
          @row-dblclick="handleDbClick"
        >
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column label="歌曲标题">
            <template v-slot="{ row }: any">
              <span style="cursor: pointer;">{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时长">
            <template v-slot="{ row }: any">
              <span style="cursor: pointer;">{{ formatTimestamp(row.dt, 'mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="歌手">
            <template v-slot="{ row }: any">
              <span style="cursor: pointer;">{{ row.ar[0].name  }}</span>
            </template>
          </el-table-column>
          <el-table-column label="专辑">
          <template v-slot="{ row }: any">
              <span style="cursor: pointer;">{{ row.al.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
    <el-tab-pane name="comment">
      <template #label>评论 {{ commentPagination.total }}</template>
      <!-- 评论 -->
      <template #default>
        <section style="display: flex;">
          <el-image :src="profile?.avatarUrl" style="width: 100px; height: 100px; border: 1px solid #fff;" fit="contain" />
          <div style="flex: 1; padding-left: 10px;">
            <el-input style="100%" type="textarea" :rows="3" placeholder="评论一下~~~" v-model="myComment"></el-input>
            <el-button style="margin-top: 10px;;" type="primary">评论</el-button>
          </div>
        </section>
        <section>
          <div class="comment-type" style="display: flex;">
            <h4 :class="[currentCommentType === 'new' ? 'activeComment' : '', 'normalComment']" style="padding-right: 20px;" @click="changeCommentType('new')">最新评论</h4>
            <h4 :class="[currentCommentType === 'hot' ? 'activeComment' : '', 'normalComment']" @click="changeCommentType('hot')">热门评论</h4>
          </div>
          <template v-for="i in currentComment">
            <div class="comment-item">
              <el-avatar style="width: 80px; height: 80px;" fit="scale-down" :src="i.user.avatarUrl" />
              <div class="contents">
                <div class="user">
                  <a style="color: var(--el-color-primary)">{{ i.user.nickname }}</a> :
                  <span style="padding-left: 5px;">{{ i.content }}</span>
                </div>
                <div v-if="i.beReplied.length > 0" style="margin: 15px 0;">
                  <template v-for="j in i.beReplied as any[]">
                    <div class="replied">
                      <a style="color: var(--el-color-primary)">{{ j.user.nickname }}</a> :
                      <span style="padding-left: 5px;">{{ j.content }}</span>
                    </div>
                  </template>
                </div>
                <div class="time">
                  <span>{{ formatTimestamp(i.time, 'YYYY-MM-DD') }}</span>  
                  <span style="display: flex; align-items: center;">
                    <el-image style="width: 18px; height: 18px; cursor: pointer; padding: 0 5px;" :src="dianzanIcon"></el-image>
                    <a>{{ i.likedCount }}</a>
                    <el-icon style="cursor: pointer; padding: 0 5px 0 15px;"><ChatDotSquare /></el-icon>
                    <a>回复</a>
                  </span>
                </div>
              </div>
            </div>
          </template>
          <!-- 分页 -->
          <BasePagination
            v-if="currentCommentType === 'new' && commentPagination.total >= 20"
            :total="commentPagination.total"
            :current-page="commentPagination.currentPage"
            :page-size="commentPagination.pageSize"
            :page-sizes="[20, 30, 40, 50]"
            @on-page="changeCommentPagination"
            @on-size="changeCommentPagination"
          />
        </section>
      </template>
    </el-tab-pane>
    <el-tab-pane name="collect">
      <template #label>收藏 {{ subscriberPagination.total }}</template>
      <!-- 收藏者 -->
      <template #default>
        <section class="collector">
          <template v-for="i in subscribers">
            <div class="collector-item">
              <el-avatar style="width: 80px; height: 80px;" fit="scale-down" :src="i.avatarUrl" />
              <div style="padding: 0 5px 0 15px;">{{ i.nickname }}</div>
              <el-icon v-if="i.gender === 1" color="#3559F1">
                <Female />
              </el-icon>
              <el-icon v-else-if="i.gender === 2" color="#F34486">
                <Male />
              </el-icon>
            </div>
          </template>
        </section>
        <BasePagination
          v-if="subscriberPagination.total >= 20"
          :total="subscriberPagination.total"
          :current-page="subscriberPagination.currentPage"
          :page-size="subscriberPagination.pageSize"
          :page-sizes="[20, 40, 60, 80]"
          @on-page="changSubscribersPagination"
          @on-size="changSubscribersPagination"
        />
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
  .el-table {
    border: 1px solid #ccc;

    :deep(.table-header) {
      text-align: center;
      background: linear-gradient(to bottom, #fff, #eee) !important;
      font-size: 16px;
      border-right: 1px solid #ccc !important;
      border-bottom: 1px solid #ccc !important;
    }
  }

  .activeComment {
    color: var(--el-color-primary);
  }
  .normalComment {
    cursor: pointer;
  }

  .comment-type {
    border-bottom: 1px solid #ccc;
  }

  .comment-item {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;

    .el-avatar {
      flex-shrink: 0;
    }

    .contents {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 10px;

      .time {
        display: flex;
        justify-content: space-between;
      }

      .replied {
        width: 80%;
        padding: 15px;
        background-color: #F4F4F4;
      }

      a:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  
  .collector {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-item {
      flex: 20%;
      display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 20px;
    }
  }

  .collector-item:hover {
    cursor: pointer;
    background: #E6E6E6;
  }
  .el-pagination {
    padding: 30px 0;
  }
</style>