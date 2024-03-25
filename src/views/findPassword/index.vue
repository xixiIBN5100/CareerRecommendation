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
              <div class="inline">
                <input v-model="info.email" placeholder="e-mail" class="input input-bordered w-200 h-35" required />
                <button type="button"  class="btn btn-warning btn-sm ml-10 h-30 w-110" @click='sendCode' :disabled='isSendingCode || countdown > 0'>
                  {{ countdown > 0 ? `重新发送(${countdown})` : '发送验证码' }}
                </button>
              </div>
            </div>
            <div class="form-control">
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
import {emailLoginAPI, findPasswordAPI, sendEmailCodeAPI} from "@/apis";
import {ElNotification} from "element-plus";
const isSendingCode = ref(false);
const countdown = ref(0);
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

const IsEmail = (str: string) => {
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return  reg.test(str);
}

const sendCode = () => {
  if(info.value.email==="") {
    ElNotification.warning("先填写信息");
  } else if(!IsEmail(info.value.email)) {
    ElNotification.warning("请确认邮箱地址格式");
  } else {
    useRequest(() => sendEmailCodeAPI({
      email: info.value.email
    }), {
      onSuccess(res:any){
        console.log(res);
        if(res.code === 200 && res.msg ==="OK") {
          ElNotification.success('发送成功');
        }else{
          ElNotification.error(res.msg)
        }
      },
      onError(e){
        ElNotification.error('发送失败，请重试' + e);
      }
    })

    isSendingCode.value = true;
    countdown.value = 10;

    const countInterval = setInterval(()=>{
      countdown.value--;
      if(countdown.value <= 0){
        clearInterval(countInterval);
        isSendingCode.value = false;
      }
    },1000)
  }
}
</script>

<style scoped>

</style>