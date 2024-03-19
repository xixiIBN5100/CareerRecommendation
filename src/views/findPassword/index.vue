<template>
  <div class="bg-base-300 h-700 py-100">
    <div class="hero  bg-base-200 h-500 ">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left mx-50">
          <h1 class="text-5xl font-bold">Don't worry!</h1>
          <p class="py-6">忘记密码了吗?&ensp;你可以尝试邮箱登录或者重置密码</p>
        </div>
        <div class="card shrink-0 w-400 max-w-sm shadow-2xl bg-base-100">
          <form class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Account</span>
              </label>
              <input v-model="info.user_name" placeholder="account" class="input input-bordered h-35" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">E-mail</span>
              </label>
              <input  v-model="info.email" type="email" placeholder="email" class="input input-bordered h-35" required /><div class="form-control">
              <label class="label">
                <span class="label-text">Code</span>
              </label>
              <input v-model="info.code" placeholder="account" class="input input-bordered h-35" required />
            </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">New password</span>
                </label>
                <input v-model="info.password" placeholder="New password(至少八位数)" class="input input-bordered h-35" required />
              </div>

              <label class="label">
                <a href="#" class="label-text-alt link link-hover" @click="loginUseEmail">邮箱登录</a>
              </label>
            </div>
            <button type="button" class="btn btn-primary" @click="findPassword" >Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import router from "@/router";
import {ref} from "vue";
import {useRequest} from "vue-hooks-plus";
import {emailLoginAPI, findPasswordAPI} from "@/apis";
import {ElNotification} from "element-plus";

const info = ref({
  user_name: '',
  email: '',
  code: '',
  password: ''
})

const loginUseEmail = () =>{
  router.push('/login')
  localStorage.setItem("way","email")
  console.log(localStorage.getItem("way"))
}

const findPassword = () => {
  useRequest(() => findPasswordAPI({
    user_name: info.value.user_name,
    email: info.value.email,
    code: info.value.code,
    password: info.value.password
  }), {
    onSuccess(res:any){
      console.log(res);
      if(res.code === 200) {
        ElNotification.success('重置密码成功');
      }else{
        ElNotification.error(res.msg)
      }
    },
    onError(e){
      ElNotification.error('重置失败失败，请重试' + e);
    }
  })
}
</script>

<style scoped>

</style>