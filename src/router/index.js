import Vue from "vue";
import VueRouter from "vue-router";

import StartPage from "../views/StartPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "StartPage",
    component: StartPage
  },
  {
    path: "/form",
    name: "FormPage",
    component: () => import("../views/FormPage")
  },
  {
    path: "/final",
    name: "FinalPage",
    component: () => import("../views/FinalPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
