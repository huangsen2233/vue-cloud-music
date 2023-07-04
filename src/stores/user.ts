import { defineStore } from "pinia";
import type { IUser } from "./type"

export const useUserStore = defineStore('user', {
  persist: {
    enabled: true
  },
  state: () => {
    return {
      loginStatus: false, // 登录状态
      account: {}, // 账号信息
      profile: {}, // 个人信息
      collectPlaylists: [], // 创建、收藏的歌单
      followslist: [], // 用户的关注列表
    } as IUser
  },
  getters: {},
  actions: {}
});