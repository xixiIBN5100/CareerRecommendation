<template>
  <div class="flex flex-row px-60 py-30">
    <div class="basis-1/8">
      <div class="text-6xl p-30 text-nowrap">
        简历
      </div>
      <ul class="menu bg-base-200 rounded-box p-10">
        <li class="my-5">
          <a :class="pageId === 1 ? 'active' : undefined" @click="() => switchPage(1)">添加简历</a>
        </li>
        <li class="my-5">
          <a :class="pageId === 3 ? 'active' : undefined" @click="() => switchPage(3)">简历查看</a>
        </li>
        <li class="my-5">
          <a :class="pageId === 2 ? 'active' : undefined" @click="() => switchPage(2)">简历修改</a>
        </li>

      </ul>
    </div>
    <div class="bg-base-200 shadow-lg basis-8/12 ml-120 my-60 p-50 rounded-box hover:bg-base-300/20 hover:shadow-2xl" v-if="pageId === 1">
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
    <div class="bg-base-200 shadow-lg basis-3/4 ml-120 my-60 p-30 rounded-box" v-if="pageId === 2">
      <div class="text-2xl mb-30">
        简历修改
        <div v-if="editIng" class="btn btn-sm btn-warning btn-outline float-end" @click="cancelEdit">取消更改</div>
      </div>
      <div class="flex flex-col gap-10" v-if="editIng">
        <label class="input input-ghost flex items-center gap-2">
          姓名<el-icon class="mr-8"><User/></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="姓名" v-model="resumeEdit.name" />
        </label>
        <label class="input input-ghost flex items-center gap-2">
          年龄<el-icon class="mr-8"><Star/></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="年龄" v-model="ageEdit"/>
        </label>
        <label class="p-4">
          <input type="radio" name="gender" class="radio radio-sm" value="1" v-model="resumeEdit.sex"/><span class="m-4 text-xl mr-50">男</span>
          <input type="radio" name="gender" class="radio radio-sm" value="2" v-model="resumeEdit.sex"/><span class="m-4 text-xl">女</span>
        </label>
        <label class="input input-ghost flex items-center gap-2">
          身份证<el-icon class="mr-8"><Postcard/></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="身份证" v-model="resumeEdit.id_no"/>
        </label>
        <label class="input input-ghost flex items-center gap-2">
          联系方式<el-icon class="mr-8"><Iphone/></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="联系方式" v-model="resumeEdit.phone"/>
        </label>
        <label class="input input-ghost flex items-center gap-2">
          邮箱<el-icon class="mr-8"><Message /></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="邮箱" v-model="resumeEdit.email"/>
        </label>
        <label class="input input-ghost flex items-center gap-2">
          家庭住址<el-icon class="mr-8"><School/></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="家庭住址" v-model="resumeEdit.address"/>
        </label>
        <label class="input input-ghost flex items-center gap-2">
          求职意向岗位<el-icon class="mr-8"><DocumentChecked /></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="求职意向岗位" v-model="resumeEdit.job_intention"/>
        </label>
        <label class="input input-ghost flex items-center gap-2">
          学历<el-icon class="mr-8"><Reading /></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="学历" v-model="resumeEdit.education"/>
        </label>
        能力特长
        <textarea class="textarea textarea-ghost" v-model="resumeEdit.ability"></textarea>
        工作经历
        <textarea class="textarea textarea-ghost" v-model="resumeEdit.work_experience"></textarea>
        所获荣誉
        <textarea class="textarea textarea-ghost" v-model="resumeEdit.honor"></textarea>
        自我评价
        <textarea class="textarea textarea-ghost" v-model="resumeEdit.self_evaluation"></textarea>
        <label class="input input-ghost flex items-center gap-2">
          简历简介<el-icon class="mr-8"><Promotion /></el-icon>
          <input type="text" class="grow text-right mr-8" placeholder="简历简介(仅用于用户端区分简历)" v-model="resumeEdit.remark"/>
        </label>
        <div class="btn btn-primary" @click="submitEdit">提交更改</div>
      </div>
      <div v-if="!editIng">请前往<span class="rounded bg-base-100 p-6 m-3 font-bold">简历查看</span>中选定简历</div>
    </div>
    <div class="bg-base-200 shadow-lg basis-3/4 ml-120 my-60 p-30 rounded-box" v-if="pageId === 3">
      <div class="text-2xl mb-30">
        简历查看
        <div class="btn btn-sm btn-accent btn-outline float-end" @click="updataResumeList">刷新列表</div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
          <tr>
            <th>编号</th>
            <th>简介</th>
            <th>操作</th>
            <th>状态</th> <!-- Include the "状态" column header -->
          </tr>
          </thead>
          <tbody>
          <tr v-for="res in resumeList" :class="res.default ? 'bg-base-300' : undefined">
            <td>{{ res.id }}</td> <!-- Display "编号" in this column -->
            <td>{{ res.remark }}</td> <!-- Display "简介" in this column -->
            <td class="flex flex-row gap-4">
              <div class="btn btn-sm btn-neutral" @click="() => editResume(res.resume_id)">编辑</div>
              <div class="btn btn-sm btn-neutral" @click="() => showModal('delete_modal')">删除</div>
              <div class="btn btn-sm btn-neutral" v-if="!res.default" @click="() => setDefaultResume(res.resume_id)">设为默认简历</div>
              <div class="btn btn-sm btn-neutral" v-if="res.default" @click="() => setPublicResume(res.open_public)">{{ res.open_public === 1 ? "取消公开" : "公开简历" }}</div>
            </td>
            <td class="flex flex-row gap-4">
              <div v-if="res.default" class="leading-9 mr-8">默认简历 √</div> <!-- Display "默认简历" status -->
              <div v-if="res.default" class="rounded bg-base-100 p-6 leading-6">{{ res.open_public === 1 ? "公开" : "非公开" }}</div> <!-- Display "公开状况" status -->
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <dialog id="delete_modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">删除</h3>
      <p class="py-4">你确认要删除你的简历信息吗?</p>
      <div class="modal-action">
        <button class="btn" @click="deleteResume(res.resume_id)">删除</button>
        <button class="btn" @click="showModal('delete_modal', true)">取消</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRequest } from 'vue-hooks-plus';
