<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from "@/router";
import useLoginStore from "@/stores/service/loginStore";
import {ElNotification} from "element-plus";
import {ref} from "vue";
const checked = ref(false);
const handleClick = () =>{
  checked.value = !checked.value;
  console.log(checked.value)
}
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
            <!-- <details>
              <summary>
                主题
              </summary>
              <ul class="p-2 bg-base-100 rounded-t-none">
                <li><a data-set-theme="dark" data-act-class="ACTIVECLASS">黑夜</a></li>
                <li><a data-set-theme="light" data-act-class="ACTIVECLASS">白昼</a></li>
              </ul>
            </details> -->
            <label class="flex cursor-pointer gap-2" >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              <input type="checkbox" value="synthwave" class="toggle theme-controller" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"/>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </label>
          </li>
        </ul>
      </div>
      <div class="avatar mr-5 cursor-pointer" >
        <label class="w-40 rounded-full cursor-pointer" for="drawer">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </label>
      </div>
    </div>
    <RouterView />
  </div>
  <label class="drawer drawer-end" for="drawer">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <label class="drawer-content">
      <!-- Page content here -->
      <label for="my-drawer-4" class="drawer-button btn btn-primary">Open drawer</label>
    </label>
    <label class="drawer-side">
      <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </label>
  </label>
</template>