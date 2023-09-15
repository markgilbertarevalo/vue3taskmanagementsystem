import axios from "axios";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: null,
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // setUserDetails(res) {
    //   this.$state.id = res.data.user.id;
    //   this.$state.task = res.data.token;
    //   this.$state.status = res.data.user.first_name;
    // },
    async fetchTasks(param) {
      let res = await axios.get("api/tasks/", { param });
      this.$state.tasks = res.data;
    },

    clearUser() {
      //for persisting our data
      this.$state.tasks = null;
    },
  },
  persist: true, //for pinia-plugin-persistedstate
});
