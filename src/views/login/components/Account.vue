<script setup lang="ts">
  import { ref, reactive, onMounted, inject, nextTick } from "vue";
  import type { ElForm, FormRules } from 'element-plus';
  import { sentCaptchaApi } from '@/api/login'
  
  onMounted(() => {
  });

  const formData = reactive({
    account: '',
    password: '',
    check: false
  });

  const rules = reactive<FormRules>({
    account: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  });
  
  const formRef = ref<InstanceType<typeof ElForm>>();

  // 登录账号
  const loginAccount = async () => {
    await formRef.value?.validate((isValid: boolean) => {
      if (isValid) {
        console.log('登录!');
        // sentCaptchaApi(formData.account);
      } else {
        ElMessage({
          showClose: true,
          message: '请重新输入账号, 密码',
          type: 'error',
        });
        // console.log('xxx', inject('$message'));
        
        // (inject('$message') as any).success("xxxxx");
      }
    })
  };

  // 重置表单
  const resetForm = () => {
    if (!formRef.value) return;
    formRef.value.resetFields();
  };

</script>

<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="80px"
    label-position="right"
    status-icon
  >
    <el-form-item label="账号" prop="account">
      <el-input v-model="formData.account" placeholder="请输入手机号"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password" placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item prop="check" class="form-item-button">
      <el-checkbox size="large" v-model="formData.check" label="记住密码"/>
      <div>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="loginAccount">确定</el-button>
      </div>
      <!-- <el-link type="primary">忘记密码</el-link> -->
    </el-form-item>
    <el-form-item>
    </el-form-item>
  </el-form>
</template>

<style scoped>
  :deep(.el-form-item)  {
    padding: 5px;
  }

  .form-item-button :deep(.el-form-item__content) {
    margin-bottom: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
</style>