<script lang="ts" setup>
  import { ref, inject, computed } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/user";
  import { useMusicStore } from "@/stores/music"
  import { searchSuggestApi } from "@/api/search";
  import { getSongDetailApi } from "@/api/music";
  import type { ElInput } from 'element-plus';

  // 打开登录框
  const openLoginDialog = inject('on-login') as () => void;
  const router = useRouter();
  const { getSongUrl } = useMusicStore();
  const { profile, loginStatus } = storeToRefs(useUserStore());
  const keywords = ref('');
  const visible = ref(false);
  let timer: NodeJS.Timer;
  const suggestlist = ref<any>();
  const inputRef = ref<InstanceType<typeof ElInput>>()
  const popoverRef = ref()

  const _title = computed(() => (value: string) => {
    let _value;
    switch (value) {
      case 'songs': _value = '歌曲'; break;
      case 'playlists': _value = '歌单'; break;
    }
    return _value;
  })

  // 搜索建议
  const searchSuggest = async () => {
    const { result }: any = await searchSuggestApi(keywords.value)
    // console.log("🚀 ~ file: HeaderProfile.vue:36 ~ searchSuggest ~ 搜索建议:", result)
    if (!result) return;
    result.order = result.order.filter((i: string) => i !== 'albums' && i !== 'artists')
    suggestlist.value = result
  }

  // 路由跳转到搜索页
  const routerToSearch = async () => {
    if (keywords.value.length === 0) {
      return ElMessage({ message: '请先输入关键字再搜索!', type: 'warning'});
    }
    visible.value = false
    router.push({ path: '/search', query: { keywords: keywords.value.trim() } })
  };

  // 搜索框的input事件
  const handleInput = () => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      searchSuggest().then(() => {
        visible.value = true
      })
    }, 500)
  };

  /**
   * force、blur的bug问题
   */
  const handleBlur = () => {
    // visible.value = false
  };

  const handleFocus = () => {
    if (keywords.value.length > 0) {
      searchSuggest().then(() => {
        visible.value = true
      })
    }
  };

  // 点击搜索建议列表
  const clickSuggestlist = async (title: string, title_id: number) => {
    if (title === 'songs') {
      const { songs }: any = await getSongDetailApi([title_id])
      const { dt, al, ar, name, id } = songs[0]
      const songInfo = { songId: id, songName: name, picUrl: al.picUrl, duration: dt, artists: ar };
      await getSongUrl(songInfo)
    } else if (title === 'playlists') {
      router.push({ path: '/playlist-detail', query: { id: title_id } });
    }
    visible.value = false;
  };

  const handleCommand = (command: string) => {
    console.log('handleCommand', command);
    if (command === 'profile') {
      /**
       * 个人主页
       */
      router.push({ path: '/playlist-detail' });
    }
  };
</script>

<template>
  <div class="header-profile">
    <!-- 搜索建议弹框 -->
    <el-popover ref="popoverRef" :visible="visible" placement="bottom-start" :width="300">
      <template #reference>
        <el-input
          ref="inputRef"
          v-model="keywords"
          placeholder="请输入歌曲/歌手/视频" 
          size="large" 
          @keyup.enter.native="routerToSearch"
          @focus="handleFocus" 
          @input="handleInput"
          @blur="handleBlur">
          <template #prepend><el-button icon="Search" @click="routerToSearch" /></template>
        </el-input>
      </template>
      <div class="suggest" v-if="visible">
        <template v-for="title in suggestlist.order">
          <section class="suggest-item">
            <b class="suggest-item_title">{{ _title(title) }}</b>
            <div class="suggest-item_content">
              <section v-for="{ id, name, artists } in suggestlist[title]" @click="clickSuggestlist(title, id)">
                <span>{{ name }}</span>
                <span v-if="artists">- {{ artists[0].name }}</span>
              </section>
            </div>
          </section>
        </template>
      </div>
    </el-popover>
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
            <el-dropdown-item icon="User" command="profile">个人主页</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
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


  .suggest {
    .suggest-item {

      &_title {
        font-size: 16px;
      }

      &_content section {
        padding: 5px 0;

        &:hover {
          color: var(--el-color-primary);
          background-color: var(--el-color-primary-light-9);
          cursor: pointer;
        }
      }
    }
    .suggest-item:not(:last-child) {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
  }

</style>