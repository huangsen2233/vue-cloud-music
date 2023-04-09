<script lang="ts" setup>
  import { ref, inject, reactive, onBeforeMount } from 'vue';
  // import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/user";
  import { storeToRefs } from "pinia";
  import { searchHotApi } from "@/api/search";
  import type { IHotDetail } from "./type";

  onBeforeMount(async () => {
    const { data } = await searchHotApi();
    hotDetailList.push(...data);
  });

  const useUser = useUserStore();
  // storeToRefs解构数据时不会失去响应式
  const { profile, loginStatus } = storeToRefs(useUser);
  const searchValue = ref();
  let hotDetailList: IHotDetail[] = reactive([]);
  // 打开登录框
  const openLoginDialog: any = inject('on-login');

  // 点击菜单项的command事件
  const handleCommand = () => {

  };
</script>

<template>
  <div class="header-profile">
    <!-- 搜索框 -->
    <el-dropdown trigger="click" max-height="300px" placement="bottom"> 
      <el-input v-model="searchValue" placeholder="请输入歌曲/歌手/视频" size="large">
        <template #prefix>
          <el-icon class="el-input__icon"><Search /></el-icon>
        </template>
      </el-input>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(i,index) in hotDetailList" :key="index">
            {{ i.searchWord }}
            <el-image v-if="i.iconUrl" style="width:20px; height:20px; marginLeft:5px;" :src="i.iconUrl" fit="contain" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 个人信息 -->
    <div v-if="!loginStatus" class="profile">
      <el-icon><Avatar /></el-icon>
      <span class="text" @click="openLoginDialog">请先登录</span>
    </div>
    <div v-else-if="loginStatus" class="profile">
      <el-image :src="profile?.avatarUrl" style="width: 38px; height: 38px; border: 1px solid #fff; border-radius: 50%;" fit="contain" />
      <el-dropdown placement="bottom-start" @command="handleCommand">
        <span class="text">{{ profile?.nickname }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User">个人主页</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .header-profile {
    display: flex;
    font-size: 16px;

    :deep(.el-input__prefix) {
      cursor: pointer;
    }

    .el-input__icon {
      font-size: 20px;
    }

    .profile{
      display: flex;
      align-items: center;
      color: #fff;
      padding-left: 30px;

      .el-icon {
        font-size: 22px;
      }

      .text {
        color: #fff;
        padding-left: 8px;
        white-space: nowrap;
        cursor: pointer;
      }
      
    }
  }
  
  .el-dropdown-menu {
    width: 160px;
  }

</style>