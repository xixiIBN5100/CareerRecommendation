<template>
  <div class="bg-base-300 overflow-y-scroll h-screen">
    <div class="navbar bg-base-100 shadow-lg">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">大学生就业推荐平台</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a @click="router.push('/login')" v-show="loginStore.loginSession === false">登录</a></li>
          <li><a @click="router.push('/register')" v-show="loginStore.loginSession === false">注册</a></li>
          <li><a @click="router.push('/home')" v-show="loginStore.loginSession === true">首页</a></li>
          <li>
            <label class="flex cursor-pointer gap-2" >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              <input type="checkbox" value="synthwave" class="toggle theme-controller" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"/>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </label>
          </li>
        </ul>
      </div>
      <label for="homeNavbar" class="drawer-button" v-if="loginStore.loginSession">
        <div class="avatar m-5 cursor-pointer">
          <div class="w-40 rounded-full">
            <img :src="loginStore.avatarUrl" />
          </div>
        </div>
      </label>
    </div>
    <RouterView/>
    <div class="drawer drawer-end">
      <input id="homeNavbar" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content"></div>
      <div class="drawer-side">
        <label for="homeNavbar" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu p-20 w-300 min-h-full bg-base-200 text-base-content z-50">
          <div class="avatar  ml-10 my-10">
            <div class="w-40 rounded-full">
              <img :src="loginStore.avatarUrl"/>
            </div>
            <span class="text-2xl mx-10 mt-4 text-nowrap">{{ loginStore.userName }}</span>
          </div>
          <div>
            <div class="divider "></div>
            <div class="text-2xl font-bold  mt-20">
              用户设置
            </div>
            <div class="flex flex-col gap-3">
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100 mt-20" @click="() => showModal('password_change_modal')">
                <div class="text text-info"><el-icon><Key /></el-icon></div><span>密码修改</span>
              </div>
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100" @click="() => showModal('avatar_upload_modal')">
                <div class="text text-primary"><el-icon><PictureRounded /></el-icon></div>头像修改
              </div>
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100" @click="() => jumpPage('/resetEmail')">
                <div class="text text-amber-500"><el-icon><Refresh /></el-icon></div>重置邮箱
              </div>
            </div>
            <div class="divider mt-15"></div>
            <div class="text-2xl font-bold">
              页面概览
            </div>
            <div class="flex flex-col gap-3" v-if="loginStore.userType === 1">
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl  my-6 bg-base-100 mt-20" @click="() => jumpPage('/resume')">
                <div class="text text-sky-500"><el-icon><Document /></el-icon></div>简历
              </div>
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100" @click="() => jumpPage('/jobDatabase')">
                <div class="text text-emerald-500"><el-icon><MessageBox /></el-icon></div>岗位库
              </div>
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100" @click="gotoCapability">
                <div class="text text-rose-500"><el-icon><Cpu /></el-icon></div>能力评估
              </div>
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100" @click="() => jumpPage('/robotChat')">
                <div class="text text-gray-500"><el-icon><Headset /></el-icon></div>私聊机器人
              </div>
            </div>
            <div class="flex flex-col gap-3" v-if="loginStore.userType === 2">
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100 mt-20" @click="() => jumpPage('/enterprise/enterpriseInfo')">
                <div class="text text-sky-500"><el-icon><PieChart /></el-icon></div>企业信息
              </div>
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100" @click="() => jumpPage('/enterprise/studentsList')">
                <div class="text text-emerald-500"><el-icon><DocumentCopy /></el-icon></div>学生列表
              </div>
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100" @click="() => jumpPage('/enterprise/applyCheckResume')">
                <div class="text text-rose-500"><el-icon><Document /></el-icon></div>简历查看申请
              </div>
            </div>
            <div class="divider mt-15"></div>
            <div class="text-2xl font-bold">
              账户状态
            </div>
            <div class="flex flex-col gap-3 items-center">
              <div class="cursor-pointer btn btn-sm justify-start font-medium w-300 h-45 shadow-2xl my-6 bg-base-100 mt-20" @click="logout">
                <div class="text text-warning"><el-icon><SwitchButton /></el-icon></div>注销
              </div>
            </div>
            <div class="divider m-15"></div>
          </div>
        </ul>
      </div>
    </div>
    <dialog id="avatar_upload_modal" class="modal">
      <div class="modal-box p-30 bg-base-300">
        <h3 class="font-bold text-2xl">修改头像</h3>
        <div class="flex flex-row gap-30 p-20 mt-20">
          <div class="avatar ml-15">
            <div class="w-80 rounded-full ">
              <img :src="loginStore.avatarUrl"/>
            </div>
          </div>
          <div class="my-auto">
            <input type="file" class="file-input file-input-bordered file-input-primary  w-11/12 ml-15" @change="fileChange"/>
          </div>
        </div>
        <div class="modal-action flex justify-evenly">
          <div class="btn btn-success btn-outline" :class="avatarUploaded ? undefined : 'btn-disabled'" @click="setAvatar">确定更改</div>
          <div class="btn btn-warning btn-outline" @click="() => showModal('avatar_upload_modal', true)">取消</div>
        </div>
      </div>
    </dialog>
    <dialog id="password_change_modal" class="modal">
      <div class="modal-box bg-base-300">
        <h3 class="font-bold text-2xl ml-10 mt-10">修改密码</h3>
        <div class="flex flex-col gap-20 p-20 mt-20 items-center ">
          <label class="input input-bordered flex items-center gap-5 w-10/12 shadow-lg" >
            <span class="font-bold">旧密码:</span>
            <input type="text" class="grow" v-model="old_password" />
          </label>
          <label class="input input-bordered flex items-center gap-5 w-10/12 shadow-lg">
            <span class="font-bold">新密码:</span>
            <input type="password" class="grow" v-model="new_password" />
          </label>
          <label class="input input-bordered flex items-center gap-5 relative w-10/12 shadow-lg">
            <span class="font-bold">确认密码:</span>
            <input type="password" class="grow"  v-model="confirm_password" />
            <span
            class="absolute right-4 rounded-lg border border-warning text-warning text-sm font-light p-4"
            v-if="confirm_password !== new_password && confirm_password !== '' && new_password !== ''">两次密码不相同</span>
          </label>
        </div>
        <div class=" flex justify-evenly my-10">
          <div class="btn btn-success btn-outline" @click="setPassword"
            :class="old_password !== '' && new_password !== '' && confirm_password !== '' && new_password === confirm_password ? undefined : 'btn-disabled'"
          >确定更改</div>
          <div class="btn btn-warning btn-outline" @click="() => showModal('password_change_modal', true)">取消</div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from "@/router";
