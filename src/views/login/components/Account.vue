<script setup lang="ts">
  import { ref, reactive, onMounted } from "vue";
  import type { ElForm, FormRules } from 'element-plus';
  import { loginPhoneApi } from '@/api/login';
  
  onMounted(() => {

  });

  const formData = reactive({
    phone: '19162633497',
    password: 'hs19981027',
    check: false
  });

  const rules = reactive<FormRules>({
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  });
  
  const formRef = ref<InstanceType<typeof ElForm>>();

  // 手机登录
  const loginPhone = async () => {
    await formRef.value?.validate(async (isValid: boolean) => {
      if (isValid) {
        const res = await loginPhoneApi(formData);
        console.log('手机登录接口', res);
      } else {
        ElMessage({
          showClose: true,
          message: '手机号,密码为必填项,请重新输入!',
          type: 'error',
        });
        resetForm();
      }
    })
  };

  // 重置表单
  const resetForm = () => {
    formRef.value?.resetFields();
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
    <el-form-item label="账号" prop="phone">
      <el-input v-model="formData.phone" placeholder="请输入手机号"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password" type="password" showPassword placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item prop="check" class="form-item-button">
      <el-checkbox size="large" v-model="formData.check" label="记住密码"/>
      <div>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="loginPhone">确定</el-button>
      </div>
      <!-- <el-link type="primary">忘记密码</el-link> -->
    </el-form-item>
    <el-form-item>
    </el-form-item>
  </el-form>
</template>

<style scoped>
  .el-form-item {
    padding: 5px;
  }

  .el-form-item:nth-last-child(-n+2) {
    margin: 0;
  }

  .form-item-button :deep(.el-form-item__content) {
    margin-bottom: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
</style>