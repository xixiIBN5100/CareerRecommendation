<template>
  <div class="text-2xl mb-30">
    搜索岗位库
  </div>
  <div class="overflow-x-auto">
    <div class="collapse bg-base-100">
      <input type="checkbox" />
      <div class="collapse-title">
        搜索
      </div>
      <div class="collapse-content flex flex-col gap-4">
        <div>
          <span>公司名称</span> <input class="input input-primary input-sm float-right w-200" v-model="company">
        </div>
        <div>
          <span>岗位名称</span> <input class="input input-primary input-sm float-right w-200" v-model="title">
        </div>
        <div>
          <span>学历要求{{ education }}</span>
          <select class="select select-primary select-sm float-right w-200" v-model="education">
            <option>大专</option>
            <option>本科</option>
            <option>硕士</option>
            <option>博士</option>
          </select>
        </div>
        <div>
          <span>地址</span> <input class="input input-primary input-sm float-right w-200" v-model="address">
        </div>
      </div>
    </div>
    <div v-if="totalPageNum < pageNum" @click="() => {pageNum = totalPageNum}" class="cursor-pointer">
      该页数过大 点击返回末页
    </div>
    <table class="table" v-else>
      <thead>
        <tr>
          <th style="width: 25%;">岗位名称</th>
          <th style="width: 35%;">公司名称</th>
          <th style="width: 15%;">薪酬</th>
          <th style="width: 15%;">最低学历要求</th>
          <th style="width: 10%;">操作</th>
        </tr>
      </thead>
      <tbody v-for="job in jobList">
        <tr class="border-none cursor-pointer">
          <td>{{ job.title }}</td>
          <td>{{ job.company }}</td>
          <td>{{ job.salary }}</td>
          <td>{{ job.education }}</td>
          <td>
            <button class="btn btn-sm btn-neutral" @click="checkDetail(job)">详情</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialog id="job_detail_modal" class="modal ">
    <div class="modal-box p-20 bg-base-200">
      <h3 class="font-bold text-2xl">{{ modalJobData.title }}</h3>
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
      </div>
      <div class="divider my-6"></div>
      <span class="text-xl m-3">评论:</span>
      <ul class="menu bg-base-200  rounded-box">
        <div v-for="item in commentList">
          <div class="divider my-3"></div>
          <li><a><span class="text-xl">{{item.user_name}}</span>: &ensp;{{item.content}}</a></li>
        </div>
      </ul>
      <div class="divider my-6 "></div>
      <div class="flex justify-between mt-10">
        <input class="input input-bordered w-9/12 shadow-lg" v-model="comment"/>
        <button class="btn shadow-lg bg-base-100" @click="setComment" ><span>发布评论</span></button>
      </div>
      <div class="modal-action">
        <button class="btn bg-base-100" @click="showModal('job_detail_modal', true)">关闭</button>
      </div>
    </div>
  </dialog>
  <div class="flex justify-center mt-16">
    <div class="join">
      <button class="join-item btn" @click="() => switchPageNum(-1)">«</button>
      <button class="join-item btn">
        page
        <input class="input input-sm input-ghost w-100" v-model="pageNum">
      </button>
      <button class="join-item btn" @click="() => switchPageNum(1)">»</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {provide, ref, watch} from 'vue';
import { useMainStore } from '@/stores';
import { useRequest } from 'vue-hooks-plus';
import {checkJobDatabaseAPI, getCommentAPI, setCommentAPI} from '@/apis';
import Index from "@/views/login/index.vue";
import {ElNotification} from "element-plus";
import Info from "@/views/jobDatabase/info.vue";
import router from "@/router";

const loginStore = useMainStore().useLoginStore();
const pageNum = ref(1);
const totalPageNum = ref(1);
const jobList = ref();
const jobShowDetailIndex = ref();
const company = ref("");
const title = ref("");
const education = ref("");
const address = ref("");
const comment = ref();
const commentList = ref();
const modalJobData = ref({
  id: -1,
  title: "",
  company: "",
  salary: "",
  education: "",
  hiring_manager: "",
  address: "",
  description: "",
  link: "",
})

const checkDetail = (job: any) => {
  modalJobData.value = job;
  const id = modalJobData.value.id.toString()
  localStorage.setItem( 'id' , id )
  console.log(modalJobData.value.id)
  router.push('/info')
}

const checkJobDatabase = () => {
  useRequest(() => checkJobDatabaseAPI({
    page_num: pageNum.value,
    page_size: 4,
    company: company.value,
    title: title.value,
    education: education.value,
    address: address.value
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        jobList.value = res.data.data;
        totalPageNum.value = res.data.total_page_num;
        console.log(jobList.value);
      }
    }
  })

}
checkJobDatabase();

const showDetail = (index: number) => {
  if(index === jobShowDetailIndex.value) {
    jobShowDetailIndex.value = undefined;
  } else {
    jobShowDetailIndex.value = index;
  }
}

const switchPageNum = (num: number) => {
  if(typeof pageNum.value === 'string' )
    pageNum.value = parseInt(pageNum.value, 10);
  if(0 < pageNum.value + num && pageNum.value + num <= totalPageNum.value) {
    pageNum.value += num;
  }
}


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
        useRequest(() => getCommentAPI({
          job_id: modalJobData.value.id,
          page_num: pageNum.value,
          page_size: 4
        },loginStore.token as string),{
          onSuccess(res: any) {
            if(res.code === 200) {
              commentList.value = res.data
              console.log(commentList.value)
            }
          }
        })
      }else{
        ElNotification.error(res.msg);
      }
    },
    onError(e:any){
      ElNotification.error("网络错误"+e)
    }
  })
}
watch(pageNum, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

watch(company, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

watch(title, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

watch(education, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

watch(address, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

const showModal = (id: string, unshow:boolean = false) => {
  if(unshow){
    (document.getElementById(id) as any).close();
  } else {
    (document.getElementById(id) as any).showModal();
  }
}
</script>