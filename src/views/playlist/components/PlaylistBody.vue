<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import type { PropType } from 'vue';
  import PlaylistItem from '@/components/playlistItem/PlaylistItem.vue';

  const props = defineProps({
    playLists: Array as PropType<any[]>
  });
</script>

<template>
  <div class="playlists">
    <div class="playlists-item" v-for="item in playLists" :key="item"> 
      <PlaylistItem 
        :id="item.id"
        :url="item.coverImgUrl" 
        :name="item.name" 
        :play-count="item.playCount" 
        :creator-name="item.creator.nickname"
        :creator-url="item.creator.avatarUrl"
        :user-id="item.creator.userId"
        :create-time="item.createTime"
        :signature="item.creator.signature"
        :tags="item.tags"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .playlists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0;

    &-item {
      flex: 15%;
      margin: 0 calc(10% / 5) 30px 0;
    }
    
    &-item:nth-child(6n) {
      margin-right: 0;
    }
  }
</style>