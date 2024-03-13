import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import "tailwindcss/tailwind.css";
import { themeChange } from 'theme-change';

const app = createApp(App)
themeChange();
app.use(createPinia())
app.use(router)

app.mount('#app')
