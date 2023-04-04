import type { App } from 'vue'
import { registerIcons, registerMessage } from './register-element'

export function registerFuns (app: App): void {
  registerIcons(app)
  registerMessage(app)
}

