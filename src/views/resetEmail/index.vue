<template>
  <div class="flex justify-center ">
  <div class="bg-base-200 shadow-lg mx-100 my-100 p-50 rounded-box hover:shadow-2xl hover:-translate-y-2 transform duration-500 w-8/12">
    <div class="relative mb-30">
      <span class="text-4xl">邮箱重置</span>
    </div>
    <div class="flex gap-150 justify-center h-250 items-center">

    <div v-if="step === 1" class="text-xl m-10 flex flex-col gap-36 items-left justify-center " >
      <div>当前绑定邮箱: &ensp;<span class="font-bold">{{ loginStore.userEmail }}</span> </div>
      <div>
        <span>
          <span class="m-6 ">验证码:&ensp;</span>
          <input placeholder="旧邮箱验证码" class="input input-bordered w-200 h-40 mx-auto shadow-lg" required v-model="oldCode"/>
          <button type="button"  class="btn btn-warning btn-sm ml-10 h-40 w-110 shadow-lg" @click="() => sendCode(loginStore.userEmail)" :disabled='countdown > 0'>
            {{ countdown > 0 ? `重新发送(${countdown})` : '发送验证码' }}
          </button>
        </span>
      </div>
      <div class="flex justify-center">
      <div class="btn btn-primary w-full shadow-lg" @click="confirmOldEmail">确认</div>
      </div>
    </div>
    <div v-if="step === 2" class="text-xl m-10 flex flex-col gap-36 items-left justify-center">
      <div class="flex flex-col gap-20">
        <div>
          <span class="m-6">新邮箱:&ensp;</span>
          <span>
            <input placeholder="新邮箱" class="input input-bordered w-200 h-40 shadow-lg" required v-model="newEmail"/>
          </span>
        </div>
        <div>
          <span class="m-6">验证码:&ensp;</span>
          <span>
            <input placeholder="新邮箱验证码" class="input input-bordered w-200 h-40 shadow-lg" required v-model="newCode"/>
            <button type="button"  class="btn btn-warning btn-sm ml-10 h-40 w-110 shadow-lg" @click="() => sendCode(newEmail)" :disabled='countdown > 0'>
              {{ countdown > 0 ? `重新发送(${countdown})` : '发送验证码' }}
            </button>
          </span>
        </div>
      </div>
      <div class="btn btn-primary w-full shadow-lg" @click="confirmNewEmail">确认</div>
    </div>
    <div v-if="step === 3" class="flex flex-col items-center">
      <div class="text-3xl font-bold">已完成邮箱更改!</div>
      <div class="text-stone-500">当前绑定: {{ loginStore.userEmail }}</div>
    </div>
      <div>
        <ul class="steps steps-vertical h-full">
          <li class="step step-primary">验证旧邮箱</li>
          <li class="step" :class="[step >= 2 ? 'step-primary' : undefined]">确认新邮箱</li>
          <li class="step" :class="[step >= 3 ? 'step-primary' : undefined]">完成</li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '@/stores';
import { useRequest } from 'vue-hooks-plus';
import { getNewEmailConfirmAPI, getOldEmailConfirmAPI, sendEmailCodeAPI } from "@/apis";
import { ElNotification } from 'element-plus';

const loginStore = useMainStore().useLoginStore();
const step = ref(1);
const countdown = ref(0);
const oldCode = ref("");
const newEmail = ref("");
const newCode = ref("");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendCode = (email: string) => {
  if(!emailRegex.test(email)) {
    ElNotification("请确认邮箱的有效性");
    return;
  }
  useRequest(() => sendEmailCodeAPI({
    email: email
  }), {
    onSuccess(res: any) {
      if(res.code === 200) {
        ElNotification("验证码发送成功");
      } else {
        ElNotification("验证码发送失败");
      }
    }
  })
  countdown.value = 15;
  const countInterval = setInterval(()=>{
    countdown.value--;
    if(countdown.value <= 0){
      clearInterval(countInterval);
    }
  },1000)
};

const confirmOldEmail = () => {
  useRequest(() => getOldEmailConfirmAPI({
    old_code: oldCode.value
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        step.value = 2;
        ElNotification("验证成功");
      } else {
        ElNotification("验证失败");
      }
    }
  })
}


const confirmNewEmail = () => {
  useRequest(() => getNewEmailConfirmAPI({
    new_email: newEmail.value,
    new_code: newCode.value
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        step.value = 3;
        ElNotification("验证成功");
        loginStore.setUserEmail(newEmail.value);
      } else {
        ElNotification("验证失败");
      }
    }
  })
}
step.value = 1
</script>