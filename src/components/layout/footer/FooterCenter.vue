<script lang="ts" setup>
  import { ref, reactive} from 'vue';

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

  // 改变播放顺序
  const changePlayOrder = (command: PlayOrderType) => {
    // console.log('播放顺序改变', command);
    currentPlayOrder.value = { ...command };
  };

  // 播放上一首
  const playPreviousSong = () => {};

  // 播放下一首
  const playNextSong = () => {};
</script>

<template>
  <div class="audio-center">
    <!-- <audio :src="songData?.[0]?.url" autoplay loop controls></audio> -->

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
      <div class="iconfont icon-24gl-playCircle" title="播放"></div>
      <div class="iconfont icon-xiayigexiayishou" title="下一首" @click="playNextSong"></div>
      <div class="iconfont icon-shengyin" title="调节音量"></div>
    </section>
  </div>
</template>

<style lang="less" scoped>
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

      .icon-24gl-playCircle {
        font-size: 60px;
      }
    }
  }
</style>