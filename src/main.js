import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import materialKit from "./material-kit";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(createPinia()).use(pinia).use(router).use(materialKit).mount('#app')