import { addResumeAPI, getResumeListAPI, setDefaultResumeAPI, deleteResumeAPI, getResumeInfoAPI, editResumeAPI, setPublicResumeAPI } from '@/apis';
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

const resumeEdit = ref({
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
const ageEdit = ref("")
const editIng = ref(false);
const recentEditResume = ref<number>();

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
      if(res.code === 200) {
        ElNotification("新简历创建成功");
        switchPage(3);
        resumeInfo.value = {name: "",sex: 1,age: 0,address: "",id_no: "",phone: "",email: "",job_intention: "",education: "",ability: "",work_experience: "",honor: "",self_evaluation: "",remark: ""};
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
        age.value === ""
})

const switchPage = (id: number) => {
  pageId.value = id;
  updataResumeList();
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

const showModal = (id: string, unshow:boolean = false) => {
  if(unshow){
    (document.getElementById(id) as any).close();
  } else {
    (document.getElementById(id) as any).showModal();
  }
}

const deleteResume = (id: number) => {
  console.log("即将删除");
  console.log(id);
  useRequest(() => deleteResumeAPI({
    resume_id: id
  }, loginStore.token as string), {
    onSuccess(res: any) {
      ElNotification(res.msg);
      if(res.code === 200) {
        showModal('delete_modal', true);
      }
      updataResumeList();
    }
  })
}

const editResume = (id: number) => {
  editIng.value = true;
  switchPage(2);
  recentEditResume.value = id;
  useRequest(() => getResumeInfoAPI({
    resume_id: id
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        resumeEdit.value = res.data;
      }
    }
  })
}

const submitEdit = () => {
  useRequest(() => editResumeAPI({
    resume_id: recentEditResume.value as number,
    name: resumeEdit.value.name,
    sex: resumeEdit.value.sex,
    age: parseInt(ageEdit.value, 10),
    address: resumeEdit.value.address,
    id_no: resumeEdit.value.id_no,
    phone: resumeEdit.value.phone,
    email: resumeEdit.value.email,
    job_intention: resumeEdit.value.job_intention,
    education: resumeEdit.value.education,
    ability: resumeEdit.value.ability,
    work_experience: resumeEdit.value.work_experience,
    honor: resumeEdit.value.honor,
    self_evaluation: resumeEdit.value.self_evaluation,
    remark: resumeEdit.value.remark
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        ElNotification("更改成功");
        switchPage(3);
        editIng.value = false;
      }
      ElNotification(res.msg);
    },
    onError(e) {
      console.log(e);
    }
  })
}

const setPublicResume = (state: number) => {
  const setPublic = ref<number>()
  if(state === 1) setPublic.value = 2;
  else setPublic.value = 1;
  useRequest(() => setPublicResumeAPI({
    open_public: setPublic.value as number
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200)
        ElNotification("状态更改成功");
      else
        ElNotification("状态更改失败");
    }
  })
  setTimeout(() => updataResumeList(), 500);
}

const cancelEdit = () => {
  editIng.value = false;
  pageId.value = 3;
}

</script>