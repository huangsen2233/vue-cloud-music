<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute } from "vue-router"
  
  const route = useRoute();

  // description：页面刷新时，重置默认激活的菜单项
  watch(() => route.path, (newRoute, oldRoute) => {
    defaultActive.value = newRoute.replace('/', '');
  });
  
  const defaultActive = ref('recommend');

  const menuList = [
    {index: 'recommend', item: '推荐'},
    {index: 'ranking', item: '排行榜'},
    {index: 'playlist', item: '歌单'},
    {index: 'singer', item: '歌手'}
  ];
</script>

<template>
  <div class="header-menu">
    <el-menu
      router
      :default-active="defaultActive"
      mode="horizontal"
      :ellipsis="false"
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
      width: 100px;
      border-bottom: 8px solid rgba(36,36,36,0.9);
      color: #ccc;
      font-size: 18px;
    }
    &-item:not(.is-disabled):hover {
      color: #fff;
      background-color: rgba(0, 0, 0);
    }
    &-item.is-active {
      border-bottom: 8px solid var(--el-color-primary);
    }
  }
</style>