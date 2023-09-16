import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user-store";
import RecycleBinView from "@/views/RecycleBinView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AddTaskView from "@/views/AddTaskView.vue";
import AddSubTaskView from "@/views/AddSubTaskView.vue";
import ParentTaskView from "@/views/ParentTaskView.vue";
import EditTaskView from "@/views/EditTaskView.vue";
import EditSubTaskView from "@/views/EditSubTaskView.vue";

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next("/login");
    },
    name: "home",
    component: HomeView,
  },
  {
    path: "/recyclebin",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next("/login");
    },
    name: "RecycleBin",
    component: RecycleBinView,
  },
  {
    path: "/addsubtask",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next("/login");
    },
    name: "AddSubTask",
    component: AddSubTaskView,
  },
  {
    path: "/addtask",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next("/login");
    },
    name: "addtask",
    component: AddTaskView,
  },
  {
    path: "/edittask/",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next("/login");
    },

    name: "EditTask",
    component: EditTaskView,
  },
  {
    path: "/editsubtask/",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next("/login");
    },
    name: "EditSubTask",
    component: EditSubTaskView,
  },
  {
    path: "/task",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next("/login");
    },
    component: ParentTaskView,
    children: [
      {
        path: "parent",
        name: "ParentTask",
        component: ParentTaskView,
      },
    ],
  },
  {
    path: "/login",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next("/") : next();
    },
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next("/") : next();
    },
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
