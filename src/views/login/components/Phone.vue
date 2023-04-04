<script setup lang="ts">
  import { ref, reactive } from "vue";
  import type { ElForm, FormRules } from 'element-plus'
  import { sentCaptchaApi, verifyCaptchaApi, loginPhoneApi } from '@/api/login'

  const formData = reactive({
    phone: '19162633497',
    captcha: ''
  });

  const rules = reactive<FormRules>({
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  });
  
  const formRef = ref<InstanceType<typeof ElForm>>();
  
  // 获取验证码
  const obtainCode = async () => {
    const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
    if (!reg.test(formData.phone)) {
      ElMessage({
        showClose: true,
        message: '手机号格式输入有误, 请重新输入!',
        type: 'warning',
      });
      resetForm();
    } else {
      await sentCaptchaApi(formData.phone);
    }
  };

  // 手机登录
  const loginPhone = () => {
    formRef.value?.validate(async (isValid: boolean) => {
      if (isValid) {
        const { data } = await verifyCaptchaApi(formData);
        console.log('验证验证码api', data);
        if (data) {
          const res = await loginPhoneApi(formData);
          console.log('手机登陆api', res);
        }
      } else {
        ElMessage({
          showClose: true,
          message: '手机、验证码为必填项, 请重新输入!',
          type: 'error',
        });
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
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="formData.phone" placeholder="请输入手机号"/>
    </el-form-item>
    <el-form-item class="form-item-code" label="验证码" prop="captcha">
      <el-input v-model="formData.captcha" placeholder="请输入验证码"/>
      <el-button type="primary" @click="obtainCode">获取验证码</el-button>
    </el-form-item>
    <el-form-item class="form-item-button" prop="check">
      <el-button type="primary" @click="loginPhone">确定</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
    <el-form-item>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
  :deep(.el-form-item)  {
    padding: 5px;
  }

  .form-item-code :deep(.el-input) {
    width: 40%;
  }

  .form-item-code :deep(.el-button) {
    margin-left: 20px;
  }

  .form-item-button :deep(.el-form-item__content) {
    display: flex;
    flex-direction: row-reverse;

    .el-button {
      margin-left: 12px;
    }
  }

</style>