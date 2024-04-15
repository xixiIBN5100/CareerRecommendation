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
    <div class="card bg-base-200 w-[1000px] shadow-xl  hover:shadow-2xl mt-50 hover:translate-y-1">
      <div class="card-body">
        <div class="collapse bg-base-100">
          <input type="checkbox" class='w-[850px]'/>
          <div class="collapse-title text-xl font-medium">
            需求信息填写
            <button class="btn btn-sm btn-outline btn-info float-right" @click='clear'>清空</button>
          </div>
          <div class="collapse-content grid grid-cols-2 gap-[25px]">
            <label class="input input-bordered flex items-center gap-4">
              <el-icon><Management /></el-icon>
              <input type="text" class="grow" placeholder="学历要求" v-model='params.education' />
            </label>
            <label class="input input-bordered flex items-center gap-4">
              <el-icon><Platform /></el-icon>
              <input type="text" class="grow" placeholder="技术要求" v-model='params.ability' />
            </label>
            <label class="input input-bordered flex items-center gap-4">
              <el-icon><LocationFilled /></el-icon>
              <input type="text" class="grow" placeholder="意向城市" v-model='params.address' />
            </label>
            <label class="input input-bordered flex items-center gap-4">
              <el-icon><WalletFilled /></el-icon>
              <input type="text" class="grow" placeholder="薪资要求(千)" v-model='salary' />
            </label>
          </div>
        </div>
        <div class="divider"></div>
        <div class="overflow-x-auto" v-if='!isLoading'>
          <table class="table text-base">
            <!-- head -->
            <thead>
            <tr class='text-lg'>
              <th>姓名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>学历</th>
              <th>求职意向</th>
              <th>意向城市</th>
              <th>理想薪资(千)</th>
              <th>简历是否开放</th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr v-for='student in studentsList'>
              <td>{{student.name}}</td>
              <td>{{student.sex}}</td>
              <td>{{student.age}}</td>
              <td>{{student.education}}</td>
              <td>{{student.job_intention}}</td>
              <td>{{student.city_intention}}</td>
              <td>{{student.salary_intention}}</td>
              <td>{{student.open_public}}</td>
              <td v-if='student.open_public==="开放"'><button class="btn btn-outline" @click='checkResume(student.student_id)' onclick="studentResume.showModal()">查看简历信息</button></td>
              <td v-else><button class="btn btn-outline" @click='applyCheck(student.student_id)'>申请查看简历</button></td>
            </tr>
            </tbody>
          </table>
          <div class='flex justify-center mt-[5px]'>
            <div class="join flex items-center">
              <button class="join-item btn" @click='pageJian'>«</button>
              <button class="join-item btn">Page <input type="text" placeholder="" class="input input-sm w-[80px]" v-model='params.page_num'/></button>
              <button class="join-item btn" @click='pageJia'>»</button>
              <span class='ml-[20px] font-bold'>totalPage：{{pageInfo.page_total_num}}</span>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col gap-[35px] w-[900px]">
          <div class="flex gap-4 items-center">
            <div class="skeleton w-[200px] h-[200px] rounded-full shrink-0"></div>
            <div class="flex flex-col gap-[25px] ml-[50px]">
              <div class="skeleton h-[25px] w-[100px]"></div>
              <div class="skeleton h-[25px] w-[150px]"></div>
              <div class="skeleton h-[25px] w-[350px]"></div>
              <div class="skeleton h-[25px] w-[600px]"></div>
            </div>
          </div>
          <div class="skeleton h-[150px] w-full"></div>
        </div>
      </div>
    </div>
  </div>
  <dialog id="studentResume" class="modal">
    <div class="modal-box w-[1070px] max-w-[1200px]">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div v-if='!isLoading2' class="mockup-window border bg-base-300">
        <div class='bg-base-200'>
          <h3 class="font-bold text-2xl ml-[30px] mt-[30px]">学生简历信息</h3>
          <div class='flex mt-[10px] ml-[30px] text-xl'>
            <div class='flex items-center'>
              <h3>姓名：</h3>
              <span>{{studentResume.name}}</span>
              <div class="divider divider-horizontal ml-[30px]"></div>
            </div>
            <div class='flex items-center text-xl ml-[15px]'>
              <h3>性别：</h3>
              <span>{{studentResume.sex}}</span>
              <div class="divider divider-horizontal ml-[30px]"></div>
            </div>
            <div class='flex items-center text-xl ml-[15px]'>
              <h3>年龄：</h3>
              <span>{{studentResume.age}}</span>
              <div class="divider divider-horizontal ml-[30px]"></div>
            </div>
            <div class='flex items-center text-xl ml-[15px]'>
              <h3>学历：</h3>
              <span>{{studentResume.education}}</span>
            </div>
          </div>
          <div class="divider"></div>
          <div class='flex mt-[10px] ml-[30px] text-xl'>
            <h3>求职意向岗位：</h3><span>{{studentResume.job_intention}}</span>
          </div>
          <div class="divider"></div>
          <div class='flex mt-[10px] ml-[30px] text-xl'>
            <h3>能力特长：</h3>
            <div class='border border-black w-[350px] h-[300px]'>
              <div class='m-[10px]'>
                <span>&nbsp;&nbsp;{{studentResume.ability}}</span>
              </div>
            </div>
            <!--            <div class="divider divider-horizontal"></div>-->
            <h3 class='ml-[30px]'>所获荣誉：</h3>
            <div class='border border-black w-[350px] h-[300px]'>
              <div class='m-[10px]'>
                <span>&nbsp;&nbsp;{{studentResume.honor}}</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class='flex mt-[10px] ml-[30px] text-xl'>
            <h3>工作经历：</h3>
            <div class='border border-black w-[350px] h-[400px]'>
              <div class='m-[10px]'>
                <span>&nbsp;&nbsp;{{studentResume.work_experience}}</span>
              </div>
            </div>
            <!--            <div class="divider divider-horizontal"></div>-->
            <h3 class='ml-[30px]'>自我评价：</h3>
            <div class='border border-black w-[350px] h-[400px]'>
              <div class='m-[10px]'>
                <span>&nbsp;&nbsp;{{studentResume.self_evaluation}}</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class='flex mt-[10px] ml-[30px] text-xl'>
            <h3>手机号：</h3><span>{{studentResume.phone}}</span>
            <div class="divider divider-horizontal"></div>
            <h3 class=''>住址：</h3><span>{{studentResume.address}}</span>
          </div>
          <div class="divider"></div>
          <div class='flex mt-[10px] ml-[30px] text-xl'>
            <h3>邮箱地址：</h3><span>{{studentResume.email}}</span>
            <div class="divider divider-horizontal"></div>
            <h3>身份证号码：</h3><span>{{studentResume.id_no}}</span>
          </div>
          <div class="divider"></div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-[35px] w-[1000px]">
        <div class="flex gap-4 items-center">
          <div class="skeleton w-[200px] h-[200px] rounded-full shrink-0"></div>
          <div class="flex flex-col gap-[25px] ml-[50px]">
            <div class="skeleton h-[25px] w-[150px]"></div>
            <div class="skeleton h-[25px] w-[200px]"></div>
            <div class="skeleton h-[25px] w-[400px]"></div>
            <div class="skeleton h-[25px] w-[650px]"></div>
          </div>
        </div>
        <div class="skeleton h-[150px] w-full"></div>
      </div>
    </div>
  </dialog>
