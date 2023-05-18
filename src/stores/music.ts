import { defineStore } from "pinia";
import type { IMusic, CurrentSongInfoType } from "./type";
import { checkSongApi, getSongUrlApi } from "@/api/music";

export const useMusicStore = defineStore('music', {
  state: (): IMusic => ({
    currentSongInfo: { songId: 0, songName: 'i want to know you evey', picUrl: '', duration: 0, artists: [] },
    currentSongData: [],
    songList: [],
    fee: 0  // 0 8是普通用户，1是vip用户
  }),
  actions: {
    // 获取歌曲url
    async getSongUrl (songInfo: CurrentSongInfoType) {
      console.log('当前播放歌曲的信息------', songInfo);
      this.currentSongInfo = songInfo;
      const result: any = await getSongUrlApi([songInfo.songId]);
      console.log("🚀 ~ file: music.ts:14 ~ getSongUrl ~ result: 音乐url", result)
      this.currentSongData = result.data;
      this.fee = result.data[0].fee;
      if (!result.data[0].url) {
        return ElNotification({ title: 'Warning', message: `<<${songInfo.songName}>> 暂无音源.`, type: 'warning', duration: 2000});
      } else if (this.fee === 1) {
        ElNotification({ title: 'Warning', message: `该歌曲为VIP专享, 正在播放<<${songInfo.songName}>>试听部分`, type: 'warning', duration: 2000});
      } else {
        ElNotification({ title: 'Success', message: `正在播放<<${songInfo.songName}>>`, type: 'success', duration: 2000});
        this.songList.push(songInfo);
      }
    }
  }
});