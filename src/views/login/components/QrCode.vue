<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { loginQrKeyApi, createQrApi } from '@/api/login'

  onMounted(async () => {
    const { data: { unikey } } = await loginQrKeyApi();
    // console.log('二维码的key', unikey);
    const { data: { qrimg } } = await createQrApi(unikey);
    console.log('二维码base64图片地址', qrimg);
    qrUrl.value = qrimg;
  });

  let qrUrl = ref();

</script>

<template>
  <div>qr</div>
  <el-image style="width:100px; height:100px" :src="qrUrl" fit="contain" />
</template>

<style scoped>

</style>