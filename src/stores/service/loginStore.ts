import { defineStore } from "pinia";
import { ref } from "vue";

const useLoginStore = defineStore("login", () => {
  const loginSession = ref(false);
  const token = ref<string|undefined>();
  const userName = ref();
  const avatarUrl = ref();
  const userType = ref(0); //1学生 2企业
  const userEmail = ref("");
  const setLogin = (loginNewSession: boolean) => {
    loginSession.value = loginNewSession;
  };
  const setToken = (tokenCon: string|undefined) => {
    token.value = tokenCon;
  };
  const setUserName = (name: string) => {
    userName.value = name;
  };
  const setAvatarUrl = (url: string) => {
    avatarUrl.value = url;
  };
  const setUserType = (type: number) => {
    userType.value = type;
  };
  const setUserEmail = (email: string) => {
    userEmail.value = email;
  };

  return{
    loginSession,
    token,
    userName,
    avatarUrl,
    userType,
    userEmail,
    setLogin,
    setToken,
    setUserName,
    setAvatarUrl,
    setUserType,
    setUserEmail,
  };
},{ persist: true });

export default useLoginStore;