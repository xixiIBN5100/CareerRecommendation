<template>
<div class='flex justify-center'>
  <div class='mt-[20px]'>
    <div class="mockup-browser border border-black">
      <div class="mockup-browser-toolbar">
        <div class="input border border-black">https://daisyui.com</div>
      </div>
      <div id='msgBox' class="px-4 py-16 border-t border-black w-[1000px] h-[600px] overflow-auto">
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
                <img alt="Tailwind CSS chat bubble component" src="" />
              </div>
            </div>
            <div class="chat-bubble max-w-[500px]">{{msg.content}}</div>
          </div>
        </div>
      </div>
      <div class='bg-base-100 flex flex-row'>
        <textarea class="textarea w-[900px] h-[100px] text-base" placeholder="请输入想要询问的问题" v-model='sendMsg'></textarea>
        <div class='textarea'>
          <button class="btn btn-accent float-right" @click='send'>发送</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang='ts'>
import { useMainStore } from '@/stores';
import { onMounted,ref } from "vue";

const loginStore = useMainStore().useLoginStore();
const sendMsg = ref("");
const chatMsg = ref();
chatMsg.value = [];

const url = "wss://phlin.top/api/ws/" + loginStore.userName;
let ws = new WebSocket(url);

onMounted(()=>{
  ws.onopen = () => {
    console.log("打开连接了")
  };
  ws.onmessage = (msg) => {
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
    // console.log(chatMsg.value)
  }
  let msgBox = document.getElementById("msgBox");
})

const send = () => {
  // console.log(sendMsg.value)
  ws.send(sendMsg.value);
  ws.onmessage = (msg) => {
    // console.log(msg.data);
    chatMsg.value.push(JSON.parse(msg.data));
  }
  sendMsg.value = "";
}
</script>