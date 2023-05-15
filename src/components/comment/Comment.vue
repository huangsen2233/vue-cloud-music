<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  const props = defineProps<{name: string}>();
  const emits = defineEmits<{(event: 'on-click', params: number): void}>();
</script>

<template>
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

<style lang="less" scoped>
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
</style>