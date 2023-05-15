import { defineStore } from "pinia";
import type { IVideo } from "./type";
import { getMvUrlApi, getVideoUrlApi } from "@/api/video";

export const useVideoStore = defineStore('video', {
  persist: {
    enabled: true
  },
  state: (): IVideo => ({
    videoUrl: '',
    isMv: true
  }),
  actions: {
    // 获取MV的url
    async getMvUrl (id: number) {
      this.isMv = true;
      const result: any = await getMvUrlApi(id);
      // console.log("🚀 ~ file: music.ts:14 ~ getSongUrl ~ result: MV的url", result)
      this.videoUrl = result.data.url;
    },

    // 获取视频的url
    async getVideoUrl (id: string) {
      this.isMv = false;
      const result: any = await getVideoUrlApi(id);
      // console.log("🚀 ~ file: music.ts:14 ~ getSongUrl ~ result: 视频的url", result)
      this.videoUrl = result.urls[0].url; 
    }
  }
});