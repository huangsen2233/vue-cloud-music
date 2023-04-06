<script setup lang="ts">
  import { ref } from "vue";
  import Account from "./components/Account.vue";
  import Phone from "./components/Phone.vue";
  import QrCode from "./components/QrCode.vue";
  import { useRouter } from "vue-router";
  import type { TabPaneName } from 'element-plus';

  const router = useRouter();
  const activeTabName = ref('account');
  const qrCodeRef = ref<InstanceType<typeof QrCode>>();
  
  // tab页的change事件
  const handleTabChange = (tabName: TabPaneName) => {
    if (tabName === 'qr_code') {
      qrCodeRef.value?.createQr();
    }
  }

  // 关闭登录
  const closeLogin = () => {
    router.push('/home');
  }

</script>

<template>
  <el-tabs v-model="activeTabName" stretch @tab-change="handleTabChange">
    <el-tab-pane name="account">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><UserFilled /></el-icon>
          <span style="padding-left: 5px;">账号登录</span>
        </span>
      </template>
      <template #default>
        <Account />
      </template>
    </el-tab-pane>
    <el-tab-pane name="phone">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><PhoneFilled /></el-icon>
          <span style="padding-left: 5px;">手机登录</span>
        </span>
      </template>
      <template #default>
        <Phone />
      </template>
    </el-tab-pane>
    <el-tab-pane name="qr_code">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Grid /></el-icon>
          <span style="padding-left: 5px;">二维码登录</span>
        </span>
      </template>
      <template #default>
        <QrCode ref="qrCodeRef" />
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="less" scoped>
  .card {
    // position: absolute;
    // top: 40%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    // width: 30%;
    // height: 40%;
    font-size: 18px;

    .title {
      font-size: 40px;
      line-height: 1;
      text-align: center;
      padding-bottom: 30px;
      // background: linear-gradient(to right, rgba(240,216,6,0.8), rgba(186,255,124), rgba(109,255,176));
      background: linear-gradient(to right, #fe214f, #e90378, #fcab01);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: move 2.5s infinite linear;

      .close {
        position: absolute;
        top: 5px;
        right: 5px;
        color: rgba(0,0,0,0.6);
        font-size: 22px;
        cursor: pointer;
      }
      .close:hover {
        color: #e90378;
      }
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
  }

  :deep(.el-tabs__content) {
    padding: 20px;
  }
</style>