<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from "@/router";
</script>

<template>
  <div class="navbar bg-base-100 shadow-lg my-3">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">大学生就业推荐平台</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a @click="router.push('/login')">登录</a></li>
        <li><a @click="router.push('/register')">注册</a></li>
      </ul>
    </div>
  </div>
<!--  <button data-set-theme="dark" data-act-class="ACTIVECLASS" class="btn">dark</button>-->
<!--  <button data-set-theme="light" data-act-class="ACTIVECLASS" class="btn">light</button>-->
  <RouterView />

</template>