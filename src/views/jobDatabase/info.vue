<template>
  <div class="flex justify-center gap-30 my-80 items-center">
    <div class="bg-base-200 w-600  card p-30 shadow-lg ">
      <div class="card-title text-2xl">{{ modalJobData.title }}</div>
      <div class="flex flex-col gap-10 mt-15">
        <div class="m-3">
          <span class="font-bold text-xl">公司名称:</span>
          <span class="float-right text-lg">{{ modalJobData.company }}</span>
        </div>
        <div class="m-3">
          <span class="font-bold text-xl">薪资条件:</span>
          <span class="float-right text-lg">{{ modalJobData.salary }}</span>
        </div>
        <div class="m-3">
          <span class="font-bold text-xl">学历要求:</span>
          <span class="float-right text-lg">{{ modalJobData.education }}</span>
        </div>
        <div class="m-3">
          <span class="font-bold text-xl">联系人:</span>
          <span class="float-right text-lg">{{ modalJobData.hiring_manager }}</span>
        </div>
        <div class="m-3">
          <span class="font-bold text-xl">地址:</span>
          <span class="float-right text-lg">{{ modalJobData.address }}</span>
        </div>
      </div>
      <div class="m-3 my-10">
        <span class="font-bold text-xl ">技能要求:</span>
        <span class="float-right text-xs p-6 mt-4">{{ modalJobData.description }}</span>
      </div>
      <div class="m-3 ">
        <a class="btn-link font-bold mt-6" :href="modalJobData.link">详情链接</a>
        <div class='float-right relative'>
          <div :class='isClickUpvote ? "animate-ping absolute top-[-25px]" : "hidden"'>+1</div>
          <el-icon class='cursor-pointer' @click='upvote'><Medal /></el-icon>
          <span class='select-none'>{{ modalJobData.upvote }}</span>
        </div>
      </div>
      <div class="btn shadow-lg bg-base-100 mt-10" @click="router.push('/jobDatabase')">返回岗位库</div>
    </div>
    <div class="divider divider-horizontal "></div>
    <div class="bg-base-200 w-500 h-500 card p-30 shadow-lg flex flex-col">
    <div class='flex'>
      <div class="card-title">评论</div>
      <div>{{ modalJobData.comment_num }}</div>
    </div>
    <ul class="menu bg-base-200  rounded-box">
      <div v-for="item in commentList" :key="item.id">
        <div class="divider my-3"></div>
        <li><a><span class="text-xl">{{item.user_name}}</span>: &ensp;{{item.content}}</a></li>
      </div>
      <div class="divider my-6 "></div>
    </ul>
      <div class="flex justify-center mt-auto" >
        <div class="join bg-base-300">
          <button class="join-item btn" @click="() => switchPageNum(-1)">«</button>
          <button class="join-item btn">
            page
            <input class="input input-sm input-ghost w-100" v-model="pageNum">
          </button>
          <button class="join-item btn" @click="() => switchPageNum(1)">»</button>
        </div>
      </div>
    <div class="flex justify-between mt-20">
      <input class="input input-bordered w-9/12 shadow-lg" v-model="comment" @keyup.enter="setComment"/>
      <button class="btn shadow-lg bg-base-100" @click="setComment" ><span>发布评论</span></button>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useRequest} from "vue-hooks-plus";
import {getCommentAPI, getInfoAPI, setCommentAPI, upvoteJobAPI, } from "@/apis";
import {ElNotification} from "element-plus";
import {useMainStore} from "@/stores";
import router from "@/router";
const loginStore = useMainStore().useLoginStore();
const comment = ref()
const pageNum = ref(1)
const id = parseInt(localStorage.getItem('id'));
const totalPageNum = ref(1);
const isClickUpvote = ref<boolean>(false);

const modalJobData = ref({
  id: 0,
  title: "",
  company: "",
  salary: "",
  education: "",
  hiring_manager: "",
  address: "",
  description: "",
  link: "",
  upvote: 0,
  comment_num: 0,
})
const commentList = ref([]);
const getInfo = () => {
  useRequest(() => getInfoAPI({
    id: id
  }, loginStore.token as string),{
    onSuccess(res: any) {
      if(res.code === 200 && res.msg === 'OK') {
        modalJobData.value = res.data.data
        getComment()
      }
    }
  })
}
onMounted(() => {
  getInfo()
})
const setComment = () => {
  useRequest(() => setCommentAPI({
    job_id: modalJobData.value.id,
    parent_id:0,
    content:comment.value
  },loginStore.token as string),{
    onSuccess(res: any) {
      if(res.code === 200 && res.msg === 'OK') {
        ElNotification.success("评论成功")
        comment.value = ''
        getComment()
      }else{
        ElNotification.error(res.msg);
      }
    },
    onError(e:any){
      ElNotification.error("网络错误"+e)
    }
  })
  getInfo();
}
const getComment = () => {
  useRequest(() => getCommentAPI({
    job_id: modalJobData.value.id,
    page_num: pageNum.value,
    page_size: 4
  },loginStore.token as string),{
    onSuccess(res: any) {
      if(res.code === 200) {
        commentList.value = res.data.data
        totalPageNum.value = res.data.total_page_num;
      }
    }
  })
}

const switchPageNum = (num: number) => {
  if(typeof pageNum.value === 'string' )
    pageNum.value = parseInt(pageNum.value, 10);
  if(0 < pageNum.value + num && pageNum.value + num <= totalPageNum.value) {
    pageNum.value += num;
  }
  getComment()
}

const upvote = () => {
  useRequest(()=>upvoteJobAPI(modalJobData.value.id,loginStore.token),{
    onSuccess(res){
      if(res.code === 200){
        getInfo()
        isClickUpvote.value = true;
        setTimeout(()=>{
          isClickUpvote.value = false;
        },100)
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
}

</script>

<style scoped>

</style>