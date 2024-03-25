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
  <div class="bg-base-300">
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
          <details>
            <summary>
              主题
            </summary>
            <ul class="p-2 bg-base-100 rounded-t-none">
              <li><a data-set-theme="dark" data-act-class="ACTIVECLASS">黑夜</a></li>
              <li><a data-set-theme="light" data-act-class="ACTIVECLASS">白昼</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>

  <RouterView />
  </div>
</template>