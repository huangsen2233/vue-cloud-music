<script lang="ts" setup>
  import Login from "@/views/login/login.vue";

  const { dialogVisible } = defineProps<{
    dialogVisible: boolean
  }>();
  
</script>

<template>
  <el-dialog :modelValue="dialogVisible" title="登录" width="26%" center>
    <template #header>
      <div class="title">欢迎登录 music!</div>
    </template>
    <Login />
  </el-dialog>
</template>

<style lang="less" scoped>
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