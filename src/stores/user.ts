import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      account: {}, // 账号信息
      profile: {}, // 个人信息
    }
  },
  getters: {},
  actions: {}
});

// 页面组件从Store中提取属性同时保持其响应式，需要使用storeToRefs()