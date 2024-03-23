import { createRouter, createWebHistory } from 'vue-router'
import {FindPassword, Login, Register, resume, Home ,EnterpriseInfo} from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/findPassword",
      name: "findPassword",
      component: FindPassword
    },
    {
      path: '/resume',
      name: 'resume',
      component: resume
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/enterprise/enterpriseInfo",
      name:"enterpriseInfo",
      component:EnterpriseInfo
    }
  ]
});

export default router;
