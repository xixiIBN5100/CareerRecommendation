<template>
  <div class="flex flex-row px-60 py-30">
    <div class="basis-1/8">
      <div class="text-5xl p-30 text-nowrap">
        岗位库
      </div>
      <ul class="menu bg-base-200 rounded-box">
        <li>
          <a :class="pageId === 1 ? 'active' : undefined" @click="() => switchPage(1)">搜索</a>
        </li>
        <li>
          <a :class="pageId === 2 ? 'active' : undefined" @click="() => switchPage(2)">知识图谱</a>
        </li>
        <li>
          <a :class="pageId === 3 ? 'active' : undefined" @click="() => switchPage(3)">Bot</a>
        </li>
      </ul>
    </div>
    <div class="bg-base-200 shadow-lg basis-3/4 mx-50 my-20 p-30 rounded-box">
      <search v-if="pageId === 1"></search>
      <knowledge-map v-if="pageId === 2"></knowledge-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Search from "./search.vue";
import KnowledgeMap from "./knowledgeMap.vue";

const pageId = ref(1);

const switchPage = (id: number) => {
  pageId.value = id;
}

</script>