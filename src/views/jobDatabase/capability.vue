<template>
  <div class="text-2xl mb-30">能力评估</div>
  <div class="flex flex-col justify-center px-30 mb-20">
    <div class="text-xl mb-5">
      个人意向评估
    </div>
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-primary">
          <el-icon :size="50"><Promotion /></el-icon>
        </div>
        <div class="stat-title">个人意向</div>
        <div class="stat-value text-primary">{{ myAmid }}</div>
        <div class="stat-desc">源自于你的默认简历意向</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <el-icon :size="50"><OfficeBuilding /></el-icon>
        </div>
        <div class="stat-title">系统建议</div>
        <div class="stat-value text-secondary">{{ myAmid === "未填写" ? "-" : intentionData.advice }}</div>
        <div class="stat-desc">源于ai分析 仅供参考</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-accent">
          <div class="radial-progress" :style="'--value:'+intentionData.match*100+';'" role="progressbar">{{ myAmid === "未填写" ? "-" : intentionData.match >= 0.8 ? "高" : (intentionData.match >= 0.6 ? "中" : "低") }}</div>
        </div>
        <div class="stat-title">匹配度</div>
        <div class="stat-value text-accent">{{ myAmid === "未填写" ? "-" : intentionData.match*100 }}%</div>
      </div>
    </div>
  </div>
  <div class="flex flex-col px-30">
    <div class="text-xl mb-5">
      个人能力评估
    </div>
    <div class="carousel w-full shadow bg-base-100 rounded-lg">
      <div v-for="(job, index) in abilityData" :id="'item'+index" class="carousel-item w-full">
        <div class="m-30 flex flex-col gap-6">
          <div class="text-xl text-info">{{ job.job_title }}</div>
          <div class="flex gap-10">
            <div>
              <div class="font-bold">公司名称:</div>
              <div>{{ job.job_company }}</div>
            </div>
            <div>
              <div class="font-bold">薪资水平:</div>
              <div>{{ job.job_salary }}</div>
            </div>
            <div>
              <div class="font-bold">公司地址:</div>
              <div>{{ job.job_address }}</div>
            </div>
          </div>
          <div>
            <a class="link-info" :href="job.job_link">详情链接</a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div role="tablist" class="tabs tabs-bordered w-200">
        <a v-for="(_, index) in abilityData" role="tab" :class="['tab', jobRecentId === index ? 'tab-active' : undefined]" :href="'#item'+index" @click="jobRecentId = index">{{ index+1 }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-hooks-plus';
import { useMainStore } from '@/stores';
import { getAbilityEvaluate, getIntentionEvaluate, getResumeInfoAPI } from '@/apis';
import { ref } from 'vue';


const loginStore = useMainStore().useLoginStore();
const abilityData = ref();
const intentionData = ref();
const jobRecentId = ref(0);
const myAmid = ref();

useRequest(() => getResumeInfoAPI({resume_id:-1}, loginStore.token as string), {
  onSuccess(res: any) {
    if(res.code === 200) {
      myAmid.value = res.data.job_intention
    }
  }
})

useRequest(() => getAbilityEvaluate(loginStore.token as string), {
  onSuccess(res: any) {
    if(res.code === 200) {
      abilityData.value = res.data;
      console.log(abilityData.value);
    }
  }
})

useRequest(() => getIntentionEvaluate(loginStore.token as string), {
  onSuccess(res: any) {
    if(res.code === 200) {
      intentionData.value = res.data;
    }
  }
})


</script>