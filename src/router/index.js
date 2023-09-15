import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AddTaskView from "@/views/AddTaskView.vue";
import ParentTaskView from "@/views/ParentTaskView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/addtask",
    name: "addtask",
    component: AddTaskView,
  },
  {
    path: "/task",
    name: "task",
    component: ParentTaskView,
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
