import { createPinia } from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist';

const pinia = createPinia();
pinia.use(piniaPluginPersist); // 持久化pinia的状态

export default pinia;