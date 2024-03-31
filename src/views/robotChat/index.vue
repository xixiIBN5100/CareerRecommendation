<template>
<div class='flex justify-center'>
  <div class='mt-[20px]'>
    <div class="card w-[1040px] bg-base-100 shadow-xl">
      <div class="card-body">
        <div id='msgBox' class="px-4 py-16 w-[1000px] h-[650px] overflow-auto">
          <div v-for='msg in chatMsg'>
            <div v-if='msg.user_name === loginStore.userName' class="chat chat-start">
              <div class="chat-image avatar">
                <div class="w-[50px] rounded-full">
                  <img alt="Tailwind CSS chat bubble component" :src="loginStore.avatarUrl" />
                </div>
              </div>
              <div class="chat-bubble max-w-[500px]">{{msg.content}}</div>
            </div>
            <div v-else class="chat chat-end">
              <div class="chat-image avatar">
                <div class="w-[50px] rounded-full">
                  <img alt="Tailwind CSS chat bubble component" src="C:\Users\31986\Desktop\CareerRecommendation\public\robot.jpg" />
                </div>
              </div>
              <div class="chat-bubble max-w-[500px]">{{msg.content}}</div>
            </div>
          </div>
          <div class='flex justify-center mt-[40px]' v-show='isLoadingMsg === 1'>
            <div>
              <span class="loading loading-dots loading-xs"></span>
              <span class="loading loading-dots loading-sm"></span>
              <span class="loading loading-dots loading-md"></span>
              <span class="loading loading-dots loading-lg"></span>
            </div>
          </div>
        </div>
        <div class='bg-base-100 flex flex-row'>
          <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow w-[900px]" placeholder="发送消息给私聊机器人..." v-model='sendMsg' @keydown="keyDown"/>
            <button class="btn btn-sm btn-accent float-right" @click='send'><el-icon><Top /></el-icon></button>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang='ts'>
import { useMainStore } from '@/stores';
import { onMounted,ref,nextTick } from "vue";

const loginStore = useMainStore().useLoginStore();
const sendMsg = ref("");
const chatMsg = ref();
chatMsg.value = [];

const url = "wss://phlin.top/api/ws/" + loginStore.userName;
let ws = new WebSocket(url);
const isLoadingMsg = ref<number>(0);

onMounted(()=>{
  ws.onopen = () => {
    console.log("打开连接了")
  };
  ws.onmessage =async (msg) => {
    // console.log(msg.data)
    for(let i=0;i<msg.data.length;i++){
      if(msg.data[i] === '{'){
        for(let j=i+1;j<msg.data.length;j++){
          if(msg.data[j] === '}'){
            // console.log(JSON.parse(msg.data.substring(i,j+1)));
            chatMsg.value.push(JSON.parse(msg.data.substring(i,j+1)))
            i = j;
            break;
          }
        }
      }
    }
    await nextTick();
    let card = document.getElementById("msgBox") as any;
    card.scrollTop = card.scrollHeight
  }
})

const send = () => {
  // console.log(sendMsg.value)
  ws.send(sendMsg.value);
  ws.onmessage =async (msg) => {
    // console.log(msg.data);
    chatMsg.value.push(JSON.parse(msg.data));
    isLoadingMsg.value ++;

    await nextTick();
    let card = document.getElementById("msgBox") as any;
    card.scrollTop = card.scrollHeight;
  }
  sendMsg.value = "";
  isLoadingMsg.value = 0;
}

const keyDown = (e: any) => {
  if(e.keyCode == 13){
    send();
  }
}
</script>