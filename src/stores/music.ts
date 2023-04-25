import { defineStore } from "pinia";
import type { IMusic } from "./type";
import { checkSongApi, getSongUrlApi } from "@/api/music";

export const useMusicStore = defineStore('music', {
  state: (): IMusic => ({
    currentSong: [],
    allSong: [],
    fee: 0  // 0 8是普通用户，1是vip用户
  }),
  actions: {
    // 获取歌曲url
    async getSongUrl (songInfo: any) {
      const result: any = await getSongUrlApi([songInfo.id]);
      console.log("🚀 ~ file: music.ts:14 ~ getSongUrl ~ result: 音乐url", result)
      this.allSong = result.data;
      this.fee = result.data[0].fee;
      if (this.fee === 1) {
        ElNotification({ title: 'Warning', message: `该歌曲为VIP专享, 正在播放 ${songInfo.name} 试听部分`, type: 'warning', duration: 2000});
      } else {
        ElNotification({ title: 'Success', message: `正在播放 ${songInfo.name}`, type: 'success', duration: 2000});
      }
    }
  }
});