<template>
<div class='flex flex-row'>
  <ul class="menu bg-base-200 w-[200px] h-600 rounded-box p-20 ml-50 mt-60">
    <li class="menu-title text-4xl font-bold">菜单</li>
    <div class='text-base mt-10'>
      <li><a @click='router.push("/enterprise/enterpriseInfo")' class="my-6">查看企业信息</a></li>
      <li><a class=" my-6" @click='router.push("/enterprise/studentsList")' >查看学生列表</a></li>
      <li><a @click='router.push("/enterprise/applyCheckResume")' class="my-6">查看简历申请</a></li>
      <li><a @click='router.push("/enterprise/jobRequireMatch")' class="my-6 active">职位需求匹配</a></li>
    </div>
  </ul>
  <div class='m-[30px] ml-[100px]'>
    <div class="card w-[1000px] bg-base-200 shadow-xl hover:translate-y-1 hover:shadow-2xl ">
      <div class="card-body flex flex-row items-center h-[50px]">
        <h2 class="card-title">职位需求匹配</h2>
      </div>
    </div>
    <div class="card  max-h-[1000px] bg-base-200 shadow-xl  hover:shadow-2xl mt-50 hover:translate-y-1">
      <div class="card-body">
        <div class="collapse bg-base-100 w-[500px]">
          <input type="checkbox" class='w-[400px]'/>
          <div class="collapse-title text-xl font-medium">
            需求信息填写
            <button class="btn btn-sm btn-outline btn-info float-right" @click='clear'>清空</button>
          </div>
          <div class="collapse-content">
            <label class="input input-bordered flex items-center gap-2">
              <el-icon><Management /></el-icon>
              <input type="text" class="grow ml-[5px]" placeholder="学历要求" v-model='params.education' />
            </label>
            <label class="input input-bordered flex items-center gap-2 my-[10px]">
              <el-icon><Platform /></el-icon>
              <input type="text" class="grow ml-[5px]" placeholder="技术要求" v-model='params.ability' />
            </label>
            <label class="input input-bordered flex items-center gap-2">
              <el-icon><LocationFilled /></el-icon>
              <input type="text" class="grow ml-[5px]" placeholder="工作地址" v-model='params.address' />
            </label>
          </div>
        </div>
        <div class="divider"></div>
        <div class="overflow-x-auto">
          <table class="table text-base">
            <!-- head -->
            <thead>
            <tr class='text-base'>
              <th></th>
              <th>姓名</th>
              <th>简历是否开放</th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr v-for='student in studentsList'>
              <th>1</th>
              <td>{{student.name}}</td>
              <td>{{student.open_public}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang='ts'>
import router from '@/router';
import { ref,onMounted,watch } from "vue";
import { useMainStore } from '@/stores';
import { jobRequireMatchApi } from "@/apis";
import { useRequest } from 'vue-hooks-plus';
import { ElNotification } from 'element-plus'

const loginStore = useMainStore().useLoginStore();
const params = ref({
  education: "",
  ability: "",
  address: "",
});
const studentsList = ref([]);

const { run } = useRequest(()=>jobRequireMatchApi(params,loginStore.token),{
  onSuccess(res){
    console.log(res);
  },
  onError(err){
    ElNotification({
      title: 'Error',
      message: err,
      type: 'error',
    })
  },
  debounceWait:1000,
  manual: true,
})

onMounted(()=>{
  run();
})

watch(params.value,()=>{
  run();
  console.log("监听成功");
})

const clear = () => {
  params.value.education = "";
  params.value.ability = "";
  params.value.address = "";
}
</script>