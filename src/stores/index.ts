import { defineStore } from "pinia";
import useLoginStore from "./service/loginStore";
import useTemporaryStore from "./service/temporaryStore";

export const useMainStore = defineStore("main", () => {
  return {
    useLoginStore,
    useTemporaryStore,
  };
},{ persist: true });