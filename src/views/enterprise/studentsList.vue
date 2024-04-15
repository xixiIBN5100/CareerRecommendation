<template>
<div class='flex flex-row'>
    <ul class="menu bg-base-200 w-[200px] h-600 rounded-box p-20 ml-50 mt-60">
      <li class="menu-title text-4xl font-bold">菜单</li>
      <div class='text-base mt-10'>
        <li><a @click='router.push("/enterprise/enterpriseInfo")' class="my-6">查看企业信息</a></li>
        <li><a class="active my-6" @click='router.push("/enterprise/studentsList")' >查看学生列表</a></li>
        <li><a @click='router.push("/enterprise/applyCheckResume")' class="my-6">查看简历申请</a></li>
        <li><a @click='router.push("/enterprise/jobRequireMatch")' class="my-6">职位需求匹配</a></li>
      </div>
    </ul>
  <div>
    <div class='m-[30px] ml-[100px]'>
      <div class="card w-[1000px] bg-base-200 shadow-xl hover:shadow-2xl hover:translate-y-1">
        <div class="card-body flex flex-row items-center h-[50px]">
          <h2 class="card-title">学生列表</h2>
        </div>
      </div>
      <div class="card bg-base-200 w-[1000px] shadow-xl  hover:shadow-2xl mt-50 hover:translate-y-1">
        <div class="card-body">
          <div class='flex flex-row items-center'>
            <select class="select select-bordered w-[200px] max-w-xs text-base" v-model='education'>
              <option disabled selected>选择学历</option>
              <option>全部</option>
              <option>大专</option>
              <option>本科</option>
              <option>硕士</option>
              <option>博士</option>
            </select>
            <input type="radio" name="isOpen" class="radio ml-[20px]" value='1' v-model='params.open_public' />&nbsp;简历开放
            <input type="radio" name="isOpen" class="radio ml-[15px]" value='2' v-model='params.open_public'/>&nbsp;简历不开放
            <input type="radio" name="isOpen" class="radio ml-[15px]" value='0' v-model='params.open_public' checked/>&nbsp;所有
            <div class="divider divider-horizontal"></div>
            <button class="btn btn-outline" @click='screen'>筛选</button>
            <button class="btn btn-outline ml-[10px]" @click='reset'>重置</button>
          </div>
          <div class="divider"></div>
          <div v-if='!isLoading' class="overflow-x-auto">
            <table class="table">
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
              <tbody class='text-base'>
              <tr class="hover:bg-base-300" v-for='student in studentsList'>
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
  </dialog>
</div>
</template>

<script setup lang='ts'>
import router from '@/router';
import { ref,onMounted,watch } from "vue";
import { getStudentsListApi,checkResumeApi,applyCheckResumeApi } from "@/apis";
import { useRequest } from "vue-hooks-plus";
import { useMainStore } from '@/stores';
import { ElNotification } from 'element-plus';

const loginStore = useMainStore().useLoginStore();
const params = ref<object>({
  page_num : 1,
  page_size: 10,
  education: "",
  open_public: 0,
})
const education = ref<string>("选择学历");
const pageInfo = ref<object>({
  page_total_num: 10,
  student_num: 100,
})
const studentsList = ref();
const studentResume = ref<object>({});
const isLoading = ref<boolean>(false);
const isLoading2 = ref<boolean>(false);

const pageJia = () => {
  if(params.value.page_num<pageInfo.value.page_total_num){
    params.value.page_num ++;
  }
}
const pageJian = () => {
  if(params.value.page_num>1){
    params.value.page_num --;
  }
}
watch(()=>params.value.page_num,()=>{
  if(params.value.page_num>pageInfo.value.page_total_num){
    params.value.page_num = pageInfo.value.page_total_num;
  }else if(params.value.page_num<1){
    params.value.page_num = 1;
  }else{
    getInfo();
  }
})
const getInfo = () => {
  let loadingTime = 0;
  let setLoading = setInterval(function(){
    loadingTime+=0.1;
    if(loadingTime>=0.15){
      isLoading.value = true;
      clearInterval(setLoading);
    }
  },100)
  useRequest(()=>getStudentsListApi(params.value,loginStore.token),{
    onSuccess(res){
      clearInterval(setLoading);
      if(res.code === 200){
        // console.log(res.data)
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
      isLoading.value = false;
    }
  })
}

onMounted(()=>{
  getInfo();
})

const screen = () => {
  if(education.value === "全部" || education.value === "选择学历"){
    params.value.education = "";
  }else{
    params.value.education = education.value;
  }
  params.value.open_public = Number(params.value.open_public);
  if(params.value.page_num!=1){
    params.value.page_num=1;
  }else{
    getInfo();
  }
}

const reset = () => {
  params.value.page_num = 1;
  params.value.page_size = 10;
  params.value.education = "";
  params.value.open_public = 0;
  education.value = "选择学历";
  getInfo();
}

const checkResume = (student_id:number) => {
  isLoading2.value = true;
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
      isLoading2.value = false;
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
