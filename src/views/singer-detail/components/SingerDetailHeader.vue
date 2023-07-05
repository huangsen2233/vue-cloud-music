<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { storeToRefs } from "pinia";
  import { useUserStore } from "@/stores/user";
  import { followApi, getUserFollowsApi } from "@/api/user";

  const props = defineProps<{
    artist: any
    user: any
    identify: any
    fansCount: number
  }>();

  const { account, followslist } = storeToRefs(useUserStore());

  // 是否关注歌手
  const isFollows = computed(() => {
    const index = followslist.value.findIndex(i => i.userId === props.user?.userId)
    if (index === -1) {
      return false
    } else {
      return true
    }
  });

  const handleFollows = async () => {
    const params = { id: props.user.userId, t: isFollows.value ? 0 : 1 }
    const { code }: any = await followApi(params)
    if (code === 200) {
      getUserFollows()
    }
  };

  // 重新获取用户关注列表
  const getUserFollows = async () => {
    const params = { uid: account.value.id, limit: 100, offset: 0 }
    const { follow }: any = await getUserFollowsApi(params)
    followslist.value = follow
  };
</script>

<template>
  <div class="singer-info">
    <el-image style="width: 400px; height: 250px" :src="artist.avatar" fit="cover" />
    <section class="message">
      <h3 style="margin: 0;">
        <el-tag type="danger" size="large" style="font-size: 20px; padding: 20px; margin-right: 10px;">歌手</el-tag>
        <b>{{ artist.name }}</b> 
      </h3>
      <div v-if="artist.alias?.length > 0">
        <b>别称: </b>
        <span style="padding-left: 5px; font-size: 14px;" v-for="i in artist.alias">{{ i }}</span>
      </div>
      <div v-if="fansCount">
        <b>粉丝数: </b>
        <span>{{ fansCount }}</span>
      </div>
      <div v-if="identify">
        <b style="margin-right: 5px;">简介: </b>
        <span>{{ identify?.imageDesc }}</span>
      </div>
      <div v-if="user.signature">
        <b style="margin-right: 5px;">签名: </b>
        {{ user.signature }}
      </div>
      <template v-if="Object.keys(user).length > 0">
        <el-button :type="isFollows ? 'danger' : 'primary'" size="large" @click="handleFollows">
          <el-icon style="margin-right: 5px;" size="18px">
            <Close v-if="isFollows" />
            <Plus v-else />
          </el-icon>
          {{ isFollows ? '取消关注' : '关注' }}
        </el-button>
      </template>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .singer-info {
    display: flex;

    .message {
      display: flex;
      flex-flow: column;
      align-items: flex-start;
      padding-left: 30px;
      & > div {
        padding: 10px 0;
      }
    }

    .el-button .el-icon {
      font-size: 16px;
    }
  }
</style>