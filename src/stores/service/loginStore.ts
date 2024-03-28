import { defineStore } from "pinia";
import { ref } from "vue";

const useLoginStore = defineStore("login", () => {
  const loginSession = ref(false);
  const token = ref<string|undefined>();
  const userName = ref();
  const avatarUrl = ref();
  const userType = ref(0);
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

  return{
    loginSession,
    token,
    userName,
    avatarUrl,
    userType,
    setLogin,
    setToken,
    setUserName,
    setAvatarUrl,
    setUserType,
  };
},{ persist: true });

export default useLoginStore;