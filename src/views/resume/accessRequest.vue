<template>
  <div class="text-2xl mb-30">
    简历访问请求
  </div>
  <div>
    <div class="join">
      <div class="btn btn-sm join-item" :class="checkId === 0 ? 'btn-neutral' : undefined" @click="() => switchCheckId(0)">全部</div>
      <div class="btn btn-sm join-item" :class="checkId === 1 ? 'btn-neutral' : undefined" @click="() => switchCheckId(1)">未审核</div>
      <div class="btn btn-sm join-item" :class="checkId === 2 ? 'btn-neutral' : undefined" @click="() => switchCheckId(2)">已审核</div>
    </div>
    <div
      class="btn btn-success float-right"
      v-if="student_status === 1 || student_status === 2"
      @click="() => showModal('resume_public_introduce_modal')"
    >你的的默认简历: {{ student_status === 1 ? "已公开" : "未公开"}}</div>
    <dialog id="resume_public_introduce_modal" class="modal">
      <div class="modal-box">
        <h2 class="flex flex-row gap-4 text-xl"><div class="mt-3"><el-icon><InfoFilled /></el-icon></div>关于简历公开</h2>
        <p>
          若将简历公开，则公司账户能访问你默认简历的所有信息<br>
          若简历不公开，则公司账户可以通过向你发送申请来访问你的信息<br>
          你可以审批通过，或者驳回请求<br>
          同样，你审批过的请求可以撤回
        </p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
  <div>
    <table class="table" v-if="postList.length !== 0">
      <thead>
        <tr>
          <th></th>
          <th>企业名</th>
          <th>所属行业</th>
          <th>所在地</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in postList">
          <td>{{ index+1 }}</td>
          <td>{{ post.name }}</td>
          <td>{{ post.industry }}</td>
          <td>{{ post.location }}</td>
          <td><div class="btn btn-sm" @click="() => approvePost(post)">审批</div></td>
        </tr>
        <dialog id="resume_request_modal" class="modal">
          <div class="modal-box">
            <div>
              <h2 class="text-xl font-bold">{{ rentPost.name }}</h2>
              <div class="flex p-8 pb-0">
                <div class="w-1/2">
                  <div>所属行业: {{ rentPost.industry }}</div>
                  <div>企业网站: {{ rentPost.website }}</div>
                </div>
                <div class="w-1/2">
                  <div>所在地: {{ rentPost.location }}</div>
                  <div>企业邮箱: {{ rentPost.email }}</div>
                </div>
              </div>
              <div class="p-8 pt-0">企业简介: {{ rentPost.introduction }}</div>
            </div>
            <div class="modal-action relative">
              <div class="btn btn-sm absolute left-0" :class="rentPost.post_status === 2 ? 'btn-success' : 'btn-warning'" v-if="rentPost.post_status !== 1">审批状态: {{ rentPost.post_status === 2 ? "已同意" : "已拒绝"}}</div>
              <div class="btn btn-sm btn-success btn-outline" @click="() => setPostStatus(rentPost.post_id, 1)" v-if="rentPost.post_status === 1">审批通过</div>
              <div class="btn btn-sm btn-warning btn-outline" @click="() => setPostStatus(rentPost.post_id, 2)" v-if="rentPost.post_status === 1">审批驳回</div>
              <div class="btn btn-sm btn-accent btn-outline" @click="() => resetPostStatus(rentPost.post_id)" v-if="rentPost.post_status !== 1">审批撤回</div>
              <div class="btn btn-sm btn-outline" @click="() => showModal('resume_request_modal', true)">取消</div>
            </div>
          </div>
        </dialog>
      </tbody>
    </table>
    <div v-if="postList.length !== 0" class="flex justify-center mt-16">
      <div class="join">
        <button class="join-item btn" @click="() => switchPage(-1)">«</button>
        <button class="join-item btn">Page 
          <input class="input input-ghost input-sm w-100" v-model="pageNum">
        </button>
        <button class="join-item btn" @click="() => switchPage(1)">»</button>
      </div>
    </div>
    <div class="m-20" v-if="postList.length === 0 && totalPostList.length <= pageSize">
      暂无公司投递申请
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-hooks-plus';
import { ref, watch } from 'vue';
import { getResumeRequestAPI, setPostStatusAPI, resetPostStatusAPI } from "@/apis";
import { useMainStore } from '@/stores';
import { ElNotification } from 'element-plus';

const checkId = ref(0);
const loginStore = useMainStore().useLoginStore();
const postList = ref();
const totalPostList = ref();
const pageNum = ref(1);
const pageSize = 4;
const student_status = ref();
const rentPost = ref({
  email: "",
  name: "",
  industry: "",
  website: "",
  location: "",
  introduction: "",
  post_status: 0,
  post_id: 0
});

postList.value = [];
totalPostList.value = [];

const switchCheckId = (id: number) => {
  checkId.value = id;
  getResumeRequest();
}

const getResumeRequest = () => {
  useRequest(() => getResumeRequestAPI({
    check: checkId.value
  }, loginStore.token as string), {
    onSuccess(res: any) {
      console.log(res);
      if(res.code === 200) {
        pageNum.value = 1;
        totalPostList.value = res.data.post;
        student_status.value = res.data.student_status;
        updatePostList();
      }
    }
  })
}
getResumeRequest();

const showModal = (id: string, unshow:boolean = false) => {
  if(unshow){
    (document.getElementById(id) as any).close();
  } else {
    (document.getElementById(id) as any).showModal();
  }
}

const setPostStatus = (post_id: number, status: number) => {
  useRequest(() => setPostStatusAPI({
    post_id: post_id,
    status: status
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        ElNotification("审批成功");
        getResumeRequest();
        pageNum.value = 1;
        showModal('resume_request_modal', true);
      } else {
        ElNotification(res.msg);
      }
    }
  })
}

const resetPostStatus = (post_id: number) => {
  useRequest(() => resetPostStatusAPI({
    post_id: post_id
  }, loginStore.token as string), {
    onSuccess(res: any) {
      if(res.code === 200) {
        ElNotification("撤回审批成功");
        getResumeRequest();
        pageNum.value = 1;
        showModal('resume_request_modal', true);
      } else {
        ElNotification(res.msg);
      }
    }
  })
}

const approvePost = (post: any) => {
  rentPost.value = post;
  showModal('resume_request_modal');
}

const switchPage = (step: number) => {
  if(0 < pageNum.value + step && pageNum.value + step <= Math.ceil(totalPostList.value.length / pageSize)) {
    pageNum.value += step;
  }
  if(0 >= pageNum.value || pageNum.value > Math.ceil(totalPostList.value.length / pageSize)) {
    pageNum.value = 1;
    ElNotification("超过了页数限制");
  }
}

watch(pageNum, () => updatePostList())

const updatePostList = () => {
  if(typeof pageNum.value === "string") {
    pageNum.value = parseInt(pageNum.value, 10);
  }
  let i = (pageNum.value-1)*pageSize;
  let j = (pageNum.value)*pageSize;
  if(i<0) i=0;
  if(i>=totalPostList.value.length) i=totalPostList.value.length-1;
  if(j<1) j=1;
  if(j>totalPostList.value.length) j=totalPostList.value.length;
  postList.value = totalPostList.value.slice(i,j);
  console.log(postList.value);
};

</script>