import request from '@/utils/request';
import { playlistDetailApi } from "@/api/playlist";

export async function usePlaylistDetail (id: number) {
  const result = await playlistDetailApi({ id });
  console.log("🚀 ~ file: usePlaylistDetail.ts:6 ~ getPlaylistDetail ~ result: 歌单详情", result)
  return result
}