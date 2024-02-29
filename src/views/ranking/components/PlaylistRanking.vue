<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps<{
    rankinglist: any[]
  }>();

  const emits = defineEmits<{
    (event: 'switch-ranking', params: number): void
  }>();

  const value1 = ref(-1);
  const value2 = ref(-1);
  const currentRanking = ref<any>();

  // 切换榜单
  const switchRanking = (val1: number, val2: number, data: any) => {
    value1.value = val1;
    value2.value = val2;
    currentRanking.value = data;
    emits('switch-ranking', data.id);
  };
</script>

<template>
  <div class="ranking">
    <div class="ranking-list" v-for="(i, index1) in rankinglist">
      <h3 class="title">{{ i.title }}</h3>
      <section class="list">
        <div 
          :class="[value1 === index1 && value2 === index2 ? 'active-item' : '', 'item']" 
          v-for="(j, index2) in (i.list as any[])" 
          @click="switchRanking(index1, index2, j)"
        >
          <img style="width: 120px; height: 120px" v-lazy="j.coverImgUrl" />
          <div class="item-name">
            <span>{{ j.name }}</span>
              <div :title="j.description">简介: {{ j.description || '~' }}</div>
            <span style="color: #999">{{ j.updateFrequency }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="less">
  .ranking-list {
    padding-bottom: 40px;
    .list {
      .item {
        display: flex;
        padding: 15px 0;
        cursor: pointer;

        &-name {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: calc(100% - 120px);
          padding-left: 20px;

          & > div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .el-image {
          flex-shrink: 0;
        }
      }
      .active-item {
        background: #E6E6E6;
      }
    }
  }

  .el-popper.description {
    font-size: 16px !important;
    max-width: 500px;
  }
</style>