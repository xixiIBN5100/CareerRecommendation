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
          <span>公司名称</span> <input class="input input-primary input-sm float-right w-200" v-model="company">
        </div>
        <div>
          <span>岗位名称</span> <input class="input input-primary input-sm float-right w-200" v-model="title">
        </div>
        <div>
          <span>学历要求{{ education }}</span>
          <select class="select select-primary select-sm float-right w-200" v-model="education">
            <option>大专</option>
            <option>本科</option>
            <option>硕士</option>
            <option>博士</option>
          </select>
        </div>
        <div>
          <span>公司地址</span>
          <div
          class="rounded-md border border-primary float-right w-200 h-32 flex justify-center items-center cursor-pointer"
          @click="() => showModal('adress_modal')"
          >{{ address === "" ? '点击选择' : address }}</div>
        </div>
        <div class="btn btn-sm btn-primary float-end" @click="clearFrom">清空</div>
      </div>
    </div>
    <div v-if="totalPageNum < pageNum || totalPageNum === 0" @click="() => {pageNum = totalPageNum}" class="cursor-pointer">
      {{ totalPageNum === 0 ? '暂无该条件数据' : '该页数过大 点击返回末页'}}
    </div>
    <table class="table" v-else>
      <thead>
        <tr>
          <th style="width: 25%;">岗位名称</th>
          <th style="width: 35%;">公司名称</th>
          <th style="width: 15%;">薪酬</th>
          <th style="width: 15%;">最低学历要求</th>
          <th style="width: 10%;">操作</th>
        </tr>
      </thead>
      <tbody v-for="job in jobList">
        <tr class="border-none cursor-pointer">
          <td>{{ job.title }}</td>
          <td>{{ job.company }}</td>
          <td>{{ job.salary }}</td>
          <td>{{ job.education }}</td>
          <td>
            <button class="btn btn-sm btn-neutral" @click="checkDetail(job)">详情</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialog id="adress_modal" class="modal">
    <div class="modal-box p-30 bg-base-200">
      <div class="flex flex-row h-400 justify-center gap-30">
        <div class="overflow-y-scroll  bg-base-300 rounded-lg p-20 shadow-lg">
          <div
          v-for="(prov, index) in areaList[areaList.length -1]"
          :class="['cursor-pointer', provId === index ? 'text-accent' : undefined]"
          class="text-lg my-6"
          @click="() => selectProv(index)"
          >{{ prov }}</div>
        </div>
        <div class="flex flex-wrap w-200 justify-start gap-10 bg-base-300 overflow-y-scroll p-20 rounded-lg shadow-lg items-start">
          <div v-for="city in areaList[provId]" class="btn btn-ghost" @click="() => selectCity(city)">{{ city }}</div>
        </div>
      </div>
      <div class="modal-action flex justify-center">
        <button class="btn bg-base-100 w-10/12" @click="showModal('adress_modal', true)">关闭</button>
      </div>
    </div>
  </dialog>
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
import router from "@/router";
import areaList from "@/tool/area";

const loginStore = useMainStore().useLoginStore();
const pageNum = ref(1);
const totalPageNum = ref(1);
const jobList = ref();
const jobShowDetailIndex = ref();
const company = ref("");
const title = ref("");
const education = ref("");
const address = ref("");
const provId = ref(0);

const selectCity = (city: string) => {
  address.value = city;
  showModal('adress_modal', true);
}

const selectProv = (index: number) => {
  provId.value = index;
}

const clearFrom = () => {
  company.value = "";
  title.value = "";
  education.value = "";
  address.value = "";
}

const checkDetail = (job: any) => {
  const id = job.id.toString()
  localStorage.setItem( 'id' , id )
  router.push('/info')
}

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