<script lang="ts" setup>
  import { ref } from 'vue';
  import type { playlistType } from "../playlist.vue";

  const props = defineProps<{
    showPopover: boolean
    tagsList: any
    tagsIcons: any
  }>();

  const emits = defineEmits<{
    (event: 'on-change', params: playlistType): void
    (event: 'update:showPopover', params: boolean): void
  }>();

  const tagType = ['', 'success', 'warning', 'danger', 'info'];

  let cat = ref('全部');

  // 切换歌单标签
  const switchPlaylist = (tag: string) => {
    cat.value = tag;
    emits('on-change', { cat: tag });
    emits('update:showPopover', false);
  };

  // 显示歌单标签弹框
  const popoverClick = () => {
    emits('update:showPopover', !props.showPopover);
  }
</script>

<template>
  <div class="playlist-tag">
    <section class="playlist-tag-select">
      <span>{{ cat }}</span>
      <!-- 弹出框: 歌单标签 -->
      <el-popover :visible="showPopover" placement="bottom-end" :width="700" popper-class="playlist-popover">
        <template #reference>
          <el-button type="primary" size="large" @click="popoverClick">
            选择分类<el-icon style="padding-left: 5px;"><ArrowDown /></el-icon>
          </el-button>
        </template>
        <template v-for="(value,key,index) in tagsList as object" :key="key">
          <div class="playlist-popover-content">
            <el-image :src="tagsIcons[key]" style="width: 28px; height: 28px;"></el-image>
            <el-tag size="large" :type="tagType[index]" style="margin: 0 10px; font-size: 16px;">{{ key }}</el-tag>
            <div class="tag">
              <template v-for="item in value as any">
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
</style>