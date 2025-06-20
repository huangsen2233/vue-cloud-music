<script setup lang="ts">
  import { ref, provide, onMounted } from 'vue';
  import { useUserStore } from "@/stores/user";
  import { loginStatusApi } from "@/api/login";
  import Header from "@/components/layout/header/Header.vue";
  import Footer from "@/components/layout/footer/Footer.vue";
  import LoginDiaLog from "@/components/dialog/LoginDiaLog.vue";
  import BaseBackTop from "@/components/backTop/BaseBackTop.vue";
  
  onMounted(() => {
    !useUser.loginStatus && checkUserStatus();
  });

  const useUser = useUserStore();
  const dialogVisible = ref<boolean>(false);
  const footerVisible = ref<boolean>(true);

  // 登录框的展示、隐藏
  const changeDialogVisible = () => {
    dialogVisible.value = !dialogVisible.value;
  };

  // 检查登录状态
  const checkUserStatus = async () => {
    const { data: { code, account, profile } } = await loginStatusApi();
    if (code === 200 && profile !== null) {
      useUser.loginStatus = true;
      useUser.account = account;
      useUser.profile = profile;
    }
  };

  // 切换音乐栏显示、隐藏
  const switchMusicBar = () => {
    footerVisible.value = !footerVisible.value
  };

  provide('on-login', changeDialogVisible);
</script>

<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-card>      
        <router-view v-slot="{ Component }">
          <!-- 
            原因：缓存组件后，切换路由组件不会重新渲染
            解决：exclude排除动态路由组件或者在router-view上使用:key="$route.fullPath"
          -->
          <keep-alive>
            <component :key="$route.fullPath" :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :key="$route.fullPath" :is="Component" v-if="!$route.meta.keepAlive"></component>
        </router-view>
      </el-card>
    </el-main>
    <el-footer :class="[footerVisible ? '' : 'hiddle-footer']">
      <Footer />
      <!-- 隐藏音乐栏 -->
      <el-icon :class="['icon-left', footerVisible ? '' : 'hidden']" title="隐藏音乐栏" @click="switchMusicBar"><DArrowLeft /></el-icon>
      <el-icon :class="['icon-right', footerVisible ? 'hidden' : '']" title="显示音乐栏" @click="switchMusicBar"><DArrowRight /></el-icon>
    </el-footer>
  </el-container>
  <!-- 登录框 -->
  <LoginDiaLog :dialog-visible="dialogVisible" />
  <!-- 回到顶部 -->
  <BaseBackTop :right="50" :bottom="110" />
</template>

<style lang="less" scoped>
  .el-container {
    background-color: var(--theme-container-bg-color);
    color: var(--theme-header-font-color);
    // height: 100vw;
    position: relative;
  }
  .el-header, .el-main, .el-footer {
    padding-left: 0;
    padding-right: 0;
  }
  .el-header {
    height: 80px;
    background-color: var(--theme-menu-bg-color);
    color: var(--theme-header-font-color);
  }

  .el-main {
    width: 70%;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 100px;

    .el-card {
      margin-bottom: 30px;
      // background-color: var(--theme-card-bg-color);
      border: 1px solid var(--theme-card-bg-color);
      color: var(--theme-card-font-color-1);
    }
  }

  .el-footer {
    position: fixed;
    z-index: 999;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: rgba(250, 250, 250, 0.95);
    box-shadow: -5px 0 8px 3px #ddd;
    transition: transform ease .8s;

    .icon-left {
      position: absolute;
      top: 50%;
      left: 15%;
      // color: var(--theme-bg-color);
      color: #aaa;
      transform: translateY(-50%);
      font-size: 50px;
      &:hover {
        cursor: pointer;
      }
    }

    .icon-right {
      position: absolute;
      top: 50%;
      right: 15px;
      // color: var(--theme-bg-color);
      color: #aaa;
      transform: translateY(-50%);
      font-size: 50px;
      &:hover {
        cursor: pointer;
      }
    }

    .hidden {
      display: none;
    }
  }

  .hiddle-footer {
    transform: translateX(-96%);
  }
</style>