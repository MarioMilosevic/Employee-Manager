import { createRouter, createWebHistory } from "vue-router";
import Home from "src/features/home/index.vue"

export const routes = [
  {
    path: '/',
    name: "Home",
    component:Home
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   // component:Login`
  // },
  // {
  //   path: "/sign-up",
  //   name: "SignUp",
  //   // component:SignUp
  // },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router