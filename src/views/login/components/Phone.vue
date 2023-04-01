<script setup lang="ts">
  import { ref, reactive, onMounted } from "vue";
  import type { ElForm, FormRules } from 'element-plus'

  const formData = reactive({
    phone: '',
    code: ''
  });

  const rules = reactive<FormRules>({
    account: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  });
  
  const formRef = ref<InstanceType<typeof ElForm>>();
  
  // 获取验证码
  const obtainCode = () => {

  };

  // 手机登录
  const loginPhone = () => {

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
    <el-form-item class="form-item-code" label="验证码" prop="code">
      <el-input v-model="formData.code" placeholder="请输入验证码"/>
      <el-button type="primary" @click="obtainCode">获取验证码</el-button>
    </el-form-item>
    <el-form-item prop="check" class="form-item-button">
      <!-- <el-button @click="resetForm">取消</el-button> -->
      <el-button type="primary" @click="loginPhone">确定</el-button>
    </el-form-item>
    <el-form-item>
    </el-form-item>
  </el-form>
</template>

<style scoped>
  :deep(.el-form-item)  {
    padding: 5px;
  }

  /* .form-item-code {
    :deep(.el-input) {
      width: 40%;
    }

    :deep(.el-button) {
      margin-left: 20px;
    }
  } */

</style>