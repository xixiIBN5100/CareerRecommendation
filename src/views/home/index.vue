<template>

  <div class="card transform transition-transform duration-800 hover:-translate-y-2 shadow-md hover:shadow-lg ease-in-out">
    <div class="card-body bg-base-200 mt-50 ">
      <div class="card-title flex justify-center text-3xl">当下热门趋势是什么?</div>
    </div>
  </div>
 <div class="flex justify-evenly my-70 ">
   <div class="flex justify-evenly ">
     <div class="card transform transition-transform duration-800 hover:-translate-y-2 shadow-md hover:shadow-lg ease-in-out bg-base-100 md:w-380 sm:w-300">
       <div class="card-body">
         <div class="card-title flex justify-center text-lg">热门工作岗位</div>
         <div class="skeleton h-30 mt-30" v-for="index in 7" :key="index"  v-if="isLoadingWork"></div>
         <ul class="menu mt-15" v-if="!isLoadingWork">
           <li v-for="(item, index) in hotWork" :key="item.id">
             <a :class="{ 'text-3xl': index === 0, 'text-xl': index === 1 , 'bg-neutral-content' : index % 2 === 0}" class="my-5"> <span>No.{{ index+1 }}</span>&ensp;&ensp;{{ item.name }}</a>
           </li>
         </ul>
       </div>
     </div>
   </div>
   <div class="divider lg:divider-horizontal"></div>
   <div class="card transform transition-transform duration-800 hover:-translate-y-2 shadow-md hover:shadow-lg ease-in-out bg-base-100 md:w-380 sm:w-300">
    <div class="card-body">
      <div class="card-title flex justify-center">热门工作地址</div>
      <div class="skeleton h-30 mt-30" v-for="index in 7" :key="index"  v-if="isLoadingAddress"></div>
      <ul class="menu mt-15" v-if="!isLoadingAddress">
        <li v-for="(item, index) in hotWorkAddress" :key="item.id">
          <a :class="{ 'text-3xl': index === 0, 'text-xl': index === 1 , 'bg-neutral-content' : index % 2 === 0}" class="my-5"> <span>No.{{ index+1 }}</span>&ensp;&ensp;{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
   <div class="divider lg:divider-horizontal"></div>
  <div class="card transform transition-transform duration-800 hover:-translate-y-2 shadow-md hover:shadow-lg ease-in-out bg-base-100 md:w-380 sm:w-300">
    <div class="card-body">
      <div class="card-title flex justify-center">热门工作技能点</div>
      <div class="skeleton h-30 mt-30" v-for="index in 7" :key="index"  v-if="isLoadingSkill"></div>
      <ul class="menu mt-15" v-if="!isLoadingSkill">
        <li v-for="(item, index) in hotWorkSkill" :key="item.id">
          <a :class="{ 'text-3xl': index === 0, 'text-xl': index === 1 , 'bg-neutral-content' : index % 2 === 0}" class="my-5"> <span>No.{{ index+1 }}</span>&ensp;&ensp;{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</div>


</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRequest} from "vue-hooks-plus";
import {getHotAddressAPI, getHotSkillAPI, getHotWorkAPI} from "@/apis";
import {ElNotification} from "element-plus";
import router from "@/router";
import {useMainStore} from "@/stores";
import {sleep} from "vue-hooks-plus/es/utils/sleep";
const loginStore = useMainStore().useLoginStore();
const isLoadingWork = ref(true)
const hotWork = ref();
const hotWorkAddress = ref();
const hotWorkSkill = ref();
const isLoadingAddress = ref(true);
const isLoadingSkill = ref(true)

useRequest(() => getHotWorkAPI(loginStore.token as string), {
  onSuccess(res:any){
    console.log(res);
    if(res.code === 200) {
      isLoadingWork.value = false
      hotWork.value = res.data
    }else{
      ElNotification.error(res.msg)

    }
  },
  onError(e){
    ElNotification.error('获取热门工作岗位失败，请重试' + e);
  }
})

useRequest(() => getHotAddressAPI(loginStore.token as string), {
  onSuccess(res:any){
    console.log(res);
    if(res.code === 200) {
      isLoadingAddress.value = false
      hotWorkAddress.value = res.data
      console.log(hotWorkAddress.value)
    }else{
      ElNotification.error(res.msg)

    }
  },
  onError(e){
    ElNotification.error('获取热门工作地址失败，请重试' + e);
  }
})

useRequest(() => getHotSkillAPI(loginStore.token as string), {
  onSuccess(res:any){
    console.log(res);
    if(res.code === 200) {
      isLoadingSkill.value = false
      hotWorkSkill.value = res.data
    }else{
      ElNotification.error(res.msg)

    }
  },
  onError(e){
    ElNotification.error('获取热门工作能力点失败，请重试' + e);
  }
})
</script>


<style scoped>

</style>