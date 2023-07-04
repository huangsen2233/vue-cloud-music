<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from "pinia";
  import { useMusicStore } from "@/stores/music";
  import { useUserStore } from "@/stores/user";
  import { commentLikeApi, commentApi } from "@/api/comment";
  import BasePagination from '@/components/pagination/BasePagination.vue';
  import SongTable from '@/components/songTable/SongTable.vue';
  import Comment from '@/components/comment/Comment.vue';
  import type { PaginationType, PaginationParamsType } from "../type";

  const { getSongUrl, addToPlaylist } = useMusicStore();
  const { profile } = storeToRefs(useUserStore());
  const loading = ref<boolean>(false);
  const commentRef = ref<InstanceType<typeof Comment>>();

  const props = defineProps<{
    playlistId: number
    activeName: string
    songs: any[]
    currentCommentType: string
    currentComment: any[]
    commentPagination: PaginationType
    subscribers: any[]
    subscriberPagination: PaginationType
  }>();

  const emits = defineEmits<{
    (event: 'tab-click', paneName: string): void
    (event: 'comment-pagination', params: PaginationParamsType): void
    (event: 'comment-type', type: string): void
    (event: 'subscribers-pagination', params: PaginationParamsType): void
    (event: 'router-singer-detail', id: number): void
  }>();

  // 表格的双击事件-播放歌曲
  const playSong = async (row: any) => {
    const { dt, al, ar, name, id } = row;
    const songInfo = { songId: id, songName: name, picUrl: al.picUrl, duration: dt, artists: ar };
    getSongUrl(songInfo);
  };

  // 添加到播放列表
  const addPlaylist = (songInfo: any) => {
    addToPlaylist(songInfo)
  };

  // 切换评论类型
  const changeCommentType = (type: string) => {
    emits('comment-type', type)
  };

  // tab的点击事件
  const tabClick = (pane: any) => {
    emits('tab-click', pane.paneName)
  };

  // 最新评论的分页事件
  const changeCommentPagination = (params: PaginationParamsType) => {
    emits('comment-pagination', params)
  };

  // 收藏者的分页事件
  const changSubscribersPagination = (params: PaginationParamsType) => {
    emits('subscribers-pagination', params)
  };

  // 点赞歌单评论
  const like = async (commentInfo: any) => {
    const likeParams = {
      id: props.playlistId,
      cid: commentInfo.commentId,
      t: commentInfo.liked ? 0 : 1,
      type: 2
    }
    const { code }: any = await commentLikeApi(likeParams)
    if (code === 200) {
      const paginationParams = { 
        currentPage: props.commentPagination.currentPage,
        pageSize: props.commentPagination.pageSize
      }
      emits('comment-pagination', paginationParams)
      if (commentInfo.liked) {
        ElMessage({ message: '取消点赞', type: 'success' })
      } else {
        ElMessage({ message: '点赞成功', type: 'success' })
      }
    }
  };

  // 回复歌曲评论
  const reply = async (myComment: string, commentId?: number) => {
    if (!commentId) {
      loading.value = true
    }
    const commentParams = {
      id: props.playlistId, 
      t: commentId ? 2 : 1, 
      type: 2, 
      content: myComment,
      commentId: commentId ?? 0
    }
    const { code }: any = await commentApi(commentParams)
    if (code === 200) {
      const paginationParams = { 
        currentPage: props.commentPagination.currentPage,
        pageSize: props.commentPagination.pageSize
      }
      setTimeout(() => {
        emits('comment-pagination', paginationParams)
        commentId ? ElMessage({ message: '已回复评论', type: 'success' }) : ElMessage({ message: '已发送评论', type: 'success' }) 
        if (commentRef.value) {
          commentRef.value.myComment = ''
          commentRef.value.replyComment = ''
        }
        loading.value = false
      }, 1500)
    } else {
      loading.value = false
    }
  };
</script>

<template>
  <el-tabs :model-value="activeName" @tab-click="tabClick">
    <el-tab-pane name="song">
      <template #label>歌曲 {{ songs.length }}</template>
      <template #default>
        <!-- 歌曲 -->
        <SongTable :songs="songs" @play-song="playSong"  @add-playlist="addPlaylist" @router-singer-detail="(id: number) => emits('router-singer-detail', id)" />
      </template>
    </el-tab-pane>
    <el-tab-pane name="comment">
      <template #label>评论 {{ commentPagination.total }}</template>
      <!-- 评论 -->
      <template #default>
        <Comment
          ref="commentRef" 
          :avatar-url="profile.avatarUrl"
          :current-comment-type="currentCommentType" 
          :current-comment="currentComment" 
          :comment-pagination="commentPagination"
          :loading="loading"
          @change-comment-type="changeCommentType"
          @change-comment-pagination="changeCommentPagination"
          @like="like"
          @reply="reply"
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
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }

  .el-pagination {
    padding: 40px 0 30px;
  }
</style>