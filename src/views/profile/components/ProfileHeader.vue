<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import fs from 'fs'
  import path from 'path'
  import { storeToRefs } from "pinia";
  import { useUserStore } from "@/stores/user";
  import { getAreaByIdCard } from "@/utils/areaByCard";
  import cache from '@/utils/cache';
  import { getUserDetailApi, getUserFollowedsApi, getUserFollowsApi, uploadAavatarApi } from "@/api/user";

  onMounted(() => {
    const { id } = account.value 
    getUserDetail(id)
    getUserFolloweds(id)
    getUserFollows(id)
  });

  // const fs = import ('fs')
  // const path = require('path')
  const { account, profile, followslist, loginStatus } = storeToRefs(useUserStore());
  const avatarUrl = ref<string>();
  const formData = ref<FormData>();
  // const params = ref({
  //   imgFile: {
  //     name: '',
  //     data: '',
  //   },
  // })
  const userDetail = ref<any>({});
  const fanSize = ref<number>(0); // 粉丝数量
  const inputRef = ref<HTMLInputElement>();

  // 获取用户详情
  const getUserDetail = async (id: number) => {
    const result = await getUserDetailApi(id)
    userDetail.value = result
    // console.log('用户详情', result)
  };

  // 获取用户粉丝列表
  const getUserFolloweds = async (id: number) => {
    const { size }: any = await getUserFollowedsApi({ uid: id })
    fanSize.value = size
  };

  // 获取用户关注列表
  const getUserFollows = async (id: number) => {
    const params = { uid: id, limit: 100, offset: 0 }
    const { follow }: any = await getUserFollowsApi(params)
    followslist.value = follow
  };

  // 更换头像
  const handleClick = () => {
    if (!loginStatus.value) {
      return ElMessage.warning('请先登录!')
    }
    inputRef.value && inputRef.value.click()
  }

  const uploadFile = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    const file = target?.files?.[0]
    console.log('file', file);
    formData.value = new FormData()
    formData.value.append('imgFile', file!)
    const reader: FileReader = new FileReader()
    if (file) {
      reader.onload = (e) => {
        avatarUrl.value = e.target?.result as string
        // params.value.imgFile.name = file?.name
        // params.value.imgFile.data = e.target?.result as string
        
        // // canvas处理后的图片比例不正确
        // const img = new Image();
        // img.src = e.target?.result as string
        // img.onload = () => {
        //   const canvas = document.createElement('canvas');
        //   const ctx = canvas.getContext('2d');
        //   // 设置目标尺寸
        //   canvas.width = 250; // 目标宽度
        //   canvas.height = 250; // 目标高度
        //   ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        //   avatarUrl.value = canvas.toDataURL('image/jpeg');
        // }
      }
      reader.readAsDataURL(file)
    }
  }

  // 保存头像
  const saveAavatar = async () => {
    if (!avatarUrl.value) return ElMessage.warning('请先选择头像!')
    // const cookie = cache.getCache('user_cookie')
    const params = {
      // cookie, 
      formData: formData.value
    }
    // statusCode：500 ???
    const res = await uploadAavatarApi(params)
    console.log('res', res);
  }
</script>

<template>
  <div class="profile-header">
    <section class="profile-header-left">
      <el-avatar :size="250" :src="avatarUrl || profile.avatarUrl" fit="scale-down" />
      <el-button class="change-btn" @click="handleClick">上传头像</el-button>
      <el-button class="save-btn" @click="saveAavatar">保存头像</el-button>
      <input class="ipt" ref="inputRef" type="file" accept="image/jpeg,image/png,image/jpg" @change="uploadFile" />
    </section>
    <section class="profile-header-right">
      <div class="nickname">
        <span>{{ profile.nickname }}</span>
        <el-icon v-if="profile.gender === 1" color="#3559F1" size="24px"><Female /></el-icon>
        <el-icon v-else-if="profile.gender === 2" color="#F34486" size="24px"><Male /></el-icon>
      </div>
      <div class="signature">签名：{{ profile.signature || '暂无签名' }} </div>
      <div class="size">
        <span>粉丝: {{ userDetail.profile?.followeds }}</span>
        <span>关注：{{ userDetail.profile?.follows }}</span>
      </div>
      <div>所在地区: {{ getAreaByIdCard(profile.city) }}</div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .profile-header {
    display: flex;

    &-left {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      row-gap: 10px;
      .el-avatar {
        grid-column: 1 / 3;
      }
      .change-btn {
        width: 100px;
      }

      .save-btn {
        width: 100px;
        margin-left: 0;
      }
    }

    .ipt {
      display: none;
    }

    &-right {
      flex: 1;
      font-size: 18px;
      padding-left: 50px;

      & > div {
        margin-bottom: 20px;
        padding-bottom: 10px;
      }

      .nickname {
        font: bold 36px/1 arial,verdana;
        border-bottom: 1px solid #ccc;

        & > span {
          padding-right: 20px;
        }
      }

      .size span:first-child {
        padding-right: 30px;
      }
    }
  }
</style>