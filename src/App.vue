<script setup lang="ts">
  import { onMounted } from 'vue';

  onMounted(() => {
    // 修改element-plus主题色
    // 230,0,38 - 图标的红色
    // document.body.style.setProperty('--el-color-primary', 'rgba(230,0,38)');
    // document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
    // document.body.style.setProperty('--el-color-primary-light-3', '#95d475');
  })
</script>

<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition>
        <!-- 
          原因：:is="Component"属性会使所有的组件都渲染在这里，而外层是 transition 虚拟组件，也就是说所有组件都会包裹在它里面，这是不允许的 
          解决：把组件都包裹成单root节点，加一个div标签，把Component包裹一下
        -->
        <div>
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
