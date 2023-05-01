<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';

  const props = defineProps<{
    activeName: number
    tabslist: any[]
  }>();

  const handleClick = async (id: number) => {

  };
</script>

<template>
  <div class="singer-works">
    <el-tabs :model-value="activeName" class="demo-tabs" @tab-click="handleClick">
      <template v-for="i in tabslist">
        <el-tab-pane :label="i.label" :name="i.name"></el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<style scoped>
  .singer-works {
    padding-top: 30px;
  }
</style>