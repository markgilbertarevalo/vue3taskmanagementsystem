import axios from "axios";
import { defineStore } from "pinia";

export const useParentTaskStore = defineStore("parent_task", {
  state: () => ({
    task: null,
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // setUserDetails(res) {
    //   this.$state.id = res.data.user.id;
    //   this.$state.task = res.data.token;
    //   this.$state.status = res.data.user.first_name;
    // },
    async fetchTask(id) {
      let res = await axios.get("api/tasks/" + id + "");
      this.$state.task = res.data.data;
    },

    postImage(image) {
      return process.env.VUE_APP_API_URL + "images/tasks/" + image;
    },

    clearUser() {
      //for persisting our data
      this.$state.task = null;
    },
  },
  persist: true, //for pinia-plugin-persistedstate
});
