<template>
  <div class="text-2xl mb-30">
    搜索岗位库
  </div>
  <div class="overflow-x-auto">
    <div class="collapse bg-base-100">
      <input type="checkbox" />
      <div class="collapse-title">
        搜索
      </div>
      <div class="collapse-content flex flex-col gap-4">
        <div>
          <span>公司名称</span> <input class="input input-primary input-sm float-right" v-model="company">
        </div>
        <div>
          <span>岗位名称</span> <input class="input input-primary input-sm float-right" v-model="title">
        </div>
        <div>
          <span>最低学历要求</span> <input class="input input-primary input-sm float-right" v-model="education">
        </div>
        <div>
          <span>地址</span> <input class="input input-primary input-sm float-right" v-model="address">
        </div>
      </div>
    </div>
    <div v-if="totalPageNum < pageNum" @click="() => {pageNum = totalPageNum}" class="cursor-pointer">
      该页数过大 点击返回末页
    </div>
    <table class="table" v-else>
      <thead>
        <tr>
          <th>岗位名称</th>
          <th>公司名称</th>
          <th>薪酬</th>
          <th>最低学历要求</th>
        </tr>
      </thead>
      <tbody v-for="(job, index) in jobList">
        <tr class="border-none cursor-pointer">
          <td>{{ job.title }}</td>
          <td>{{ job.company }}</td>
          <td>{{ job.salary }}</td>
          <td>{{ job.education }}</td>
          <td>
            <button class="btn btn-sm btn-neutral" @click="showModal('job_detail_modal')">详情</button>
          </td>
        </tr>
        <dialog id="job_detail_modal" class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">{{ job.title }}</h3>
            <div class="m-3">
              <span class="font-bold">公司名称</span>
              <span class="float-right text-xs">{{ job.company }}</span>
            </div>
            <div class="m-3">
              <span class="font-bold">薪资条件</span>
              <span class="float-right text-xs">{{ job.salary }}</span>
            </div>
            <div class="m-3">
              <span class="font-bold">学历要求</span>
              <span class="float-right text-xs">{{ job.education }}</span>
            </div>
            <div class="m-3">
              <span class="font-bold">联系人</span>
              <span class="float-right">{{ job.hiring_manager }}</span>
            </div>
            <div class="m-3">
              <span class="font-bold">地址</span>
              <span class="float-right">{{ job.address }}</span>
            </div>
            <div class="m-3">
              <span class="font-bold">技能要求</span>
              <span class="float-right text-xs p-3">{{ job.description }}</span>
            </div>
            <div class="m-3">
              <a class="btn-link font-bold" :href="job.link">详情链接</a>
            </div>
            <div class="modal-action">
              <button class="btn" @click="showModal('job_detail_modal', true)">关闭</button>
            </div>
          </div>
        </dialog>
      </tbody>
    </table>
  </div>
  <div class="flex justify-center mt-16">
    <div class="join">
      <button class="join-item btn" @click="() => switchPageNum(-1)">«</button>
      <button class="join-item btn">
        page
        <input class="input input-sm input-ghost w-100" v-model="pageNum">
      </button>
      <button class="join-item btn" @click="() => switchPageNum(1)">»</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMainStore } from '@/stores';
import { useRequest } from 'vue-hooks-plus';
import { checkJobDatabaseAPI } from '@/apis';

const loginStore = useMainStore().useLoginStore();
const pageNum = ref(1);
const totalPageNum = ref(1);
const jobList = ref();
const jobShowDetailIndex = ref();
const company = ref("");
const title = ref("");
const education = ref("");
const address = ref("");

const checkJobDatabase = () => {
  useRequest(() => checkJobDatabaseAPI({
    page_num: pageNum.value,
    page_size: 4,
    company: company.value,
    title: title.value,
    education: education.value,
    address: address.value
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        jobList.value = res.data.data;
        totalPageNum.value = res.data.total_page_num;
        console.log(jobList.value);
      }
    }
  })
}
checkJobDatabase();

const showDetail = (index: number) => {
  if(index === jobShowDetailIndex.value) {
    jobShowDetailIndex.value = undefined;
  } else {
    jobShowDetailIndex.value = index;
  }
}

const switchPageNum = (num: number) => {
  if(typeof pageNum.value === 'string' )
    pageNum.value = parseInt(pageNum.value, 10);
  if(0 < pageNum.value + num && pageNum.value + num <= totalPageNum.value) {
    pageNum.value += num;
  }
}

watch(pageNum, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

watch(company, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

watch(title, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

watch(education, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

watch(address, () => {
  checkJobDatabase();
  jobShowDetailIndex.value = undefined;
})

const showModal = (id: string, unshow:boolean = false) => {
  if(unshow){
    (document.getElementById(id) as any).close();
  } else {
    (document.getElementById(id) as any).showModal();
  }
}
</script>