<template>
  <div class="bg-base-200 shadow-lg mx-100 my-60 p-50 rounded-box hover:shadow-2xl hover:-translate-y-2 transform duration-500">
    <div class="relative mb-60">
      <span class="text-4xl">邮箱重置</span>
      <ul class="steps absolute top-0 right-0 z-0 steps-vertical">
        <li class="step step-primary">验证旧邮箱</li>
        <li class="step" :class="[step >= 2 ? 'step-primary' : undefined]">确认新邮箱</li>
        <li class="step" :class="[step >= 3 ? 'step-primary' : undefined]">完成</li>
      </ul>
    </div>
    <div v-if="step === 1" class="text-xl m-10 flex flex-col gap-36 items-left" style="margin-left: 25%;">
      <div>当前绑定邮箱: <div class="font-bold">{{ loginStore.userEmail }}</div> </div>
      <div>
        <div class="m-6">旧邮箱验证码:</div>
        <div>
          <input placeholder="旧邮箱验证码" class="input input-bordered w-200" required v-model="oldCode"/>
          <button type="button"  class="btn btn-warning btn-sm ml-10 h-40 w-110" @click="() => sendCode(loginStore.userEmail)" :disabled='countdown > 0'>
            {{ countdown > 0 ? `重新发送(${countdown})` : '发送验证码' }}
          </button>
        </div>
      </div>
      <div class="btn btn-primary btn-wide" @click="confirmOldEmail">确认</div>
    </div>
    <div v-if="step === 2" class="text-xl m-10 flex flex-col gap-36 items-left" style="margin-left: 25%;">
      <div>
        <div>
          <div class="m-6">新邮箱:</div>
          <div>
            <input placeholder="新邮箱" class="input input-bordered w-200" required v-model="newEmail"/>
          </div>
        </div>
        <div>
          <div class="m-6">新邮箱验证码:</div>
          <div>
            <input placeholder="新邮箱验证码" class="input input-bordered w-200" required v-model="newCode"/>
            <button type="button"  class="btn btn-warning btn-sm ml-10 h-40 w-110" @click="() => sendCode(newEmail)" :disabled='countdown > 0'>
              {{ countdown > 0 ? `重新发送(${countdown})` : '发送验证码' }}
            </button>
          </div>
        </div>
      </div>
      <div class="btn btn-primary btn-wide" @click="confirmNewEmail">确认</div>
    </div>
    <div v-if="step === 3" class="flex flex-col items-center">
      <div class="text-3xl font-bold">已完成邮箱更改!</div>
      <div class="text-stone-500">当前绑定: {{ loginStore.userEmail }}</div>
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

</script>