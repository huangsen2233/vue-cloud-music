<script lang="ts" setup>
  import { ref, inject, computed, onMounted } from 'vue';
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";
  import type { ElInput } from 'element-plus';
  import { useUserStore } from "@/stores/user";
  import { useMusicStore } from "@/stores/music";
  import { searchSuggestApi } from "@/api/search";
  import { getSongDetailApi } from "@/api/music";
  import { logoutApi } from "@/api/login";
  import localCache from '@/utils/cache';

  // 打开登录框
  const openLoginDialog = inject('on-login') as () => void;
  const router = useRouter();
  const { getSongUrl } = useMusicStore();
  const { profile, loginStatus, account } = storeToRefs(useUserStore());
  const keywords = ref('');
  const visible = ref(false);
  const suggestlist = ref<any>();
  const inputRef = ref<InstanceType<typeof ElInput>>();
  const popoverRef = ref();
  let timer: NodeJS.Timer;
  let theme = ref<string>('string')

  const _title = computed(() => (value: string) => {
    let _value;
    switch (value) {
      case 'songs': _value = '歌曲'; break;
      case 'playlists': _value = '歌单'; break;
      case 'artists': _value = '歌手'; break;
    }
    return _value;
  });

  // 搜索建议
  const searchSuggest = async () => {
    const { result }: any = await searchSuggestApi(keywords.value)
    // console.log("🚀 ~ file: HeaderProfile.vue:36 ~ searchSuggest ~ 搜索建议:", result)
    if (Object.keys(result).length === 0) {
      return false;
    } else {
      result.order = result.order.filter((i: string) => i === 'songs' || i === 'playlists' || i === 'artists')
      suggestlist.value = result
      return true
    }
  };

  // 路由跳转到搜索页
  const routerToSearch = async () => {
    if (keywords.value.trim().length === 0) {
      return ElMessage({ message: '请先输入关键字再搜索!', type: 'warning'});
    }
    visible.value = false
    router.push({ path: '/search', query: { keywords: keywords.value.trim() } })
  };

  // 搜索框的input事件
  const handleInput = () => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      handleFocus()
    }, 500)
  };

  const handleBlur = () => {
    visible.value = false
  };

  const handleFocus = () => {
    if (keywords.value.trim().length > 0) {
      searchSuggest().then((res) => {
        if (res) {
          visible.value = true
        }
      })
    }
  };

  // 点击搜索建议列表
  const clickSuggestlist = async (title: string, title_id: number) => {
    switch (title) {
      case 'songs': 
        const { songs }: any = await getSongDetailApi([title_id])
        const { dt, al, ar, name, id } = songs[0]
        const songInfo = { songId: id, songName: name, picUrl: al.picUrl, duration: dt, artists: ar }
        await getSongUrl(songInfo)
        break;
      case 'playlists':
        router.push({ path: '/playlist-detail', query: { id: title_id } })
        break;
      case 'artists':
        router.push({ path: '/singer-detail', query: { id: title_id } })
        break;
    }
    visible.value = false
  };

  const handleCommand = async (command: string) => {
    if (command === 'profile') {
      router.push({ path: '/profile' })
    } else if (command === 'logout') {
      const { code } = await logoutApi()
      if (code === 200) {
        localCache.deleteCache('user_cookie')
        loginStatus.value = false
        account.value = {}
        profile.value = {}
      }
    } else if (command === 'theme') {
      const el = document.querySelector('html')
      theme.value = el!.getAttribute('class') as string
      if (el!.getAttribute('class') === 'dark') {
        el!.className = 'light'
      } else {
        el!.className = 'dark'
      }
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
          placeholder="请输入歌曲/歌手/歌单" 
          size="large"
          @keyup.enter.native="routerToSearch"
          @focus="handleFocus" 
          @input="handleInput"
          @blur="handleBlur">
          <template #prepend><el-button icon="Search" @click="routerToSearch" /></template>
        </el-input>
      </template>
      <div class="suggest">
        <template v-for="title in suggestlist?.order">
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
      <el-icon color="#fff" size="20px"><Avatar /></el-icon>
      <span class="text" @click="openLoginDialog">请先登录</span>
    </div>
    <div v-else-if="loginStatus" class="profile">
      <el-image :src="profile?.avatarUrl" style="width: 38px; height: 38px; border: 1px solid #fff; border-radius: 50%;" fit="contain" />
      <el-dropdown placement="bottom-start" trigger="click" @command="handleCommand">
        <span class="text">{{ profile?.nickname }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="User" command="profile">个人主页</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
            <!-- <el-dropdown-item :icon="theme === 'dark' ? 'Moon' : 'Sunny'" command="theme">{{ theme === 'dark' ? '黑色主题' : '白色主题' }}</el-dropdown-item> -->
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
      padding-left: 30px;

      .text {
        color: var(--theme-header-font-color);
        padding-left: 6px;
        white-space: nowrap;
        cursor: pointer;
      }
      .text:hover {
        color: var(--theme-header-font-hover-color);
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