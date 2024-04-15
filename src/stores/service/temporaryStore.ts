import { defineStore } from "pinia";
import { ref } from "vue";

const useTemporaryStore = defineStore("temporary", () => {
  const jobDatabaseIsCapability = ref(false);

  const setIsCapability = (is: boolean) => {
    jobDatabaseIsCapability.value = is;
  };

  return{
    jobDatabaseIsCapability,
    setIsCapability,
  };
});

export default useTemporaryStore;