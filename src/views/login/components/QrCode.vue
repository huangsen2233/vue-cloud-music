<script setup lang="ts">
  import { ref, inject } from 'vue';
  import { loginQrKeyApi, createQrApi, checkQrApi } from '@/api/login';
  import { getUserAccountApi } from '@/api/user';
  import { useUserStore } from '@/stores/user';
  import localCache from '@/utils/cache';

  const useUser = useUserStore();
  const closeDialog: any = inject('on-login');
  let qrUrl = ref();
  let timer = ref();

  // 生成一个二维码的key
  const createQr = async () => {
    const { data: { unikey } } = await loginQrKeyApi();
    // console.log('二维码的key', unikey);
    const { data: { qrimg } } = await createQrApi(unikey);
    // console.log('二维码base64图片地址', qrimg);
    qrUrl.value = qrimg;
    timer.value = setInterval(() => {
      checkQr(unikey);
    }, 5000)
  }

  // 检查二维码的扫描状态
  const checkQr = async (unikey: string) => {
    const { code, cookie, message } = await checkQrApi(unikey);
    if (code === 803) {
      // console.log('二维码状态成功', code);
      localCache.setCache('user_cookie', cookie);
      // 获取账号信息
      const { code: accountCode, account, profile } = await getUserAccountApi();
      if (accountCode === 200) {
        clearInterval(timer.value);
        // console.log('获取账号信息', accountCode, profile);
        useUser.loginStatus = true;
        useUser.account = account;
        useUser.profile = profile;
        ElMessage({ message, showClose: true, type: 'success' });
        closeDialog();
      }
    }
  };

  defineExpose({ createQr });
</script>

<template>
  <div class="qr">
    <el-image style="width:150px; height:150px" fit="contain" :src="qrUrl"></el-image>
    <h3>请使用 <i class="font">网易云App</i> 扫码登录</h3>
  </div>
</template>

<style lang="less" scoped>
  .qr {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .font {
      color: var(--el-color-primary);
    }
  }
</style>