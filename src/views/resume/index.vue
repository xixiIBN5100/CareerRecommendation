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
        <li class="my-5">
          <a :class="pageId === 4 ? 'active' : undefined" @click="() => switchPage(4)">简历访问请求</a>
        </li>
      </ul>
    </div>
    <div class="bg-base-200 shadow-lg basis-8/12 ml-120 my-60 p-50 rounded-box" v-if="pageId === 1">
      <add-resume @get-page-id="switchPage"></add-resume>
    </div>
    <div class="bg-base-200 shadow-lg basis-3/4 ml-120 my-60 p-30 rounded-box" v-if="pageId === 2">
      <edit-resume @get-page-id="switchPage" :resume_id="recentEditResume"></edit-resume>
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
            <th>状态</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="res in resumeList" :class="res.default ? 'bg-base-300' : undefined">
            <td>{{ res.id }}</td> <!-- Display "编号" in this column -->
            <td>{{ res.remark }}</td> <!-- Display "简介" in this column -->
            <td class="flex flex-row gap-4">
              <!-- <div class="btn btn-sm btn-neutral" @click="() => editResume(res.resume_id)">编辑</div> -->
              <div class="btn btn-sm btn-neutral" @click="() => showModal('delete_modal')">删除</div>
              <div class="btn btn-sm btn-neutral" v-if="!res.default" @click="() => setDefaultResume(res.resume_id)">设为默认简历</div>
              <div class="btn btn-sm btn-neutral" v-if="res.default" @click="() => setPublicResume(res.open_public)">{{ res.open_public === 1 ? "取消公开" : "公开简历" }}</div>
            </td>
            <td class="flex flex-row gap-4">
              <div v-if="res.default" class="leading-9 mr-8">默认简历 √</div> <!-- Display "默认简历" status -->
              <div v-if="res.default" class="rounded bg-base-100 p-6 leading-6">{{ res.open_public === 1 ? "公开" : "非公开" }}</div> <!-- Display "公开状况" status -->
            </td>
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
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="bg-base-200 shadow-lg basis-3/4 ml-120 my-60 p-30 rounded-box" v-if="pageId === 4">
      <access-request></access-request>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRequest } from 'vue-hooks-plus';
import { getResumeListAPI, setDefaultResumeAPI, deleteResumeAPI, getResumeInfoAPI, editResumeAPI, setPublicResumeAPI } from '@/apis';
import { useMainStore } from '@/stores';
import { ElNotification } from 'element-plus';
import accessRequest from "./accessRequest.vue";
import addResume from './addResume.vue';
import editResume from './editResume.vue';

const loginStore = useMainStore().useLoginStore();
const pageId = ref(1);
const resumeList = ref();
const recentEditResume = ref(0);

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

const switchPage = (id: number) => {
  pageId.value = id;
  updataResumeList();
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

// const editResume = (id: number) => {
//   editIng.value = true;
//   switchPage(2);
//   recentEditResume.value = id;
//   useRequest(() => getResumeInfoAPI({
//     resume_id: id
//   }, loginStore.token as string), {
//     onSuccess(res: any) {
//       if(res.code === 200) {
//         resumeEdit.value = res.data;
//       }
//     }
//   })
// }

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

</script>