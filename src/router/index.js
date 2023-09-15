import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user-store";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AddTaskView from "@/views/AddTaskView.vue";
import AddSubTaskView from "@/views/AddSubTaskView.vue";
import ParentTaskView from "@/views/ParentTaskView.vue";
import EditTaskView from "@/views/EditTaskView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/addsubtask",
    name: "AddSubTask",
    component: AddSubTaskView,
  },
  {
    path: "/addtask",
    name: "addtask",
    component: AddTaskView,
  },
  {
    path: "/edittask/",
    name: "EditTask",
    component: EditTaskView,
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

      // {
      //   path: "addsubtask",
      //   name: "AddSubTask",
      //   component: AddSubTaskView,
      // },
      // {
      //   path: "add-song",
      //   name: "AddSong",
      //   component: AddSong,
      // },
    ],
  },
  {
    path: "/login",
    // beforeEnter: (to, from, next) => {
    //   useUserStore().id ? next('/') : next()
    // },
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    // beforeEnter: (to, from, next) => {
    //   useUserStore().id ? next('/') : next()
    // },
    name: "register",
    component: RegisterView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
