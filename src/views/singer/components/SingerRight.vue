<script lang="ts" setup>
  import { ref } from "vue";
  import ArtistList from "@/components/artistList/ArtistList.vue";
  import type { initialType } from "../type";

  const props = defineProps<{
    showTag: boolean
    tagTitle: string
    artists: any[]
    loading: boolean
  }>();

  const emits = defineEmits<{
    (event: 'switch-initial', params: initialType): void
    (event: 'router-singerdetail', id: number, fansCount?: number): void
  }>();

  const letterList = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '其它'
  ];
  const isActive = ref(999);

  // 歌手的名称首字母改变
  const changeInitial = (letter: string, index?: number) => {
    if (index !== undefined) {
      isActive.value = index;
    }
    let initial: string;
    if (letter === '其它') {
      initial = '0';
    } else if (letter === '热门') {
      initial = '-1';
    } else {
      initial = letter;
    }
    emits('switch-initial', { initial });
  }
</script>

<template>
  <div class="singer-list">
    <section class="header" v-if="showTag">
      <!-- 首字母标签 -->
      <h2>{{ tagTitle }}</h2>
      <div class="letter">
        <el-button type="danger" @click="changeInitial('热门')">
          热门<el-icon style="padding-left: 5px;"><Sunny /></el-icon>
        </el-button>
        <ul>
          <template v-for="i,index in letterList">
            <li :class="[isActive === index ? 'activeColor' : '']" @click="changeInitial(i, index)">{{ i }}</li>
          </template>
        </ul>
      </div>
    </section>
    <section class="body">
      <!-- 歌手列表 -->
      <ArtistList :artists="artists" @router-singerdetail="(id, fansCount) => emits('router-singerdetail', id, fansCount)" />
      <!-- <BasePagination
        v-if="showPagination"
        :total="paginationProp.total"
        :layout="layout"
        :current-page="paginationProp.currentPage"
        :page-size="paginationProp.pageSize"
        :page-sizes="[50, 100, 150, 200]"
        @on-page="changePagination"
        @on-size="changePagination"
      /> -->
    </section>
    <section class="footer">{{ loading ? '正在加载。。。' : '向下滚动获取更多歌手' }}</section>
  </div>
</template>

<style lang="less" scoped>
  .singer-list {
    flex: 1;
    padding: 0 30px 30px;

    .header {
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
    }

    .body {
      .img-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .img-item {
          flex: 15%;
          margin: 20px calc(10% / 5) 30px 0;

          .name {
            display: flex;
            justify-content: space-between;
            align-items: center;

            a:hover {
              cursor: pointer;
              text-decoration: underline;
            }

            .el-avatar {
              cursor: pointer;
            }
          }
        }

        .img-item:nth-child(6n) {
          margin-right: 0;
        }
      }

      .el-pagination {
        margin: 40px 0 30px;
      }
    }

    .footer {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
      text-align: center;
      padding: 20px 0;
      font-size: 20px;
    }
  }
</style>