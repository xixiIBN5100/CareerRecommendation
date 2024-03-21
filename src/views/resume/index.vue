<template>
  <div class="flex flex-row px-60 py-30 h-full">
    <div class="basis-1/8">
      <div class="text-6xl p-30">
        简历
      </div>
      <ul class="menu bg-base-200 rounded-box">
        <li>
          <a>添加简历</a>
        </li>
        <li>
          <a>简历修改</a>
        </li>
        <li>
          <a>简历查看</a>
        </li>
      </ul>
    </div>
    <!-- <div class="h-90hv w-0 border-2 border-slate-500"></div> -->
    <div class="bg-primary-content basis-3/4 mx-50 my-20 p-30 rounded-box">
      <div class="text-2xl mb-30">
        添加简历
        <div class="underline text-sm text-stone-500 float-right cursor-pointer">上传简历文档?</div>
      </div>
      <div class="flex flex-col gap-10">
        <label class="input input-bordered flex items-center gap-2">
          <el-icon><User/></el-icon>
          <input type="text" class="grow" placeholder="姓名" v-model="resumeInfo.name" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <el-icon><Star/></el-icon>
          <input type="text" class="grow" placeholder="年龄" v-model="age"/>
        </label>
        <label class="p-4">
          <input type="radio" name="gender" class="radio radio-sm" value="1" v-model="resumeInfo.sex"/><span class="m-4 text-xl mr-50">男</span>
          <input type="radio" name="gender" class="radio radio-sm" value="2" v-model="resumeInfo.sex"/><span class="m-4 text-xl">女</span>
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <el-icon><Postcard/></el-icon>
          <input type="text" class="grow" placeholder="身份证" v-model="resumeInfo.id_no"/>
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <el-icon><School/></el-icon>
          <input type="text" class="grow" placeholder="家庭住址" v-model="resumeInfo.address"/>
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <el-icon><DocumentChecked /></el-icon>
          <input type="text" class="grow" placeholder="求职意向岗位" v-model="resumeInfo.job_intention"/>
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <el-icon><Reading /></el-icon>
          <input type="text" class="grow" placeholder="学历" v-model="resumeInfo.education"/>
        </label>
        能力特长
        <textarea class="textarea textarea-bordered" v-model="resumeInfo.ability"></textarea>
        工作经历
        <textarea class="textarea textarea-bordered" v-model="resumeInfo.work_experience"></textarea>
        所获荣誉
        <textarea class="textarea textarea-bordered" v-model="resumeInfo.honor"></textarea>
        自我评价
        <textarea class="textarea textarea-bordered" v-model="resumeInfo.self_evaluation"></textarea>
        <div :class="['btn','btn-primary', unableSub ? 'btn-disabled' : undefined]" @click="addResume">确认提交</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import { useRequest } from 'vue-hooks-plus';
import { addResumeAPI } from '@/apis';
import { useMainStore } from '@/stores';
import { ElNotification } from 'element-plus';

const loginStore = useMainStore().useLoginStore();

const resumeInfo = ref({
  name: "",
  sex: 1,
  age: 0,
  address: "",
  id_no: "",
  phone: "",
  email: "",
  job_intention: "",
  education: "",
  ability: "",
  work_experience: "",
  honor: "",
  self_evaluation: ""
})
const age = ref("");

const addResume = () => {
  resumeInfo.value.age = parseInt(age.value, 10);
  useRequest(() => addResumeAPI(resumeInfo.value, loginStore.token as string), {
    onSuccess(res){
      console.log(res);
    },
    onError(e){
      console.log(e);
    }
  })
}

const unableSub = computed(() => {
  return resumeInfo.value.name === "" ||
        resumeInfo.value.id_no === "" ||
        resumeInfo.value.address === "" ||
        resumeInfo.value.job_intention === "" ||
        resumeInfo.value.education === "" ||
        resumeInfo.value.ability === "" ||
        resumeInfo.value.work_experience === "" ||
        resumeInfo.value.honor === "" ||
        resumeInfo.value.self_evaluation === "" ||
        age.value === ""
})

</script>