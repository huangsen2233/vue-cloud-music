import * as ElementPlusIcons from '@element-plus/icons-vue'
import type { App } from 'vue'

function registerIcons (app: App): void {
  Object.keys(ElementPlusIcons).forEach(key => {
    // 通过 typeof 获取 ElementPlusIcons 的类型，然后通过 keyof 操作符获取该类型的所有键
    app.component(key, ElementPlusIcons[key as keyof typeof ElementPlusIcons]);
  })
}

export default registerIcons