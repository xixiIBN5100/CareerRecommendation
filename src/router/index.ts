import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "@/views/AboutView.vue";
import { Login } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AboutView',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

export default router
