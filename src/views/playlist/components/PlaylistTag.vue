<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  const { tagsList } = defineProps<{
    tagsList: any
  }>();

  const tag = ref('全部');
</script>

<template>
  <div class="playlist-tag">
    <section>
      <span>{{ tag }}</span>
      <!-- 弹出框-歌单标签 -->
      <el-popover placement="bottom" :width="500" trigger="click" popper-class="elpopover">
        <template #reference>
          <el-button type="primary" plain>
            选择分类<el-icon style="padding-left: 5px;"><ArrowDown /></el-icon>
          </el-button>
        </template>
        <template v-for="(value,key) in tagsList">
          <!-- <component class="icons" :is=""></component> -->
          <div>
            <el-text>{{ key }}</el-text>
            <template v-for="item in tagsList[key]">
              <el-text>{{ item.name }}</el-text>
            </template>
          </div>
        </template>
      </el-popover>
    </section>
    <section>
    </section>
  </div>
</template>

<style scoped>
  .playlist-tag {
    display: flex;
  }
  .elpopover {
    
  }
</style>