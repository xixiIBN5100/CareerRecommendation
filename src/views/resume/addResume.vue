<template>
  <div class="text-4xl mb-30 ">
    添加简历
    <div class="underline text-sm text-stone-500 float-right cursor-pointer" v-if="uploadFile === 0" @click="uploadFile = 1">上传简历文档?</div>
    <div class="underline text-sm text-stone-500 float-right cursor-pointer" v-if="uploadFile === 1" @click="uploadFile = 0">手动输入简历?</div>
  </div>
  <div class="flex flex-col gap-10" v-if="uploadFile === 0">
    <div class="flex justify-between">
    <label class="input input-bordered flex items-center gap-2 w-5/12 shadow-lg">
      <el-icon><User/></el-icon>
      <input type="text" class="grow" placeholder="姓名" v-model="resumeInfo.name" />
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 shadow-lg">
      <el-icon><Star/></el-icon>
      <input type="text" class="grow" placeholder="年龄" v-model="age"/>
    </label>
    </div>

    <div class="flex justify-between flex-wrap">
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      <el-icon><Postcard/></el-icon>
      <input type="text" class="grow" placeholder="身份证" v-model="resumeInfo.id_no"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      <el-icon><Iphone /></el-icon>
      <input type="text" class="grow" placeholder="联系方式" v-model="resumeInfo.phone"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      <el-icon><Message /></el-icon>
      <input type="text" class="grow" placeholder="邮箱" v-model="resumeInfo.email"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      <el-icon><School/></el-icon>
      <input type="text" class="grow" placeholder="家庭住址" v-model="resumeInfo.address"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      <el-icon><DocumentChecked /></el-icon>
      <input type="text" class="grow" placeholder="求职意向岗位" v-model="resumeInfo.job_intention"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      <el-icon><Reading /></el-icon>
      <input type="text" class="grow" placeholder="学历" v-model="resumeInfo.education"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      <el-icon><Place /></el-icon>
      <input type="text" class="grow" placeholder="求职意向城市" v-model="resumeInfo.city_intention"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      <el-icon><Money /></el-icon>
      <input type="text" class="grow" placeholder="求职意向薪资(单位为千，请填具体数字)" v-model="salary_intention"/>
    </label>
    </div>
    <label class="p-4 flex justify-between">
      <label>
        <input type="radio" name="gender" class="radio radio-sm shadow-lg" value="1" v-model="resumeInfo.sex"/><span class="m-4 text-xl mr-50">男</span>
      </label>
      <label>
        <input type="radio" name="gender" class="radio radio-sm shadow-lg" value="2" v-model="resumeInfo.sex"/><span class="m-4 text-xl">女</span>
      </label>
    </label>
    能力特长
    <textarea class="textarea textarea-bordered" placeholder="请尽可能详细列举技术栈" v-model="resumeInfo.ability"></textarea>
    工作经历
    <textarea class="textarea textarea-bordered" v-model="resumeInfo.work_experience"></textarea>
    所获荣誉
    <textarea class="textarea textarea-bordered" v-model="resumeInfo.honor"></textarea>
    自我评价
    <textarea class="textarea textarea-bordered" v-model="resumeInfo.self_evaluation"></textarea>
    <label class="input input-bordered flex items-center gap-2">
      <el-icon><Promotion /></el-icon>
      <input type="text" class="grow" placeholder="简历简介(仅用于用户端区分简历)" v-model="resumeInfo.remark"/>
    </label>
    <div :class="['btn','btn-primary', unableSub ? 'btn-disabled' : undefined]" @click="addResume">确认提交</div>
  </div>
  <div v-if="uploadFile === 1">
    <label>
      <input type="file" class="block text-sm text-slate-500 file:mr-15 file:btn file:btn-primary" @change="fileChange">
    </label>
    <div :class="['btn btn-primary w-full mt-40', resumeUploaded ? undefined : 'btn-disabled']" @click="addResumeFile">确认提交</div>
  </div>`
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRequest } from 'vue-hooks-plus';
import { addResumeAPI, addResumeDocAPI } from '@/apis';
import { useMainStore } from '@/stores';
import { ElNotification } from 'element-plus';

const loginStore = useMainStore().useLoginStore();
const emit = defineEmits(["getPageId"]);
const uploadFile = ref(0);
const age = ref("");
const salary_intention = ref("");
const resumeFile = ref();
const resumeUploaded = ref(false);
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
  self_evaluation: "",
  remark: "",
  city_intention: "",
  salary_intention: 0
})

const getPageId = (pageId: number) => {
  emit("getPageId", pageId);
};

const fileChange = (event: any) => {
  resumeFile.value = event.target.files[0];
  resumeUploaded.value = true;
  if(resumeFile.value === null || resumeFile.value === undefined
  || resumeFile.value.type !== "application/msword"
  && resumeFile.value.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  && resumeFile.value.type !== "application/pdf"){
    resumeFile.value = null;
    resumeUploaded.value = false;
    ElNotification({
      title: 'Error',
      message: '文件格式错误，请选择正确的文件格式',
      type: 'error',
    });
  }
}

const addResume = () => {
  resumeInfo.value.age = parseInt(age.value, 10);
  resumeInfo.value.salary_intention = parseInt(salary_intention.value, 10);
  useRequest(() => addResumeAPI(resumeInfo.value, loginStore.token as string), {
    onSuccess(res:any){
      if(res.code === 200) {
        ElNotification("新简历创建成功");
        getPageId(3);
        resumeInfo.value = {name: "",sex: 1,age: 0,address: "",id_no: "",phone: "",email: "",job_intention: "",education: "",ability: "",work_experience: "",honor: "",self_evaluation: "",remark: "", city_intention: "",salary_intention: 0};
        age.value = "";
      } else {
        ElNotification("新简历创建失败");
      }
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
        age.value === "" ||
        salary_intention.value === ""
})

const addResumeFile = () => {
  const formData = new FormData();
  formData.append("file", resumeFile.value);
  useRequest(() => addResumeDocAPI(formData, loginStore.token as string), {
    onSuccess(res: any) {
      console.log(res);
      if(res.code === 200) {
        resumeFile.value = null;
        resumeUploaded.value = false;
        ElNotification("上传了文件");
      }
    }
  })
}

</script>