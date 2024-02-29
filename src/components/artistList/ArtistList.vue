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
    <section class="list-img" v-for="i in artists">
      <img v-lazy="i.picUrl" style="width: 250px; height: 250px;" />
      <div class="list-img-name">
        <a @click="emits('router-singerdetail', i.id, i.fansCount)">{{ i.name }}</a>
        <el-icon :title="`${i.name}的个人主页`"><Discount /></el-icon>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-img {
      margin-bottom: 20px;

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
  }
</style>