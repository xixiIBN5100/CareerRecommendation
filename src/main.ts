import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "tailwindcss/tailwind.css";
import ElementPlus from 'element-plus'
import { themeChange } from 'theme-change';
import pinia from './stores/createPinia';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
themeChange();
app.use(pinia)
app.use(router)

app.mount('#app')
