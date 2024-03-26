import { defineStore } from "pinia";
import { ref } from "vue";

const useLoginStore = defineStore("login", () => {
  const loginSession = ref(false);
  const token = ref<string|undefined>();
  const userName = ref();
  const avatarUrl = ref();
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

  return{
    loginSession,
    token,
    userName,
    avatarUrl,
    setLogin,
    setToken,
    setUserName,
    setAvatarUrl,
  };
},{ persist: true });

export default useLoginStore;