</div>
</template>

<script setup lang='ts'>
import router from '@/router';
import { ref,onMounted,watch,computed } from "vue";
import { useMainStore } from '@/stores';
import { jobRequireMatchApi,checkResumeApi,applyCheckResumeApi } from "@/apis";
import { useRequest } from 'vue-hooks-plus';
import { ElNotification } from 'element-plus'

const loginStore = useMainStore().useLoginStore();
const params = ref({
  education: "",
  ability: "",
  address: "",
  salary: -1,
  page_num: 1,
  page_size: 10,
});
const salary = ref<string>("");
params.value.salary = computed(()=>{
  return Number(salary.value);
})
const studentsList = ref([]);
const studentResume = ref<object>({});
const pageInfo = ref({
  page_total_num: 1,
  student_num: 1,
})
const isLoading = ref<boolean>(false);
const isLoading2 = ref<boolean>(false);

const pageJian = () => {
  if(params.value.page_num>1){
    params.value.page_num--;
  }
}
const pageJia = () => {
  if(params.value.page_num<pageInfo.value.page_total_num){
    params.value.page_num++;
  }
}
let setLoading;

const { run } =useRequest(()=>jobRequireMatchApi(params.value,loginStore.token),{
  onSuccess(res){
    // console.log(res);
    clearInterval(setLoading);
    if(res.code === 200){
      pageInfo.value.page_total_num = res.data.page_total_num;
      pageInfo.value.student_num = res.data.student_num;
      studentsList.value = res.data.students;
      for(let i=0;i<studentsList.value.length;i++){
        if(studentsList.value[i].open_public === 2){
          studentsList.value[i].open_public = "不开放";
        }else{
          studentsList.value[i].open_public = "开放";
        }
        if(studentsList.value[i].sex === 1){
          studentsList.value[i].sex = "男";
        }else if(studentsList.value[i].sex === 2){
          studentsList.value[i].sex = "女";
        }
      }
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
  },
  onFinally(){
    isLoading.value=false;
  },
  debounceWait:1000,
  manual: true,
})
const Run =() => {
  let loadingTime = 0;
  setLoading = setInterval(function(){
    loadingTime+=0.1;
    if(loadingTime>=0.1){
      isLoading.value = true;
      clearInterval(setLoading);
    }
  },100)
  run();
}

onMounted(()=>{
  Run();
})

watch(params.value,()=>{
  if(params.value.page_num>pageInfo.value.page_total_num && pageInfo.value.page_total_num!=0){
    params.value.page_num = pageInfo.value.page_total_num;
  }else if(params.value.page_num>pageInfo.value.page_total_num){
    params.value.page_num = 1;
  } else if(params.value.page_num<1){
    params.value.page_num = 1;
  }
  Run();
  // console.log("监听成功");
})

const clear = () => {
  params.value.education = "";
  params.value.ability = "";
  params.value.address = "";
  salary.value = "";
}

const checkResume = (student_id:number) => {
  isLoading2.value = true
  useRequest(()=>checkResumeApi(student_id,loginStore.token),{
    onSuccess(res){
      console.log(res.data);
      if(res.code === 200){
        Object.assign(studentResume.value,res.data);
        // console.log(studentResume.value)
        if(studentResume.value.sex === 1){
          studentResume.value.sex = "男";
        }else{
          studentResume.value.sex = "女";
        }
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
    },
    onFinally(){
      isLoading2.value = false
    }
  });
}

const applyCheck = (student_id:number) => {
  useRequest(()=>applyCheckResumeApi(student_id,loginStore.token),{
    onSuccess(res){
      if(res.code === 200){
        ElNotification({
          title: 'Success',
          message: '申请成功，请在"查看申请的简历"页面查看状态',
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
}
</script>