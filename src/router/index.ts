import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AboutView',
      component: AboutView
    },
  ]
})

export default router
