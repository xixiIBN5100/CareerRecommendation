<template>
  <div class="bg-base-300 h-screen">
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
  <div class="hero  bg-base-200 h-500 my-100">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left mx-50">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">还在为本科毕业找工作而苦恼?&ensp;登陆立即享受大学生就业推荐服务,准备好你的简历了吗</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Account</span>
            </label>
            <input v-model="info.user_name" placeholder="account" class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input  v-model="info.password" type="password" placeholder="password" class="input input-bordered" required />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">忘记密码?</a>
              <a href="#" class="label-text-alt link link-hover">我是老板</a>
            </label>
          </div>
            <button type="button" class="btn btn-primary" @click="login" >Login</button>
        </form>
      </div>
    </div>
  </div>
  </div>

</template>

<script setup lang="ts">
import router from "@/router";
import {ref} from "vue";
import useRequest from '@/apis/useRequest'
const info = ref(
    {
      user_name: '',
      password: ''
    }
);
const login = () => {
  useRequest({
    data: {user_name: info.value.user_name,password: info.value.password },
    method: "POST",
    url: "/api/login/password",
    manual: false,
    onSuccess(res) {
      if(res.data.code === 200 ){
        console.log(res.data)
      }
    },
    onError(error) {
      console.log(error);
    },
  });

}



</script>
<style scoped>

</style>