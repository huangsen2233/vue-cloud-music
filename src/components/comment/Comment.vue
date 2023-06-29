<script lang="ts" setup>
  import { ref } from 'vue';
  import { formatTimestamp } from "@/utils/dateFormat";
  import BasePagination from '@/components/pagination/BasePagination.vue';

  type PaginationType = {
    currentPage: number
    pageSize: number
    total: number
  }

  type PaginationParamsType = {
    currentPage: number
    pageSize: number
  }

  const props = defineProps<{
    avatarUrl: string
    currentCommentType: string
    currentComment: any[]
    commentPagination: PaginationType
  }>();

  const emits = defineEmits<{
    (event: 'change-comment-type', type: string): void
    (event: 'change-comment-pagination', params: PaginationParamsType): void
    (event: 'like', commentInfo: any): void
    (event: 'reply', commentInfo: any): void
  }>();

  const myComment = ref('');
</script>

<template>
  <div class="comment">
    <section class="comment-my">
      <el-image class="comment-my-img" :src="avatarUrl" fit="contain" />
      <div class="comment-my-content">
        <el-input type="textarea" :rows="3" placeholder="评论一下~" v-model="myComment"></el-input>
        <el-button type="primary">评论</el-button>
      </div>
    </section>
    <section class="comment-list">
      <div class="comment-list-type">
        <h4 :class="[currentCommentType === 'new' ? 'active-comment' : '']" @click="emits('change-comment-type', 'new')">最新评论</h4>
        <h4 :class="[currentCommentType === 'hot' ? 'active-comment' : '']" @click="emits('change-comment-type', 'hot')">热门评论</h4>
      </div>
      <div class="comment-list-item" v-for="i in currentComment">
        <el-avatar fit="scale-down" :src="i.user.avatarUrl" />
        <div class="comments">
          <div class="comments_user">
            <a class="comments_user_nickname">{{ i.user.nickname }}:</a>
            <span class="comments_user_content">{{ i.content }}</span>
          </div>
          <div class="comments_reply" v-if="i.beReplied.length > 0">
            <div class="comments_reply_content" v-for="j in i.beReplied">
              <a class="comments_reply_content_nickname">{{ j.user.nickname }}:</a>
              <span>{{ j.content }}</span>
            </div>
          </div>
          <div class="comments_time">
            <span>{{ formatTimestamp(i.time, 'YYYY-MM-DD') }}</span>  
            <span class="comments_time_like">
              <span :class="['iconfont', 'icon-dianzan', i.liked ? 'liked-color' : '']" @click="emits('like', i)"></span>
              <a>{{ i.likedCount }}</a>
              <span class="iconfont icon-pinglun" @click="emits('reply', i)"></span>
              <a class="reply" @click="emits('reply', i)">回复</a>
            </span>
          </div>
        </div>
      </div>
    </section>
    <!-- 分页 -->
    <BasePagination
      v-if="currentCommentType === 'new' && commentPagination.total >= 20"
      :total="commentPagination.total"
      :current-page="commentPagination.currentPage"
      :page-size="commentPagination.pageSize"
      :page-sizes="[20, 30, 40, 50]"
      @on-page="(params: PaginationParamsType) => emits('change-comment-pagination', params)"
      @on-size="(params: PaginationParamsType) => emits('change-comment-pagination', params)"
    />
  </div>
</template>

<style lang="less" scoped>
  .comment {
    &-my {
      display: flex;
      &-img {
        width: 100px; 
        height: 100px; 
        border: 1px solid #fff;
      }
      &-content {
        flex: 1; 
        padding-left: 10px;
        .el-input {
          width: 100%;
        }
        .el-button {
          margin-top: 10px;
        }
      }
    }

    &-list {
      &-type {
        display: flex;
        border-bottom: 1px solid #ccc;
        & > h4 {
          cursor: pointer;
        }
        & > h4:first-child {
          padding-right: 20px;
        }
        .active-comment {
          color: var(--el-color-primary);
        }
      }

      &-item {
        display: flex;
        padding: 15px 0;
        .el-avatar {
          // flex-shrink: 0;
          width: 80px; 
          height: 80px;
        }
        .comments {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 10px;

          &_user {
            &_nickname {
              color: var(--el-color-primary);
              padding-right: 10px;
            }
            &_content {
              word-break: break-all;
            }
          }

          &_reply {
            margin: 15px 0;
            &_content {
              width: 80%;
              padding: 15px;
              background-color: #F4F4F4;
              &_nickname {
                color: var(--el-color-primary);
                padding-right: 10px;
              }
            }
          }

          &_time {
            display: flex;
            justify-content: space-between;
            &_like {
              display: flex; 
              align-items: center;
              .iconfont {
                width: 18px; 
                height: 18px;
                font-weight: bold;
                cursor: pointer; 
                padding: 0 5px;
              }
              .icon-pinglun {
                padding: 0 5px 0 15px;
              }
              .liked-color {
                color: var(--el-color-primary);
              }
              .reply:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        }
      }
      &-item:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
    }

    .el-pagination {
      padding: 40px 0 30px;
    }
  }
</style>