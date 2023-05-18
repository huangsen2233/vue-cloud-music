<script lang="ts" setup>
  import { ref, reactive, computed} from 'vue';

  type PlayOrderType = {
    order: string
    title: string
  }
  // const props = defineProps<{}>();
  // const emits = defineEmits<{}>();

  const playOrderList = [
    { order: 'icon-shunxubofang', title: '顺序播放' },
    { order: 'icon-suijibofang', title: '随机播放' },
    { order: 'icon-liebiaoxunhuan', title: '列表循环' },
    { order: 'icon-danquxunhuan', title: '单曲循环' }
  ];

  const currentPlayOrder = ref<PlayOrderType>({ order: 'icon-shunxubofang', title: '顺序播放' });

  const volume = ref(15);
  const isMute = ref(false);
  const isPlay = ref(false);

  const mute = computed(() => {
    return volume.value === 0 || isMute.value === true;
  });

  // 改变播放顺序
  const changePlayOrder = (command: PlayOrderType) => {
    // console.log('播放顺序改变', command);
    currentPlayOrder.value = { ...command };
  };

  // 播放上一首
  const playPreviousSong = () => {};

  // 播放下一首
  const playNextSong = () => {};

  // 播放、暂停音乐
  const playSong = () => {
    isPlay.value = !isPlay.value;
  };

  // 静音
  const muteVolume = () => {
    isMute.value = !isMute.value;
  };
</script>

<template>
  <div class="audio-center">
    <section class="icon">
      <el-dropdown trigger="click" @command="changePlayOrder">
        <div :class="['iconfont', currentPlayOrder.order]" :title="currentPlayOrder.title"></div>
        <template #dropdown>
          <el-dropdown-menu>
            <template v-for="i in playOrderList">
              <el-dropdown-item :command="i">
                <div :class="['iconfont', i.order]">
                  <span style="padding-left: 10px;">{{ i.title }}</span>
                </div>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="iconfont icon-shangyige" title="上一首" @click="playPreviousSong"></div>
      <div v-if="isPlay" class="iconfont icon-yinlebofang" title="播放" @click="playSong"></div>
      <div v-else class="iconfont icon-zantingbofang" title="暂停" @click="playSong"></div>
      <div class="iconfont icon-xiayigexiayishou" title="下一首" @click="playNextSong"></div>
      <el-popover popper-class="volume-popover" placement="top" trigger="click">
        <template #reference>
          <div v-if="mute" class="iconfont icon-shengyinguanbi"></div>
          <div v-else  class="iconfont icon-shengyin1"></div>
        </template>
        <template #default>
          <div class="slider-container">
            <span class="volume">{{ volume }}%</span>
            <el-slider v-model="volume" vertical height="200px" :show-tooltip="false" />
            <div v-if="mute" class="iconfont icon-shengyinguanbi" @click="muteVolume"></div>
            <div v-else class="iconfont icon-shengyin1" @click="muteVolume"></div>
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