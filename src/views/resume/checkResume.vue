<template>
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
          <div class="btn btn-sm btn-neutral" @click="() => editResume(res.resume_id)">编辑</div>
          <div class="btn btn-sm btn-neutral" @click="() => showModal('delete_modal')">删除</div>
          <div class="btn btn-sm btn-neutral" v-if="!res.default" @click="() => setDefaultResume(res.resume_id)">设为默认简历</div>
          <div class="btn btn-sm btn-neutral" v-if="res.default" @click="() => setPublicResume(res.open_public)">{{ res.open_public === 1 ? "取消公开" : "公开简历" }}</div>
        </td>
        <td>
          <div v-if="res.default" class="leading-9 mr-8 inline-block">默认简历 √</div> <!-- Display "默认简历" status -->
          <div v-if="res.default" class="rounded bg-base-100 p-6 leading-6 inline-block">{{ res.open_public === 1 ? "公开" : "非公开" }}</div> <!-- Display "公开状况" status -->
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
</template>

<script setup lang="ts">
import { useRequest } from 'vue-hooks-plus';
import { setDefaultResumeAPI, getResumeListAPI, deleteResumeAPI, setPublicResumeAPI } from '@/apis';
import { useMainStore } from '@/stores';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';

const emit = defineEmits(["getPageId", "setRecentEditResume", "setEditIng"]);
const loginStore = useMainStore().useLoginStore();
const resumeList = ref();

const getPageId = (pageId: number) => {
  emit("getPageId", pageId);
};

const setRecentEditResume = (resume_id: number) => {
  emit("setRecentEditResume", resume_id);
}

const setEditIng = (tf: boolean) => {
  emit("setEditIng", tf);
}

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

const editResume = (id: number) => {
  setEditIng(true);
  console.log("debug: setEditIng");
  setRecentEditResume(id);
  getPageId(2);
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

const showModal = (id: string, unshow:boolean = false) => {
  if(unshow){
    (document.getElementById(id) as any).close();
  } else {
    (document.getElementById(id) as any).showModal();
  }
}

</script>