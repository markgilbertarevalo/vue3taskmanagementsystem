import axios from "axios";
import { defineStore } from "pinia";

export const useEditTaskStore = defineStore("edittask", {
  state: () => ({
    task: null,
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async fetchTask(id) {
      let res = await axios.get("api/tasks/" + id);
      this.$state.task = res.data.data;
    },

    clearTask() {
      //for persisting our data
      this.$state.task = null;
    },
  },
  persist: true, //for pinia-plugin-persistedstate
});
