<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue';
  import type { playlistType } from "../playlist.vue";

  const { tagsList, tagsIcons } = defineProps<{
    tagsList: any
    tagsIcons: any
  }>();

  const emits = defineEmits<{
    (event: 'on-change', params: playlistType): void
  }>();

  const tagTypeArr = ['primary', 'success', 'warning', 'danger', 'info'];

  let cat = ref('全部');

  // 切换歌单
  const switchPlaylist = (tag: string) => {
    cat.value = tag;
    emits('on-change', { cat: tag });
  }
</script>

<template>
  <div class="playlist-tag">
    <section class="playlist-tag-select">
      <span>{{ cat }}</span>
      <!-- 弹出框-歌单标签 -->
      <el-popover placement="bottom-end" :width="700" trigger="hover" popper-class="elpopover">
        <template #reference>
          <el-button type="primary" size="large" plain>
            选择分类<el-icon style="padding-left: 5px;"><ArrowDown /></el-icon>
          </el-button>
        </template>
        <template v-for="(value,key,index) in tagsList">
          <div class="elpopover-content">
            <el-image :src="tagsIcons[key]" style="width: 28px; height: 28px;"></el-image>
            <el-tag size="large" type="success"  style="margin: 0 10px; font-size: 16px;">{{ key }}</el-tag>
            <div class="tag">
              <template v-for="item in value">
                <a @click="switchPlaylist(item.name)">{{ item.name }}</a>
              </template>
            </div>
          </div>
        </template>
      </el-popover>
    </section>
    <section class="playlist-tag-all">
      <el-button type="primary" size="large" @click="switchPlaylist('全部')">
        全部<el-icon style="padding-left: 5px;"><DArrowRight /></el-icon>
      </el-button>
      <el-button type="danger" size="large" @click="switchPlaylist('热门')">
        热门<el-icon style="padding-left: 5px;"><Sunny /></el-icon>
      </el-button>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .playlist-tag {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 5px solid var(--el-color-primary);

    &-select {
      span {
        font-size: 22px;
        font-weight: bold;
        vertical-align: middle;
        padding-right: 20px;
      }
    }
  }

  .elpopover {
    &-content {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      .el-image, .el-tag {
        flex-shrink: 0; // 不缩小
      }

      .tag {
        display: flex;
        flex-wrap: wrap;

        a::after {
          content: '|';
          padding: 0 10px;
          color: #d8d8d8;
        }

        a {
          padding-bottom: 10px;
        }

        a:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        
      }
    }

    &-content:last-of-type {
      padding-bottom: 0;
    }
  }

</style>