<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps<{
    artists: any[]
  }>();
  const emits = defineEmits<{
    (event: 'router-singerdetail', id: number, fansCount?: number): void
  }>();
</script>

<template>
  <div class="list">
    <section class="list-img" v-for="i in artists.slice(0,10)">
      <el-image :src="i.picUrl" style="width: 200px; height: 200px;" fit="cover" loading="lazy"></el-image>
      <div class="list-img-name">
        <a @click="emits('router-singerdetail', i.id, i.fansCount)">{{ i.name }}</a>
        <el-icon :title="`${i.name}的个人主页`"><Discount /></el-icon>
      </div>
    </section>
    <section class="list-profile" v-for="i in artists.slice(10)">
      <a @click="emits('router-singerdetail', i.id, i.fansCount)">{{ i.name }}</a>
      <el-icon :title="`${i.name}的个人主页`"><Discount /></el-icon>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;

    &-img {
      flex-basis: 18%;
      margin: 20px calc(10% / 4) 30px 0;
      &:nth-child(5n) {
        margin-right: 0;
      }
      &-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & > a:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        .el-icon {
          color: var(--el-color-primary);
          cursor: pointer;
        }
      }
    }

    &-profile {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 18%;
      margin: 0 calc(10% / 4) 30px 0;
      &:nth-child(5n) {
        margin-right: 0;
      }
      & > a:hover {
        cursor: pointer;
        text-decoration: underline;
      }
      .el-icon {
        color: var(--el-color-primary);
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
</style>