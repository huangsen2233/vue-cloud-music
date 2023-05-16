<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";
  import { useMusicStore } from "@/stores/music";
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";
  import type { PaginationType, PaginationParamsType } from "../type";
  import dianzanIcon from "@/assets/imgs/dianzan.png"
  import BasePagination from '@/components/common/BasePagination.vue';
  import SongTable from '@/components/songTable/SongTable.vue';
  import Comment from '@/components/comment/Comment.vue';

  watch(() => props.newComments, (newVal, oldVal) => {
    currentComment.value = newVal;
  });

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
    (event: 'tab-click', paneName: string): void
    (event: 'comment-pagination', params: PaginationParamsType): void
    (event: 'subscribers-pagination', params: PaginationParamsType): void
    (event: 'router-singer-detail', id: number): void
  }>();

  const currentComment = ref<any[]>([]);
  const currentCommentType = ref('new');

  // 表格的双击事件-播放歌曲
  const playSong = async (row: any) => {
    // console.log('播放的歌曲', row);
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
  <el-tabs :model-value="activeName" @tab-click="tabClick">
    <el-tab-pane name="song">
      <template #label>歌曲 {{ songs.length }}</template>
      <template #default>
        <!-- 歌曲 -->
        <SongTable :songs="songs" @play-song="playSong" @router-singer-detail="(id) => emits('router-singer-detail', id)" />
      </template>
    </el-tab-pane>
    <el-tab-pane name="comment">
      <template #label>评论 {{ commentPagination.total }}</template>
      <!-- 评论 -->
      <template #default>
        <Comment 
          :profile="profile" 
          :current-comment-type="currentCommentType" 
          :current-comment="currentComment" 
          :comment-pagination="commentPagination"
          :dianzan-icon="dianzanIcon"
          @change-comment-type="changeCommentType"
          @change-comment-pagination="changeCommentPagination"
        />
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
    padding: 40px 0 30px;
  }
</style>