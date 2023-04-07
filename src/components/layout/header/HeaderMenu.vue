<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  
  const menuList = [
    {index: 'recommend', item: '推荐'},
    {index: 'ranking', item: '排行榜'},
    {index: 'song', item: '歌单'},
    {index: 'singer', item: '歌手'}
  ];
</script>

<template>
  <div class="header-menu">
    <el-menu
      router
      default-active="recommend"
      mode="horizontal"
      background-color="rbg(0,0,0)"
      text-color="#ccc"
      active-text-color="#fff"
    >
      <template v-for="i in menuList">
        <el-menu-item :index="i.index">{{ i.item }}</el-menu-item>
      </template>  
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
  .el-menu {
    height: 80px;
    width: 500px;

    &-item {
      border-bottom: 8px solid rgba(36,36,36,0.9);
      color: #ccc;
      font-size: 18px;
    }
    &-item:not(.is-disabled):hover {
      color: #fff;
      background-color: rgba(0, 0, 0);
    }
    &-item.is-active {
      border-bottom: 8px solid rgb(232,34,2);
    }
  }
</style>