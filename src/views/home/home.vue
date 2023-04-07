<script setup lang="ts">
  import { ref, provide, onMounted } from 'vue';
  import { useUserStore } from "@/stores/user";
  import { loginStatusApi, logoutApi } from "@/api/login";
  import Login from "../login/login.vue"
  import Header from "@/components/layout/header/Header.vue";

  onMounted(() => {
    checkUserStatus();
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
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-card>      
        <router-view v-slot="{ Component }">
          <transition>
            <!-- 
              原因：:is="Component"属性会使所有的组件都渲染在这里，而外层是 transition 虚拟组件，也就是说所有组件都会包裹在它里面，这是不允许的 
              解决：把组件都包裹成单root节点，加一个div标签，把Component包裹一下
            -->
            <div>
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </el-card>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
  <el-dialog v-model="dialogVisible" title="登录" width="26%" center>
    <template #header>
      <div class="title">欢迎登录 music!</div>
    </template>
    <Login />
  </el-dialog>
</template>

<style lang="less" scoped>
  .el-header, .el-main, .el-footer {
    padding-left: 0;
    padding-right: 0;
  }
  .el-header {
    height: 80px;
    background: rgba(36,36,36,0.9);
  }

  .el-main {
    width: 80%;
    margin: 0 auto;
  }

  .el-dialog__headerbtn :deep( .el-dialog__close) {
    font-size: 22px;
  }
  .title {
    font-size: 40px;
    line-height: 1;
    text-align: center;
    background: linear-gradient(to right, #fe214f, #e90378, #fcab01);
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: move 2.5s infinite linear;
  }

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    25% {
      background-position: -50% 0;
    }
    50% {
      background-position: -100% 0;
    }
    75% {
      background-position: -150% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  :deep(.el-tabs__content) {
    padding: 20px;
  }
</style>