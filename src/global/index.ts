import type { App } from 'vue'
import { registerIcons, registerMessage, registerZh } from './register-element'

export function registerFuns (app: App): void {
  registerIcons(app)
  registerMessage(app)
  registerZh(app)
}

