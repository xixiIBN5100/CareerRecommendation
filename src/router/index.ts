import { createRouter, createWebHistory } from "vue-router";
import {FindPassword, Login, Register, resume, Home ,EnterpriseInfo, StudentsList, jobDatabase, ApplyCheckResume, JobRequireMatch, RobotChat} from "@/views";

import pinia from "@/stores/createPinia";
import { useMainStore } from "@/stores";

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
      path: "/resume",
      name: "resume",
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
    },
    {
      path: "/jobDatabase",
      name: "jobDatabase",
      component: jobDatabase
    },
    {
      path: "/enterprise/studentsList",
      name: "studentsList",
      component: StudentsList,
    },
    {
      path: "/enterprise/applyCheckResume",
      name: "applyCheckResume",
      component: ApplyCheckResume,
    },
    {
      path: "/enterprise/jobRequireMatch",
      name: "jobRequireMatch",
      component: JobRequireMatch,
    },
    {
      path: "/robotChat",
      name: "robotChat",
      component: RobotChat,
    }
  ]
});

router.beforeEach((to, _, next) => {
  const loginStore = useMainStore(pinia).useLoginStore(pinia);
  if(loginStore.loginSession === false && to.path !== "/login"){
    next("/login");
  } else {
    if(loginStore.userType === 1){ //学生端
      if(to.path === "/enterprise/enterpriseInfo" ||
         to.path === "/enterprise/studentsList" ||
         to.path === "/enterprise/applyCheckResume" ||
         to.path === "/enterprise/jobRequireMatch") {
        next("/home");
      } else {
        next();
      }
    } else if(loginStore.userType === 1){ //企业端
      if(to.path === "/resume" ||
         to.path === "/home" ||
         to.path === "/jobDatabase" ||
         to.path === "/robotChat") {
        next("/home");
      } else {
        next();
      }
    }
  }
});

export default router;
