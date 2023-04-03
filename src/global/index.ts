import type { App } from 'vue'
import { registerIcons, registerMessage } from './register-element'

export default function (app: App): void {
  registerIcons(app)
  registerMessage(app)
}
