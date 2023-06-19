<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { storeToRefs } from "pinia";
  import { transformDuration } from "@/utils/dateFormat";
  import { useMusicStore } from "@/stores/music";

  const { currentSongInfo, lyric, isPlay, currentTime } = storeToRefs(useMusicStore())

  const lyricArr = computed(() => {
    if (lyric.value === '') {
      return []
    }
    const arr = lyric.value.split(/\n/)
    console.log('歌词', arr);
    return arr.map((i: string) => {
      const obj = { time: 0, word: '' }
      obj.time = transformDuration(i.slice(1, 9))
      const index = i.indexOf(']')
      obj.word = i.slice(index + 1)
      console.log('每一句歌词', obj)
      return obj
    })
  });

  // 当前歌词的索引值
  const activeIndex = computed(() => {
    for (let i = 0; i < lyricArr.value.length; i++) {
      if (lyricArr.value[i].time > currentTime.value) {
        return i - 1;
      }
    }
    return 50
  });

  // 歌词变色的时长
  const activeTime = computed(() => {
    const time = lyricArr.value[activeIndex.value + 1]?.time - lyricArr.value[activeIndex.value]?.time
    return time + 's'
  })
</script>

<template>
  <div class="lyric">
    <section class="lyric-left">
      <div class="lyric-left_pic">
        <el-avatar :size="400" :src="currentSongInfo.picUrl" :class="[isPlay ? '' : 'paused-rotate']" />
      </div>
    </section>
    <section class="lyric-right">
      <h1>{{ currentSongInfo.songName }}</h1>
      <template v-for="i, index in lyricArr">
        <div :class="['lyric-right_text', activeIndex === index ? 'active-text' : '']">
          {{ i.word }}
        </div>
      </template>
    </section>
  </div>
</template>

<style lang="less" scoped>
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes scan {
    0% {
      background-size:0 100%;
    }
    100% {
      background-size:100% 100%;
    }
  }

  .paused-rotate {
    animation-play-state: paused !important;
  }

  .lyric {
    display: flex;
    height: 500px;
    margin-bottom: 50px;
    position: relative;

    &-left {
      flex: 40%;
      display: flex;
      justify-content: center;
      align-items: center;

      &_pic {
        .el-avatar {
          animation: rotate 30s linear infinite;
        }
      }
    }

    &-right {
      flex: 60%;
      height: 100%;
      text-align: center;
      overflow-y: auto;

      &_text {
        font-size: 20px;
        letter-spacing: 2px;
        padding: 5px;
        // transition: all v-bind(activeTime);
      }

      .active-text {
        background: #000 linear-gradient(to right, var(--el-color-primary), var(--el-color-primary)) no-repeat 0 0;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 0 100%;
        animation: scan v-bind(activeTime) linear;
      }
    }
  }
</style>