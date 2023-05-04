<script setup lang="ts">
  import { ref, provide, onMounted } from 'vue';
  import { useUserStore } from "@/stores/user";
  import { loginStatusApi, logoutApi } from "@/api/login";
  import Login from "../login/login.vue"
  import Header from "@/components/layout/header/Header.vue";
  import Footer from "@/components/layout/footer/Footer.vue";
  import LoginDiaLog from "@/components/dialog/LoginDiaLog.vue";
  import BaseBackTop from "@/components/common/BaseBackTop.vue";
  
  onMounted(() => {
    !useUser.loginStatus && checkUserStatus();
  })

  const useUser = useUserStore();

  const dialogVisible = ref(false);

  // 登录框的展示、隐藏
  const changeDialogVisible = () => {
    dialogVisible.value = !dialogVisible.value;
  }

  // 检查登录状态
  const checkUserStatus = async () => {
    const { data: { code, account, profile } } = await loginStatusApi();
    if (code === 200) {
      useUser.loginStatus = true;
      useUser.account = account;
      useUser.profile = profile;
    }
  };

  provide('on-login', changeDialogVisible);
</script>

<template>
  <el-container>
    <!-- 导航区 -->
    <el-header>
      <Header />
    </el-header>
    <!-- 路由页面 -->
    <el-main>
      <el-card>      
        <router-view v-slot="{ Component }">
          <transition>
            <!-- 
              原因：:is="Component"属性会使所有的组件都渲染在这里，而外层是 transition 虚拟组件，也就是说所有组件都会包裹在它里面，这是不允许的 
              解决：把组件都包裹成单root节点，加一个div标签，把Component包裹一下

              原因：缓存组件后，切换路由组件不会重新渲染
              解决：exclude排除动态路由组件或者在router-view上使用:key="$route.fullPath"
            -->
            <div>
              <keep-alive>
                <component :key="$route.fullPath" :is="Component" v-if="$route.meta.keepAlive" />
              </keep-alive>
              <component :key="$route.fullPath" :is="Component" v-if="!$route.meta.keepAlive"></component>
            </div>
          </transition>
        </router-view>
      </el-card>
    </el-main>
    <!-- 音乐栏 -->
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
  <!-- 登录框 -->
  <LoginDiaLog :dialog-visible="dialogVisible" />
  <!-- 回到顶部 -->
  <BaseBackTop :right="30" />
</template>

<style lang="less" scoped>
  .el-container {
    background-color: rgba(245,245,245);
    position: relative;
  }
  .el-header, .el-main, .el-footer {
    padding-left: 0;
    padding-right: 0;
  }
  .el-header {
    height: 80px;
    background: rgba(36,36,36,0.9);
  }

  .el-main {
    width: 70%;
    margin: 0 auto;
  }

  .el-footer {
    position: fixed;
    z-index: 999;
    bottom: -90px;
    width: 100%;
    height: 100px;
    background: #ccc;
    transition: all 0.5s;
  }

  .el-footer:hover {
    bottom: 0;
  }
</style>