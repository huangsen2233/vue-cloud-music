<script lang="ts" setup>
  import { ref, reactive, onMounted} from 'vue';
  import { formatTimestamp } from '@/utils/dateFormat';
  import { count } from '@/utils/count';

  const props = defineProps<{
    mvs: any[]
  }>();

  const emits = defineEmits<{
    (event: 'play-mv', id: number): void
  }>();
</script>

<template>
  <div class="mv">
    <section class="mv-item" v-for="i in mvs">
      <el-image :src="i.imgurl ?? i.cover" fit="cover" />
      <div class="playcount">
        <span>{{ count(i.playCount) }}</span>
        <span>{{ formatTimestamp(i.duration, 'mm:ss') }}</span>
      </div>
      <div class="playicon" @click="emits('play-mv', i.id)">
        <el-icon><VideoPlay /></el-icon>
      </div>
      <div>
        <el-tag>MV</el-tag>
        {{ i.name }}
      </div>
      <div>{{ i.publishTime }}</div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .mv {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    &-item {
      position: relative;
      width: 320px;
      // margin: 0 20px 20px 0;

      .el-image {
        position: relative;
        width: 320px;
        height: 180px;
        border-radius: 20px;
      }

      .el-image:hover ~ .playicon {
        opacity: 1;
        z-index: 1;
      }

      .playicon {
        box-sizing: border-box;
        position: absolute;
        z-index: -1;
        top: 0;
        height: 180px;
        width: 320px;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          opacity: 1;
          z-index: 1;
        }

        .el-icon {
          font-size: 80px;
          color: #fff;
        }
      }

      .playcount {
        box-sizing: border-box;
        position: absolute;
        top: 150px;
        right: 0px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-radius: 0 0 20px 20px;
        text-align: right;
        padding: 0 20px;
        background: rgba(54,48,51,0.4);
        color: #fff;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>