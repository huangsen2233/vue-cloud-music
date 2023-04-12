<script lang="ts" setup>
  import { ref, reactive, inject } from 'vue';

  type letterType = {
    initial: string
  }

  const tagTitle = inject('tagTitle');
  const switchLetterSinger = inject('on-switch-letter') as ({ initial }: letterType) => void;

  const letterList = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '其它'
  ];

  const isActive = ref();

  // 歌手的名称首字母改变
  const changeLetter = (letter: string, index?: number) => {
    isActive.value = index;
    let initial: string;
    if (letter === '其它') {
      initial = '0';
    } else if (letter === '热门') {
      initial = '-1';
    } else {
      initial = letter;
    }
    switchLetterSinger({ initial });
  }

</script>

<template>
  <h2>{{ tagTitle }}</h2>
  <div class="letter">
    <el-button type="danger" @click="changeLetter('热门')">
      热门<el-icon style="padding-left: 5px;"><Sunny /></el-icon>
    </el-button>
    <ul>
      <template v-for="i,index in letterList">
        <li :class="[isActive === index ? 'activeColor' : '']" @click="changeLetter(i, index)">{{ i }}</li>
      </template>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  h2 {
    height: 50px;
    border-bottom: 5px solid var(--el-color-primary);
  }

  .letter {
    display: flex;
    align-items: center;

    ul {
      flex: 1;
      display: flex;
      justify-content: space-around;
      padding-left: 0;

      li {
        list-style: none;
      }

      li:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .activeColor {
    color: var(--el-color-primary);
  }
</style>