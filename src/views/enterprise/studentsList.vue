<template>
<div class='flex flex-row'>
  <div class='w-[200px] shadow-2xl rounded-box'>
    <ul class="menu bg-base-200 w-[200px] h-screen rounded-box hover:bg-base-300 hover:shadow-2xl">
      <li class="menu-title text-3xl">菜单</li>
      <div class='text-base mt-10'>
        <li><a @click='router.push("/enterprise/enterpriseInfo")'>企业信息</a></li>
        <li><a class="active" @click='router.push("/enterprise/studentsList")'>查看学生列表</a></li>
        <li><a @click='router.push("/enterprise/enterpriseInfo")'>Item 3</a></li>
      </div>
    </ul>
  </div>
  <div>
    <div class='m-[30px] ml-[100px]'>
      <div class="card w-[1250px] bg-base-200 shadow-xl hover:bg-base-300 hover:shadow-2xl">
        <div class="card-body flex flex-row items-center h-[50px]">
          <h2 class="card-title">学生列表</h2>
        </div>
      </div>
      <div class="card w-[1250px] max-h-[1000px] bg-base-200 shadow-xl mt-[25px] hover:bg-base-300 hover:shadow-2xl">
        <div class="card-body">
          <div class='flex flex-row items-center'>
            <label class="input input-bordered flex items-center gap-2">
              学历：
              <input type="text" class="grow" placeholder="学校+科或专" v-model='params.education'/>
            </label>
            <input type="radio" name="isOpen" class="radio ml-[20px]" value='1' v-model='params.open_public' />&nbsp;简历开放
            <input type="radio" name="isOpen" class="radio ml-[15px]" value='2' v-model='params.open_public'/>&nbsp;简历不开放
            <input type="radio" name="isOpen" class="radio ml-[15px]" value='0' v-model='params.open_public' checked/>&nbsp;所有
            <div class="divider divider-horizontal"></div>
            <button class="btn btn-outline" @click='screen'>筛选</button>
          </div>
          <div class="divider"></div>
          <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
              <tr class='text-lg'>
                <th></th>
                <th>学生姓名</th>
                <th>学历</th>
                <th>简历是否开放</th>
              </tr>
              </thead>
              <tbody class='text-base'>
              <tr class='hover' v-for='student in studentsList'>
                <th>{{ student.student_id }}</th>
                <td>{{ student.name }}</td>
                <td>{{ student.education }}</td>
                <td>{{ student.open_public}}</td>
                <td v-if='student.open_public==="开放"'><button class="btn btn-outline" @click='checkResume(student.student_id)' onclick="studentResume.showModal()">查看简历信息</button></td>
                <td v-else><button class="btn btn-outline" @click='applyCheck(student.student_id)'>申请查看简历</button></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class='flex justify-center mt-[5px]'>
            <div class="join">
              <input class="join-item btn btn-square" type="radio" name="options" aria-label="1" checked/>
              <div v-for='num in pageNum'>
                <input class="join-item btn btn-square" type="radio" name="options" :aria-label="num" @click='changePage(num)'/>
              </div>
            </div>
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
      <div class="mockup-window border bg-base-300">
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
              <div class='m-[15px]'>
                <span>&nbsp;&nbsp;{{studentResume.ability}}</span>
              </div>
            </div>
<!--            <div class="divider divider-horizontal"></div>-->
            <h3 class='ml-[30px]'>所获荣誉：</h3>
            <div class='border border-black w-[350px] h-[300px]'>
              <div class='m-[15px]'>
                <span>&nbsp;&nbsp;{{studentResume.honor}}</span>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class='flex mt-[10px] ml-[30px] text-xl'>
            <h3>工作经历：</h3>
            <div class='border border-black w-[350px] h-[400px]'>
              <div class='m-[15px]'>
                <span>&nbsp;&nbsp;{{studentResume.work_experience}}</span>
              </div>
            </div>
<!--            <div class="divider divider-horizontal"></div>-->
            <h3 class='ml-[30px]'>自我评价：</h3>
            <div class='border border-black w-[350px] h-[400px]'>
              <div class='m-[15px]'>
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
    </div>
  </dialog>
</div>
</template>

<script setup lang='ts'>
import router from '@/router';
import { ref,onMounted } from "vue";
import { getStudentsListApi,checkResumeApi } from "@/apis";
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
const pageInfo = ref<object>({
  page_total_num: 10,
  student_num: 100,
})
const pageNum = ref([]);
const studentsList = ref();
const studentResume = ref<object>({});

const changePage = (pageNum) => {
  params.value.page_num = pageNum;
}

const getInfo = () => {
  useRequest(()=>getStudentsListApi(params.value,loginStore.token),{
    onSuccess(res){
      if(res.code === 200){
        console.log(res.data)
        pageInfo.value.page_total_num = res.data.page_total_num;
        pageInfo.value.student_num = res.data.student_num;
        for(let i=2;i<=pageInfo.value.page_total_num;i++){
          pageNum.value.push(i);
        }
        studentsList.value = res.data.students;
        for(let i=0;i<studentsList.value.length;i++){
          if(studentsList.value[i].open_public === 2){
            studentsList.value[i].open_public = "不开放";
          }else{
            studentsList.value[i].open_public = "开放";
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
    }
  })
}

onMounted(()=>{
  getInfo();
})

const screen = () => {
  params.value.open_public = Number(params.value.open_public);
  getInfo();
}

const checkResume = (student_id:number) => {
  useRequest(()=>checkResumeApi(student_id,loginStore.token),{
    onSuccess(res){
      console.log(res.data);
      if(res.code === 200){
        Object.assign(studentResume.value,res.data);
        console.log(studentResume.value)
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
  });
}

const applyCheck = (student_id:number) => {

}
</script>
