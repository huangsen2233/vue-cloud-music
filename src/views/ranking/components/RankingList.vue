<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';

  onMounted(() => {
  });

  const props = defineProps<{
    rankinglist: any[]
  }>();

  const value1 = ref(-1);
  const value2 = ref(-1);
  const currentRanking = ref<any>();

  // 切换榜单
  const switchRanking = (val1: number, val2: number, data: any[]) => {
    console.log('当前榜单', data);
    value1.value = val1;
    value2.value = val2;
    currentRanking.value = data;
  };
</script>

<template>
  <div class="ranking">
    <div class="ranking-list" v-for="(i, index1) in rankinglist">
      <h3 class="title">{{ i.title }}</h3>
      <section class="list">
        <div 
          :class="[value1 === index1 && value2 === index2 ? 'active-item' : '', 'item']" 
          v-for="(j, index2) in i.list" @click="switchRanking(index1, index2, j)"
        >
          <el-image style="width: 60px; height: 60px" :src="j.coverImgUrl" fit="cover" />
          <div class="item-name">
            <span>{{ j.name }}</span>
            <span style="color: #999">{{ j.updateFrequency }}</span>
          </div>
        </div>
        <!-- {{ i.list[0].name }}  -->
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .ranking-list {
    padding-bottom: 40px;
    .list {
      .item {
        display: flex;
        padding: 15px;

        &-name {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 10px;
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
</style>