import { useMainStore } from './stores';
import { ElNotification } from "element-plus";
import { useRequest } from 'vue-hooks-plus';
import { setAvatarAPI, setPasswordAPI } from "@/apis";
import { ref } from 'vue';
import marked from 'marked';

const loginStore = useMainStore().useLoginStore();
const temporaryStore = useMainStore().useTemporaryStore();
const avatarFile = ref();
const avatarUploaded = ref(false);
const old_password = ref("");
const new_password = ref("");
const confirm_password = ref("");

const gotoCapability = () => {
  temporaryStore.setIsCapability(true);
  jumpPage("/jobDatabase");
}

const jumpPage = (url: string) => {
  (document.getElementById("homeNavbar") as any).checked = false;
  setTimeout(() => {
    router.push(url);
  },300);
};

const logout = () => {
  router.push('/login');
  loginStore.setLogin(false);
  loginStore.setToken("");
  loginStore.setUserName("");
  loginStore.setAvatarUrl("");
  loginStore.setUserType(0);
  ElNotification.success("登出成功");
  (document.getElementById("homeNavbar") as any).checked = false;
}

const showModal = (id: string, unshow:boolean = false) => {
  if(unshow){
    (document.getElementById(id) as any).close();
  } else {
    (document.getElementById(id) as any).showModal();
  }
}

const setAvatar = () => {
  const formData = new FormData();
  formData.append("avatar", avatarFile.value);
  useRequest(() => setAvatarAPI(formData, loginStore.token as string), {
    onSuccess(res: any){
      if(res.code === 200){
        loginStore.setAvatarUrl(res.data.avatar);
        ElNotification("头像更改成功");
        showModal('avatar_upload_modal', true);
      }
    }
  })
}

const fileChange = (event: any) => {
  avatarFile.value = event.target.files[0];
  avatarUploaded.value = true;
  if(avatarFile.value.type != "image/jpeg" && avatarFile.value.type != "image/png"){
    avatarFile.value = null;
    ElNotification({
      title: 'Error',
      message: '文件格式错误，请选择正确的文件格式',
      type: 'error',
    });
    avatarUploaded.value = false;
  }
}

const setPassword = () => {
  useRequest(() => setPasswordAPI({
    old_password: old_password.value,
    new_password: new_password.value
  }, loginStore.token as string), {
    onSuccess(res: any) {
      console.log(res);
      if(res.code === 200) {
        ElNotification("密码修改成功");
        showModal("password_change_modal", true);
        new_password.value = "";
        old_password.value = "";
        confirm_password.value = "";
      } else {
        ElNotification(res.msg);
      }
    }
  });
}

</script>