<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';

  onMounted(() => {

  });
  const { activeName } = defineProps<{
    activeName: string
  }>();
  const emits = defineEmits<{
    (event: 'tab-click', params?: any): void
  }>();
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="emits('tab-click')">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<style scoped>

</style>