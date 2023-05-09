<script lang="ts" setup>
  import type { MvsType } from "../type";
  import { count } from "@/utils/count";

  const props = defineProps<{
    mvs: MvsType[]
  }>();

  const emits = defineEmits<{
    (event: 'router-video', mvid: number): void;
    (event: 'router-singer-detail', id: number): void;
  }>();
</script>

<template>
  <div class="mvs">
    <section class="mvs-title">
      <h2>最新MV</h2>
    </section>
    <section class="mvs-content">
      <div class="mv">
        <section class="mv-item" v-for="i in mvs">
          <el-image style="width: 300px; height: 180px; border-radius: 20px;" :src="i.cover" fit="cover" @click="emits('router-video', i.id)" />
          <div class="playcount">
            <div>
              <el-icon><VideoCamera /></el-icon>
              <span style="padding-left: 5px;">{{ count(i.playCount) }}</span>
            </div>
          </div>
          <div class="playicon" @click="emits('router-video', i.id)">
            <el-icon><VideoPlay /></el-icon>
          </div>
          <div>{{ i.name }}</div>
          <div class="author">
            by <a @click="emits('router-singer-detail', i.artists[0].id)">{{ i.artists[0].name }}</a>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
  .mvs {
    width: 100%;

    &-title {
      border-bottom: 5px solid var(--el-color-primary);
      margin: 20px 0;
    }

    &-content {
      display: flex; 
      flex-wrap: wrap;

      .mv {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &-item {
          position: relative;
          width: 300px;
          margin: 0 20px 20px 0;

          .el-image {
            position: relative;
          }

          .el-image:hover ~ .playicon {
            opacity: 1;
            z-index: 1;
          }

          .playicon {
            box-sizing: border-box;
            position: absolute;
            z-index: -1;
            top: 0;
            height: 180px;
            width: 300px;
            border-radius: 20px;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
              opacity: 1;
              z-index: 1;
            }

            .el-icon {
              font-size: 80px;
              color: #fff;
            }
          }

          .playcount {
            box-sizing: border-box;
            position: absolute;
            top: 150px;
            right: 0px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            border-radius: 0 0 20px 20px;
            padding: 0 20px;
            background: rgba(54,48,51,0.4);
            color: #fff;

            & > div {
              display: flex;
              justify-content: flex-end;
              align-items: center;
            }
          }

          .author {
            color: #aaa;
            font-size: 14px;
            padding-top: 5px;

            & > a {
              color: #000;
            }
          }
          .author:hover a {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>