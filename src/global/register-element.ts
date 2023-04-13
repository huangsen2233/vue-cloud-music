import * as ElementPlusIcons from '@element-plus/icons-vue'
import type { App } from 'vue'
import { ElMessage } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import ElementPlus from 'element-plus';

export function registerIcons (app: App): void {
  Object.keys(ElementPlusIcons).forEach(key => {
    // 通过 typeof 获取 ElementPlusIcons 的类型，然后通过 keyof 操作符获取该类型的所有键
    app.component(key, ElementPlusIcons[key as keyof typeof ElementPlusIcons]);
  })
}

export function registerZh (app: App) {
  app.use(ElementPlus, {
    locale: zhCn,
  })
}

export function registerMessage (app: App): void {
  // app.provide('$message', ElMessage);
  /* app.config.globalProperties.$message = () => {
    return ElMessage({
      showClose: true,
      message: 'Congrats, this is a success message.',
      type: 'success',
    });
  } */
}