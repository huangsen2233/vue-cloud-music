import { defineStore } from "pinia";
import type { IMusic } from "./type";
import { getSongUrlApi } from "@/api/music";

export const useMusicStore = defineStore('music', {
  state: (): IMusic => ({
    // currentSong: [],
    allSong: []
  }),
  actions: {
    async getSongUrl (songInfo: any) {
      const result = await getSongUrlApi([songInfo.id]);
      console.log("🚀 ~ file: SongList.vue:24 ~ handleDbClick ~ result: 音乐url", result);
      if (result.code === 200) {
        this.allSong = result.data;
      }
    }
  }
});