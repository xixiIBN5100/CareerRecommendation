<template>
  <div class="flex flex-row px-60 py-30 h-full">
    <div class="basis-1/8">
      <div class="text-6xl p-30">
        简历
      </div>
      <ul class="menu bg-base-200 rounded-box">
        <li>
          <a :class="pageId === 1 ? 'active' : undefined" @click="() => switchPage(1)">添加简历</a>
        </li>
        <li>
          <a :class="pageId === 3 ? 'active' : undefined" @click="() => switchPage(3)">简历查看</a>
        </li>
        <li>
          <a :class="pageId === 2 ? 'active' : undefined" @click="() => switchPage(2)">简历修改</a>
        </li>

      </ul>
    </div>
    <div class="bg-base-200 shadow-lg basis-3/4 mx-50 my-20 p-30 rounded-box" v-if="pageId === 1">
      <div class="text-2xl mb-30">
        添加简历
        <div class="underline text-sm text-stone-500 float-right cursor-pointer" v-if="uploadFile === 0" @click="uploadFile = 1">上传简历文档?</div>
        <div class="underline text-sm text-stone-500 float-right cursor-pointer" v-if="uploadFile === 1" @click="uploadFile = 0">手动输入简历?</div>
      </div>
      <div class="flex flex-col gap-10" v-if="uploadFile === 0">
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
        <label class="input input-bordered flex items-center gap-2">
          <el-icon><Promotion /></el-icon>
          <input type="text" class="grow" placeholder="简历简介(仅用于用户端区分简历)" v-model="resumeInfo.remark"/>
        </label>
        <div :class="['btn','btn-primary', unableSub ? 'btn-disabled' : undefined]" @click="addResume">确认提交</div>
      </div>
      <div v-if="uploadFile === 1">
        <label>
          <input type="file" class="block text-sm text-slate-500 file:mr-15 file:btn file:btn-primary">
        </label>
        <div :class="['btn','btn-primary', 'w-full', 'mt-40', false ? 'btn-disabled' : undefined]" @click="addResumeFile">确认提交</div>
      </div>
    </div>
    <div v-if="pageId === 2">
      简历修改
    </div>
    <div class="bg-base-200 shadow-lg basis-3/4 mx-50 my-20 p-30 rounded-box" v-if="pageId === 3">
      <div class="text-2xl mb-30">
        简历查看
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>简介</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="res in resumeList" :class="res.default ? 'bg-base-300' : undefined">
              <th>{{ res.id }}</th>
              <td>{{ res.remark }}</td>
              <td class="flex flex-row gap-4">
                <div class="btn btn-sm btn-neutral">编辑</div>
                <div class="btn btn-sm btn-neutral" v-if="!res.default" @click="() => setDefaultResume(res.resume_id)">设为默认简历</div>
              </td>
              <td v-if="res.default">默认简历 √</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import { useRequest } from 'vue-hooks-plus';
import { addResumeAPI, getResumeListAPI, setDefaultResumeAPI } from '@/apis';
import { useMainStore } from '@/stores';
import { ElNotification } from 'element-plus';

const loginStore = useMainStore().useLoginStore();
const pageId = ref(1);
const uploadFile = ref(0);

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
  remark: ""
})
const age = ref("");
const resumeList = ref();

const updataResumeList = () => {
  useRequest(() => getResumeListAPI(loginStore.token as string), {
    onSuccess(res:any){
      console.log(res);
      if(res.code === 200) {
        resumeList.value = res.data;
        console.log(resumeList.value);
      } else {
        ElNotification("系统数据获取失败 检查网络设置或联系管理员");
      }
    }
  })
}
updataResumeList();

const addResume = () => {
  resumeInfo.value.age = parseInt(age.value, 10);
  console.log(resumeInfo.value);
  useRequest(() => addResumeAPI(resumeInfo.value, loginStore.token as string), {
    onSuccess(res:any){
      console.log(res);
      ElNotification(res.msg);
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

const switchPage = (id: number) => {
  pageId.value = id;
}

const addResumeFile = () => {
  ElNotification("上传了文件");
  //文件api待完成
}

const setDefaultResume = (id: number) => {
  useRequest(() => setDefaultResumeAPI({
    resume_id: id
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        ElNotification("默认简历设置成功");
        updataResumeList();
      } else {
        ElNotification(res.msg);
      }
    }
  });
}

</script>