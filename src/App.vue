<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from "@/router";
import useLoginStore from "@/stores/service/loginStore";
import { ElNotification } from "element-plus";

const loginStore = useLoginStore()
const logout = () => {
  router.push('/login')
  loginStore.setLogin(false)
  loginStore.setToken("")
  ElNotification.success("登出成功")
}
</script>

<template>
  <div class="bg-base-300 overflow-y-scroll h-screen">
    <div class="navbar bg-base-100 shadow-lg my-3">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">大学生就业推荐平台</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a @click="router.push('/login')" v-show="loginStore.loginSession === false">登录</a></li>
          <li><a @click="router.push('/register')" v-show="loginStore.loginSession === false">注册</a></li>
          <li><a @click="logout" v-show="loginStore.loginSession === true">注销</a></li>
          <li><a @click="router.push('/register')" v-show="loginStore.loginSession === true">编辑简历</a></li>
          <li><a @click="router.push('/register')" v-show="loginStore.loginSession === true">分析简历</a></li>
          <li>
            <label class="flex cursor-pointer gap-2" >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              <input type="checkbox" value="synthwave" class="toggle theme-controller" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"/>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </label>
          </li>
        </ul>
      </div>
      <label for="homeNavbar" class="drawer-button">
        <div class="avatar m-5 cursor-pointer">
          <div class="w-40 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </label>
    </div>
    <RouterView/>
    <div class="drawer drawer-end">
        <input id="homeNavbar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content"></div> 
        <div class="drawer-side">
          <label for="homeNavbar" aria-label="close sidebar" class="drawer-overlay"></label>
          <ul class="menu p-20 w-300 min-h-full bg-base-200 text-base-content z-50">
            <div class="avatar mb-20">
              <div class="w-40 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              <span class="text-2xl mx-10 mt-4">UserName</span>
            </div>
            <div>
              <div class="text-lg font-bold">
                用户设置
              </div>
              <div class="flex flex-col gap-3 ml-6">
                <div>密码修改</div>
                <div>头像修改</div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    
  </div>
</template>