<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from "@/router";
import useLoginStore from "@/stores/service/loginStore";
import {ElNotification} from "element-plus";

const loginStore = useLoginStore()
const logout = () => {
  router.push('/login')
  loginStore.setLogin(false)
  loginStore.setToken("")
  ElNotification.success("登出成功")
}
</script>

<template>
  <div class="navbar bg-base-100 shadow-lg my-3">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">大学生就业推荐平台</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a @click="router.push('/login')" v-if="loginStore.loginSession === false">登录</a></li>
        <li><a @click="router.push('/register')" v-if="loginStore.loginSession === false">注册</a></li>
        <li><a @click="logout" v-if="loginStore.loginSession === true">注销</a></li>
        <li><a @click="router.push('/register')" v-if="loginStore.loginSession === true">编辑简历</a></li>
        <li><a @click="router.push('/register')" v-if="loginStore.loginSession === true">分析简历</a></li>
      </ul>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">主题</div>
        <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box">
          <li><a data-set-theme="dark" data-act-class="ACTIVECLASS">dark mode</a></li> 
          <li><a data-set-theme="light" data-act-class="ACTIVECLASS">light mode</a></li>
        </ul>
      </div>
    </div>
  </div>
<!--  <button data-set-theme="dark" data-act-class="ACTIVECLASS" class="btn">dark</button>-->
<!--  <button data-set-theme="light" data-act-class="ACTIVECLASS" class="btn">light</button>-->
  <RouterView />

</template>