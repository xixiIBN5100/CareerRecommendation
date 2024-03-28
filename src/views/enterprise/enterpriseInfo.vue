<template>
<div class='flex flex-row'>
  <ul class="menu bg-base-200 w-[200px] h-600 rounded-box p-20 ml-50 mt-60">
    <li class="menu-title text-4xl font-bold">菜单</li>
    <div class='text-base mt-10'>
      <li><a @click='router.push("/enterprise/enterpriseInfo")' class="active my-6">查看企业信息</a></li>
      <li><a class=" my-6" @click='router.push("/enterprise/studentsList")' >查看学生列表</a></li>
      <li><a @click='router.push("/enterprise/applyCheckResume")' class="my-6">查看简历申请</a></li>
    </div>
  </ul>
  <div>
    <div class='m-[30px] ml-[100px]'>
      <div class="card w-[1000px] bg-base-200 shadow-xl hover:translate-y-1 hover:shadow-2xl ">
        <div class="card-body flex flex-row items-center h-[50px]">
          <h2 class="card-title">企业基本信息</h2>
        </div>
      </div>
      <div class="flex justify-center">
      <div class="card w-10/12 bg-base-200 shadow-xl mt-50 hover:translate-y-1 hover:shadow-2xl">
        <div class="card-body">
          <div class='text-xl mt-[10px]'>企业名称：<span class='float-right text-xl'>{{info.name}}</span></div>
          <div class="divider"></div>
          <div class='text-xl'>所在地：<span class='float-right text-xl'>{{info.location}}</span></div>
          <div class="divider"></div>
          <div class='text-xl'>企业网站：<span class='float-right text-xl'>{{info.website}}</span></div>
          <div class="divider"></div>
          <div class='text-xl'>企业邮箱：<span class='float-right text-xl'>{{info.email}}</span></div>
          <div class="divider"></div>
          <div class='text-xl'>企业简介：</div><span class='text-xl'>{{info.introduction}}</span>
          <div class="divider"></div>
          <div class="card-actions justify-end">
            <button class="btn btn-outline" onclick="my_modal_1.showModal()">编辑</button>
          </div>
        </div>
      </div>
      </div>
    </div>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box w-[900px] max-w-5xl">
        <div class='flex flex-row items-center'>
          <span class='text-xl'>企业名称：</span>
          <span class='input input-bordered w-full max-w-[500px] flex items-center'>
            <el-icon><User /></el-icon>
            <input type="text" placeholder="Name" class="text-lg ml-[5px]" v-model='submitInfo.name'/>
          </span>
        </div>
        <div class='mt-[10px] flex items-center'>
          <span class='text-xl'>所属行业：</span>
          <span class='input input-bordered w-full max-w-[500px] flex items-center'>
            <el-icon><OfficeBuilding /></el-icon>
            <input type="text" placeholder="Industry" class="text-lg ml-[5px]" v-model='submitInfo.industry' />
          </span>
        </div>
        <div class='mt-[10px] flex items-center'>
          <span class='text-xl'>所在地：</span>
          <span class='input input-bordered w-full max-w-[500px] flex items-center'>
            <el-icon><Location /></el-icon>
            <input type="text" placeholder="location" class="text-lg ml-[5px]" v-model='submitInfo.location' />
          </span>
        </div>
        <div class='mt-[10px] flex items-center'>
          <span class='text-xl'>企业网站：</span>
          <span class='input input-bordered w-full max-w-[500px] flex items-center'>
            <el-icon><Monitor /></el-icon>
            <input type="text" placeholder="Website" class="text-lg ml-[5px]" v-model='submitInfo.website' />
          </span>
        </div>
        <div class='mt-[10px] flex items-center'>
          <span class='text-xl'>企业邮箱：</span>
          <span class='input input-bordered w-full max-w-[500px] flex items-center'>
            <el-icon><Message /></el-icon>
            <input type="text" placeholder="Email" class="text-lg ml-[5px]" v-model='submitInfo.email' />
          </span>
        </div>
        <div class='mt-[10px]'>
          <span class='text-xl'>企业简介：</span><br />
          <textarea class="textarea textarea-bordered w-[850px] mt-[5px] h-[280px] text-lg" placeholder="introduction" v-model='submitInfo.introduction'></textarea>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn" @click='submit'>提交信息</button>
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click='refreshData'>close</button>
      </form>
    </dialog>
  </div>
</div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from "vue";
import { useRequest } from "vue-hooks-plus";
import { submitInfoApi,getInfoApi } from "@/apis"
import { useMainStore } from '@/stores'
import { ElNotification } from 'element-plus';
import router from '@/router';

const loginStore = useMainStore().useLoginStore()

const info = ref({
  name: "",
  introduction: "",
  location: "",
  industry: "",
  website: "",
  email: "",
})
const submitInfo = ref({
  name: "",
  introduction: "",
  location: "",
  industry: "",
  website: "",
  email: "",
})

const getInfo = () => {
  useRequest(()=>getInfoApi(<string>loginStore.token),{
    onSuccess(res){
      // console.log(res.data.name);
      if(res.code === 200){
        Object.assign(info.value,res.data)
        Object.assign(submitInfo.value,res.data)
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

onMounted(()=>{
  getInfo();
  // console.log(info.value);
})

const submit = () => {
  // console.log(submitInfo.value);
  useRequest(()=>submitInfoApi(submitInfo.value,<string>loginStore.token),{
    onSuccess(res){
      if(res.code===200){
        ElNotification({
          title: 'Success',
          message: '编辑成功',
          type: 'success',
        })
        getInfo();
      }else{
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning',
        })
      }
    },
    onError(err){
      const open4 = () => {
        ElNotification({
          title: 'Error',
          message: err,
          type: 'error',
        })
      }
    }
  })
}

const refreshData = () => {
  Object.assign(submitInfo.value,info.value)
}
</script>
