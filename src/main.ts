import { createApp } from 'vue';
import App from "./App.vue";
import router from './router';
import "tailwindcss/tailwind.css";
import ElementPlus from 'element-plus'
import { themeChange } from 'theme-change';
import pinia from './stores/createPinia';
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
themeChange();
app.use(pinia)
app.use(router)

app.mount('#app')
