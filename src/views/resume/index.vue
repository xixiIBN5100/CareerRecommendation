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
    <div class="bg-base-200 shadow-lg basis-8/12 ml-120 my-60 p-50 rounded-box">
      <add-resume v-if="pageId === 1" @get-page-id="switchPage"></add-resume>
      <edit-resume v-if="pageId === 2" @get-page-id="switchPage" @set-edit-ing="switchEditIng" :resume_id="recentEditResume" :edit-ing="editIng"></edit-resume>
      <check-resume v-if="pageId === 3" @get-page-id="switchPage" @set-edit-ing="switchEditIng" @set-recent-edit-resume="switchEditResume"></check-resume>
      <access-request v-if="pageId === 4"></access-request>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import accessRequest from "./accessRequest.vue";
import addResume from './addResume.vue';
import editResume from './editResume.vue';
import checkResume from './checkResume.vue';

const pageId = ref(1);
const recentEditResume = ref(0);
const editIng = ref(false);

const switchPage = (id: number) => {
  pageId.value = id;
}

const switchEditResume = (resume_id: number) => {
  recentEditResume.value = resume_id;
}

const switchEditIng = (tf: boolean) => {
  editIng.value = tf;
}

</script>