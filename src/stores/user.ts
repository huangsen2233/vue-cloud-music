import { defineStore } from "pinia";
import type { IUser } from "./type"

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      loginStatus: false,
      account: {}, // 账号信息
      profile: {}, // 个人信息
      collectPlaylists: [], // 创建、收藏的歌单
    } as IUser
  },
  // 持久化存储数据，即缓存
  persist: {
    enabled: true
  },
  getters: {},
  actions: {}
});