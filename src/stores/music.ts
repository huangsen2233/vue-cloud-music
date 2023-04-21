import { defineStore } from "pinia";
import type { IMusic } from "./type";
import { checkSongApi, getSongUrlApi } from "@/api/music";

export const useMusicStore = defineStore('music', {
  state: (): IMusic => ({
    currentSong: [],
    allSong: []
  }),
  actions: {
    // 获取歌曲url
    async getSongUrl (songInfo: any) {
      const result = await getSongUrlApi([songInfo.id]);
      if (result.code === 200) {
        // 检查歌曲是否可播放
        const res: any = await checkSongApi(songInfo.id);
        if (!res.success) {
          ElNotification({ title: 'Warning', message: `暂无版权,正在播放 ${songInfo.name} 试听片段`, type: 'warning', duration: 2000 });
        } else {
          this.allSong = result.data;
          ElNotification({ title: 'Success', message: `正在播放 ${songInfo.name}`, type: 'success', duration: 2000});
        }
      }
    }
  }
});