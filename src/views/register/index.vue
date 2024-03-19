<template>
  <div class="bg-base-300 h-700 py-100">
    <div class="hero  bg-base-200 h-500 ">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left mx-50">
          <h1 class="text-5xl font-bold">Register now!</h1>
          <p class="py-6">还在为本科毕业找工作而苦恼?<br>注册立即享受大学生就业推荐服务,准备好你的简历了吗</p>
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
                <span class="label-text">Password</span>
              </label>
              <input v-model="info.password" placeholder="password(至少八位数)" type="password" class="input input-bordered h-35" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">E-mail</span>
              </label>
              <div class="inline">
              <input v-model="info.email" placeholder="e-mail" class="input input-bordered h-35 w-[190px]" required />
              <button type="button" onclick="my_modal.showModal()" class="btn btn-warning btn-sm ml-11" :disabled='isSendingCode || countdown>0 || info.user_name==="" || info.password==="" || info.email===""'>
                {{ countdown > 0 ? `重新发送(${countdown})` : '发送验证码' }}
              </button>
              </div>
              <div v-if='visible' class='relative top-[3px]'>

              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Verification code</span>
              </label>
              <input  v-model="info.code" placeholder="verification code" class="input input-bordered h-35" required />
              <label class="label">
              </label>
            </div>
            <div class="form-control">
            <button type="button" class="btn btn-primary" @click="register" >Register</button>
            </div>
          </form>
          <dialog id="my_modal" class="modal">
            <div class="modal-box w-[360px]">
              <slide-verify
                id='slide'
                ref = 'block'
                :slider-text = 'text'
                :imgs = 'images'
                @success = '()=>{onSuccess();my_modal.close()}'
                @fail = 'onFail'
              ></slide-verify>
            </div>
            <form method="dialog" class="modal-backdrop">
              <button id='Modaldrop'>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref,reactive } from "vue";
import SlideVerify, { type SlideVerifyInstance } from 'vue3-slide-verify'
import "vue3-slide-verify/dist/style.css";
import { ElNotification } from "element-plus";
import { useRequest } from "vue-hooks-plus";
import { sendEmailCodeAPI, registerAPI } from "@/apis";

const info = ref({
  user_name:"",
  password:"",
  email:"",
  code:null,
  type:1,
})

// 发送验证码按钮参数
const isSendingCode = ref(false);
const countdown = ref(0);

const sendVerificationCode = () => {
  useRequest(() => sendEmailCodeAPI({
    email: info.value.email
  }), {
    onSuccess(res:any){
      console.log(res);
      ElNotification(res.msg);
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

// 拼图参数
const block = ref<SlideVerifyInstance>();
const text = "向右滑动滑块";
const images = reactive([
  'https://t7.baidu.com/it/u=2609096218,1652764947&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=2541348729,1193227634&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=2673836711,2234057813&fm=193&f=GIF',
])

const onSuccess = (time:number) => {
  sendVerificationCode();
  document.getElementById("Modaldrop").click();
  block.value.refresh();
}

const register = () => {
  useRequest(() => registerAPI(info.value as any), {
    onSuccess(res:any){
      console.log(res);
      if(res.code === 200 ) {
        ElNotification.success('注册成功');
      }else{
        ElNotification.error(res.msg)
      }
    },
    onError(e){
      ElNotification.error("注册失败" + e)
    }
  })
}
</script>