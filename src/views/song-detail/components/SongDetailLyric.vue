<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { storeToRefs } from "pinia";
  import { ElScrollbar } from 'element-plus';
  import { transformDuration } from "@/utils/dateFormat";
  import { useMusicStore } from "@/stores/music";

  const { currentSongInfo, lyric, isPlay, currentTime } = storeToRefs(useMusicStore());
  const scrollbarRef = ref<InstanceType <typeof ElScrollbar>>()
  const lyricRef = ref<HTMLDivElement>()
  const lyricItemRef = ref<HTMLDivElement[]>()
  const startIndex = ref(4)

  const lyricArr = computed(() => {
    if (lyric.value === '') {
      return []
    }
    const arr = lyric.value.split(/\n/)
    const newArr = arr.map((i: string) => {
      const obj = { time: 0, word: '' }
      obj.time = transformDuration(i.slice(1, 9))
      const index = i.indexOf(']')
      obj.word = i.slice(index + 1)
      return obj
    })
    // 去除空白歌词
    return newArr.filter(j => j.word !== '')
  });

  // 当前歌词的索引值
  const activeIndex = computed(() => {
    for (let i = 0; i < lyricArr.value.length; i++) {
      if (lyricArr.value[i].time > currentTime.value) {
        // 若第一句歌词的时长不为00:00，需要返回索引值0
        return i - 1 > 0 ? i - 1 : 0
      }
    }
    return lyricArr.value.length - 1
  });

  watch(activeIndex, (newIndex, oldIndex) => {
    const l_clientHeight = lyricRef.value!.clientHeight
    const i_offsetTop = lyricItemRef.value && lyricItemRef.value[newIndex].offsetTop
    const i_clientHeight = lyricItemRef.value && lyricItemRef.value[newIndex].clientHeight
    // 第五句歌词的offsetTop为320px，即歌词开始滚动
    if (l_clientHeight - i_offsetTop! < 330) {
      scrollbarRef.value!.setScrollTop(i_clientHeight! * (newIndex - startIndex.value))
    }
  });

  // 当前歌词变色的时长
  const activeTime = computed(() => {
    if (lyricArr.value[activeIndex.value + 1]) {
      const time = lyricArr.value[activeIndex.value + 1].time - lyricArr.value[activeIndex.value].time
      return time + 's'
    } else {
      // 最后一句歌词的变色时长未知
      return '3s'
    }
  });
</script>

<template>
  <div class="lyric">
    <section class="lyric-left">
      <div class="lyric-left_pic">
        <el-avatar :size="400" :src="currentSongInfo.picUrl" :class="[isPlay ? '' : 'paused-rotate']" />
      </div>
    </section>
    <div class="lyric-right" ref="lyricRef">
      <h1>{{ currentSongInfo.songName }}</h1>
      <el-scrollbar ref="scrollbarRef" :height="450">
        <div v-for="i, index in lyricArr" ref="lyricItemRef">
          <span :class="['lyric-right_text', activeIndex === index ? 'active-text' : '', isPlay ? '' : 'paused-rotate']">
            {{ i.word }}
          </span>
        </div>
      </el-scrollbar>
    </div>
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
      background-size: 0 100%;
    }
    100% {
      background-size: 100% 100%;
    }
  }

  .paused-rotate {
    animation-play-state: paused !important;
  }

  .lyric {
    display: flex;
    height: 500px;
    margin-bottom: 80px;
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
        font-size: 18px;
        height: 36px;
        line-height: 36px;
        color: var(--el-text-color-primary);
        letter-spacing: 2px;
        padding: 5px;
        transition: transform 1s;
      }

      .active-text {
        display: inline-block;
        transform: scale(1.2);
        font-weight: bolder;
        background: var(--el-text-color-primary) linear-gradient(to right, var(--el-color-primary), var(--el-color-primary)) no-repeat 0 0;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 0 100%;
        animation: scan v-bind(activeTime) ease 0s;
      }
    }
  }
</style>