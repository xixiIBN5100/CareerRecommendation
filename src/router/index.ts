import { createRouter, createWebHistory } from "vue-router";
import {FindPassword, Home, Login, Register} from "@/views";

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
      path: "/home",
      name: "home",
      component: Home
    },
  ]
});

export default router;
