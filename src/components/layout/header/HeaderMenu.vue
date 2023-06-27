<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();

  // 页面刷新时，重置默认激活的菜单项
  watch(() => route.path, (newRoute, oldRoute) => {
    const menus = ['/recommend', '/ranking', '/playlist', '/singer'];
    if (menus.includes(newRoute)) {
      defaultActive.value = newRoute;
    } else {
      defaultActive.value = '';
    }
  });
  
  const defaultActive = ref('recommend');

  const menuList = [
    {index: '/recommend', item: '推荐'},
    {index: '/ranking', item: '排行榜'},
    {index: '/playlist', item: '歌单'},
    {index: '/singer', item: '歌手'}
  ];

  // 路由回退
  const backRouter = () => {
    router.back();
  };

  // 路由前进
  const forwardRouter = () => {
    router.forward();
  };
</script>

<template>
  <div class="header-menu">
    <div class="header-menu-router">
      <el-icon @click="backRouter"><ArrowLeftBold /></el-icon>
      <el-icon @click="forwardRouter"><ArrowRightBold /></el-icon>
    </div>
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
  .header-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    font-size: 18px;
    
    &-router {
      color: #ccc;
      font-size: 20px;
      padding-right: 2em;

      .el-icon {
        padding-right: 1em;
      }

      .el-icon:hover {
        color: #fff;
        cursor: pointer;
        padding-right: 1em;
      }
    }

    .el-menu {
      height: 80px;
      border: none; // 清除自带的border

      &-item {
        width: 80px;
        box-sizing: border-box;
        color: #ccc;
        font-size: 18px;
      }
      &-item:not(.is-disabled):hover {
        color: #fff;
        background-color: rgba(0, 0, 0);
      }
      &-item.is-active {
        border-bottom: 6px solid var(--el-color-primary);
      }
    }
  }
</style>