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
    async fetchTasks(sort, filter) {
      let res = await axios.get(
        "api/tasks/", // ?filter[title]=" + filter.value + "&sort=" + sort.value + "");
        {
          params: {
            sort: sort.value,
            "filter[title]": filter.value,
          },
        }
      );
      this.$state.tasks = res.data.data;
    },

    postImage(image) {
      return process.env.VUE_APP_API_URL + "images/tasks/" + image;
    },

    clearUser() {
      //for persisting our data
      this.$state.tasks = null;
    },
  },
  persist: true, //for pinia-plugin-persistedstate
});
