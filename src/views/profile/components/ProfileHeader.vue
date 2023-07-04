<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { storeToRefs } from "pinia";
  import { useUserStore } from "@/stores/user";
  import { getAreaByIdCard } from "@/utils/areaByCard";
  import { getUserDetailApi, getUserFollowedsApi, getUserFollowsApi } from "@/api/user";

  onMounted(() => {
    const { id } = account.value 
    getUserDetail(id)
    getUserFolloweds(id)
    getUserFollows(id)
  });

  const { account, profile, followslist } = storeToRefs(useUserStore());
  const userDetail = ref<any>({});
  const fanSize = ref<number>(0); // 粉丝数量

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
</script>

<template>
  <div class="profile-header">
    <section class="profile-header-left">
      <el-image style="width: 250px; height: 250px" :src="profile.avatarUrl" fit="contain" />
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