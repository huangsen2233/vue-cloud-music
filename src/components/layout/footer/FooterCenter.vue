<script lang="ts" setup>
  import { ref, reactive, computed} from 'vue';
  import { useMusicStore } from "@/stores/music";
  import { storeToRefs } from "pinia";

  type LoopType = {
    icon: string
    title: string
    type: number
  }
  // const props = defineProps<{}>();
  // const emits = defineEmits<{}>();

  const { play, playPrevious, playNext, changeLoopType, muted, changeVolume } = useMusicStore()
  const { isPlay, volume, isMuted } = storeToRefs(useMusicStore())

  const loopTypeList = [
    { icon: 'icon-shunxubofang', title: '顺序播放', type: 0 },
    { icon: 'icon-suijibofang', title: '随机播放', type: 1 },
    { icon: 'icon-liebiaoxunhuan', title: '列表循环', type: 0 },
    { icon: 'icon-danquxunhuan', title: '单曲循环', type: 2 }
  ];

  // 当前的播放类型
  const currentLoopType = ref<LoopType>({ icon: 'icon-shunxubofang', title: '顺序播放', type: 0 });

  // 改变播放类型
  const handleCommand = (command: LoopType) => {
    currentLoopType.value = { ...command }
    changeLoopType(command.type)
  }
</script>

<template>
  <div class="audio-center">
    <section class="icon">
      <!-- 播放类型 -->
      <el-dropdown trigger="click" @command="handleCommand">
        <div :class="['iconfont', currentLoopType.icon]" :title="currentLoopType.title"></div>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="i in loopTypeList">
              <el-dropdown-item :command="i">
                <div :class="['iconfont', i.icon]">
                  <span style="padding-left: 10px;">{{ i.title }}</span>
                </div>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="iconfont icon-shangyige" title="上一首" @click="playPrevious"></div>
      <div v-if="!isPlay" class="iconfont icon-yinlebofang" title="播放" @click="play"></div>
      <div v-else class="iconfont icon-zantingbofang" title="暂停" @click="play"></div>
      <div class="iconfont icon-xiayigexiayishou" title="下一首" @click="playNext"></div>
      <!-- 调节音量 -->
      <el-popover popper-class="volume-popover" placement="top" trigger="click">
        <template #reference>
          <div v-if="isMuted" class="iconfont icon-shengyinguanbi"></div>
          <div v-else  class="iconfont icon-shengyin1"></div>
        </template>
        <template #default>
          <div class="slider-container">
            <span class="volume">{{ volume }}%</span>
            <el-slider v-model="volume" vertical height="200px" :show-tooltip="false" @change="changeVolume" />
            <div v-if="isMuted" class="iconfont icon-shengyinguanbi" @click="muted"></div>
            <div v-else class="iconfont icon-shengyin1" @click="muted"></div>
          </div>
        </template>
      </el-popover>
    </section>
  </div>
</template>

<style lang="less">
  .audio-center {

    .icon {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .iconfont {
        font-size: 30px;
        padding-right: 20px;
      }
      .iconfont:hover {
        cursor: pointer;
        // color: var(--el-color-primary);
      }

      .icon-yinlebofang, .icon-zantingbofang {
        font-size: 60px;
      }
    }
  }

  .el-popover.volume-popover {
    height: 320px;
    width: 80px !important;
    min-width: 80px;

    .slider-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      .volume {
        font-size: 16px;
      }

      .iconfont {
        font-size: 26px;
      }
      .iconfont:hover {
        color: var(--el-color-primary);
        cursor: pointer;
      }
    }
  }
</style>