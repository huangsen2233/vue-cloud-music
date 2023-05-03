import { defineStore } from "pinia";
import type { IVideo } from "./type";
import { getMvUrlApi } from "@/api/video";

export const useVideoStore = defineStore('video', {
  persist: {
    enabled: true
  },
  state: (): IVideo => ({
    videoUrl: ''
  }),
  actions: {
    // 获取MV的url
    async getMvUrl (id: number) {
      const result: any = await getMvUrlApi(id);
      console.log("🚀 ~ file: music.ts:14 ~ getSongUrl ~ result: MV的url", result)
      this.videoUrl = result.data.url;
    }
  }
});