<script lang="ts" setup>
  import { ref, reactive} from 'vue';

  const props = defineProps<{
    artists: any[]
  }>();
  const emits = defineEmits<{
    (event: 'router-singerdetail', id: number, fansCount?: number): void
  }>();
</script>

<template>
  <div class="img-list">
    <div class="img-item" v-for="i in artists">
      <el-image :src="i.picUrl" style="width: 200px; height: 200px;" fit="cover" loading="lazy"></el-image>
      <div class="name">
        <a @click="emits('router-singerdetail', i.id, i.fansCount)">{{ i.name }}</a>
        <el-avatar :title="`${i.name}的个人主页`" size="small" :src="i.img1v1Url" @click="emits('router-singerdetail', i.id, i.fansCount)" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .img-list {
    display: flex;
    flex-wrap: wrap;

    .img-item {
      flex: 0 0 15%;
      margin: 20px calc(10% / 5) 30px 0;

      .name {
        display: flex;
        justify-content: space-between;
        align-items: center;

        a:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .el-avatar {
          cursor: pointer;
        }
      }
    }

    .img-item:nth-child(6n) {
      margin-right: 0;
    }
  }
</style>