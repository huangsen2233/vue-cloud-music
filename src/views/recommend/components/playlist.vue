<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import PlaylistItem from "@/components/common/PlaylistItem.vue";
  import type { PropType } from 'vue';

  const props = defineProps({
    playList: Array as PropType<any[]>
  });
  
</script>

<template>
  <div class="playlist">
    <section class="playlist-title">
      <h2>推荐歌单</h2>
      <i>更多<el-icon><DArrowRight /></el-icon></i>
    </section>
    <section class="playlist-content">
      <div class="item" v-for="i in props.playList">
        <PlaylistItem :playlist-info="i" />
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .playlist {
    width: 100%;

    &-title {
      border-bottom: 1px solid red;
      // margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > h2 {
        cursor: pointer;
      }

      & > i {
        box-sizing: border-box;
        font: 18px bolder;
        cursor: pointer;

        .el-icon {
          vertical-align: middle;
        }
      }

      & > i:hover {
        border-bottom: 2px solid #000;
      }

    }

    &-content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .item {
        box-sizing: border-box;
        flex: 20%;
      }
    }
  }
</style>