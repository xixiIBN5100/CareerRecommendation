import { createRouter, createWebHistory } from 'vue-router';
import {FindPassword, Login, Register, resume, Home ,EnterpriseInfo, StudentsList, jobDatabase, ApplyCheckResume, JobRequireMatch, RobotChat} from "@/views";


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

export default router;
