<template>
  <div class="text-4xl mb-30">
    简历修改
    <div v-if="editIng" class="btn btn-sm btn-warning btn-outline float-end" @click="cancelEdit">取消更改</div>
  </div>
  <div class="flex flex-col gap-10" v-if="editIng">
    <div class='flex justify-between'>
    <label class="input input-bordered flex items-center gap-2 w-5/12 shadow-lg">
      姓名<el-icon class="mr-8"><User/></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="姓名" v-model="resumeInfo.name" />
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 shadow-lg">
      年龄<el-icon class="mr-8"><Star/></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="年龄" v-model="age"/>
    </label>
    </div>

    <div class="flex justify-between flex-wrap">
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      身份证<el-icon class="mr-8"><Postcard/></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="身份证" v-model="resumeInfo.id_no"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      联系方式<el-icon class="mr-8"><Iphone/></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="联系方式" v-model="resumeInfo.phone"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      邮箱<el-icon class="mr-8"><Message /></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="邮箱" v-model="resumeInfo.email"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      家庭住址<el-icon class="mr-8"><School/></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="家庭住址" v-model="resumeInfo.address"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      意向岗位<el-icon class="mr-8"><DocumentChecked /></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="求职意向岗位" v-model="resumeInfo.job_intention"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      学历<el-icon class="mr-8"><Reading /></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="学历" v-model="resumeInfo.education"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      意向城市<el-icon class="mr-8"><Place /></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="求职意向城市" v-model="resumeInfo.city_intention"/>
    </label>
    <label class="input input-bordered flex items-center gap-2 w-5/12 my-10 shadow-lg">
      意向薪资<el-icon class="mr-8"><Money /></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="求职意向薪资" v-model="salary_intention"/>
    </label>
    </div>
    <label class="p-4 flex justify-between">
      <label>
        <input type="radio" name="gender" class="radio radio-sm shadow-lg" value="1" v-model="resumeInfo.sex"/><span class="m-4 text-xl mr-50">男</span>
      </label>
      <label>
        <input type="radio" name="gender" class="radio radio-sm" value="2" v-model="resumeInfo.sex"/><span class="m-4 text-xl">女</span>
      </label>
    </label>
    能力特长
    <textarea class="textarea textarea-bordered" v-model="resumeInfo.ability"></textarea>
    工作经历
    <textarea class="textarea textarea-bordered" v-model="resumeInfo.work_experience"></textarea>
    所获荣誉
    <textarea class="textarea textarea-bordered" v-model="resumeInfo.honor"></textarea>
    自我评价
    <textarea class="textarea textarea-bordered" v-model="resumeInfo.self_evaluation"></textarea>
    <label class="input input-bordered flex items-center gap-2">
      简历简介<el-icon class="mr-8"><Promotion /></el-icon>
      <input type="text" class="grow text-right mr-8" placeholder="简历简介(仅用于用户端区分简历)" v-model="resumeInfo.remark"/>
    </label>
    <div class="btn btn-primary" @click="submitEdit">提交更改</div>
  </div>
  <div v-if="!editIng">请前往<span class="rounded bg-base-100 p-6 m-3 font-bold">简历查看</span>中选定简历</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRequest } from 'vue-hooks-plus';
import { editResumeAPI, getResumeInfoAPI } from '@/apis';
import { ElNotification } from 'element-plus';
import { useMainStore } from '@/stores';

const loginStore = useMainStore().useLoginStore();
const emit = defineEmits(["getPageId", "setEditIng"]);
const props = defineProps<{
  resume_id: number
  editIng: boolean
}>();

const age = ref("");
const salary_intention = ref("");
const resumeInfo = ref({
  resume_id: 0,
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

const loadResumeInfo = () => {
  useRequest(() => getResumeInfoAPI({
    resume_id: props.resume_id
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        resumeInfo.value = res.data;
        resumeInfo.value.resume_id = props.resume_id;
        age.value = resumeInfo.value.age.toString();
        salary_intention.value = resumeInfo.value.salary_intention.toString();
      }
    }
  })
}
loadResumeInfo();

const cancelEdit = () => {
  setEditIng(false);
  getPageId(3);
}

const getPageId = (pageId: number) => {
  emit("getPageId", pageId);
};

const setEditIng = (tf: boolean) => {
  emit("setEditIng", tf);
}

const submitEdit = () => {
  resumeInfo.value.age = parseInt(age.value, 10);
  resumeInfo.value.salary_intention = parseInt(salary_intention.value, 10);
  useRequest(() => editResumeAPI(resumeInfo.value, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        ElNotification("更改成功");
        getPageId(3);
        setEditIng(false);
      }
      ElNotification(res.msg);
    },
    onError(e) {
      console.log(e);
    }
  })
}

</script>