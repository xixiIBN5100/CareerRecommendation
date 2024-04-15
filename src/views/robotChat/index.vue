<template>
<div class='flex justify-center'>
  <div class='mt-50'>
    <div class="card w-[1040px] bg-base-100 shadow-xl" >
      <div class="card-body " style="height: 80vh">
        <div class="dropdown dropdown-right mt-[-25px]">
          <div class='float-right'>
            <div tabindex="0" role="button" class="btn btn-ghost m-1"><el-icon size='25' class='float-right'><MoreFilled /></el-icon></div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[200px] text-lg">
              <li><a onclick="clearDia.showModal()">清空消息记录</a></li>
              <li><a onclick='findMsg.showModal()'>查找聊天记录</a></li>
            </ul>
          </div>
        </div>
        <div id='msgBox' class="px-4 py-16 w-[1000px] h-[650px] overflow-auto">
          <div v-for='msg in chatMsg'>
            <div :class='isDaohang[chatMsg.indexOf(msg)] ? "transition duration-2000 bg-base-300" : "bg-base-100"'>
              <div class="chat" :class='msg.user_name===loginStore.userName ? "chat-start" : "chat-end"' :id='chatMsg.indexOf(msg)'>
                <div class="chat-image avatar">
                  <div class="w-[50px] h-50 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" :src='msg.user_name===loginStore.userName ? loginStore.avatarUrl : "https://phlin.top/static/780e0913-6e9d-4c65-a776-194f1eb7bca3.jpg"' />
                  </div>
                </div>
                <div class="chat-bubble max-w-[500px]">{{msg.content}}</div>
              </div>
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
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="clearDia" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">警告</h3>
      <p class="py-4 text-base">聊天消息一经删除无法复原</p>
      <p class="py-4">您确定要删除吗？</p>
      <button class="btn btn-sm btn-active btn-accent" @click='clearMsg' onclick="clearDia.close()">确认</button>
      <button class="btn btn-sm btn-warning ml-[15px]" onclick="clearDia.close()">取消</button>
    </div>
  </dialog>
  <dialog id="findMsg" class="modal">
    <div class="modal-box w-[500px]">
      <label class="input input-bordered flex items-center w-[450px]">
        <el-icon><Search /></el-icon>
        <input type="text" class="grow ml-[5px]" placeholder="搜索" v-model='msgFind' @keydown="keyDown2" />
      </label>
      <button class="btn btn-sm mt-[20px] relative left-[400px]" @click='findMsg'>查找</button>
      <div class="divider"></div>
      <div v-for='msg in findedMsg'>
        <div class='flex hover:bg-base-300 cursor-pointer' @click='daohang(chatMsg.indexOf(msg))' onclick='findMsg.close()'>
          <div class="avatar">
            <div class="w-[50px] rounded-full">
              <img :src='msg.user_name==="bot" ? "https://phlin.top/static/780e0913-6e9d-4c65-a776-194f1eb7bca3.jpg" : loginStore.avatarUrl' />
            </div>
          </div>
          <div class='ml-[15px] overflow-y-auto max-h-[100px]'>{{msg.content}}</div>
        </div>
        <div class="divider"></div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</div>
</template>

<script setup lang='ts'>
import { useMainStore } from '@/stores';
import { onMounted,ref,nextTick,watch } from "vue";
import { useRequest } from "vue-hooks-plus";
import { clearMsgApi } from "@/apis";
import { ElNotification } from 'element-plus'

const loginStore = useMainStore().useLoginStore();
const sendMsg = ref<string>("");
const chatMsg = ref([]);
const msgFind = ref<string>("");
const findedMsg = ref([]);
const isDaohang = ref([]);

watch(chatMsg.value,()=>{
  for(let i=0;i<chatMsg.value.length;i++){
    isDaohang.value[i] = false;
  }
})

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

ws.onerror = function(error) {
  ElNotification({
    title: 'Error',
    message: error,
    type: 'error',
  })
};

const keyDown = (e: any) => {
  if(e.keyCode == 13){
    send();
  }
}

const clearMsg = () => {
  useRequest(()=>clearMsgApi(loginStore.token),{
    onSuccess(res){
      if(res.code === 200){
        ElNotification({
          title: 'Success',
          message: "清除成功",
          type: 'success',
        })
      }else{
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning',
        })
      }
    },
    onError(err){
      ElNotification({
        title: 'Error',
        message: err,
        type: 'error',
      })
    }
  })
  chatMsg.value = [];
}

const findMsg = () => {
  // console.log(msgFind.value);
  findedMsg.value = [];
  for(let i=0;i<chatMsg.value.length;i++){
    if(chatMsg.value[i].content.includes(msgFind.value)){
      // console.log(chatMsg.value[i].content);
      findedMsg.value.push(chatMsg.value[i]);
    }
  }
  msgFind.value = "";
}

const daohang = (msgId:string) => {
  // console.log(msgId);
  findedMsg.value = [];
  document.getElementById(msgId).scrollIntoView();
  isDaohang.value[msgId] = true;
  setTimeout(()=>{
    isDaohang.value[msgId] = false;
  },1000);
  findedMsg.value = [];
}

const keyDown2 = (e) => {
  if (!e.shiftKey && e.keyCode == 13) {
   findMsg();
  }
}
</script>