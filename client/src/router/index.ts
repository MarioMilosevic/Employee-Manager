import { createRouter, createWebHistory } from 'vue-router'
import Home from 'src/features/home/index.vue'
import Login from 'src/features/login/index.vue'
import SignUp from 'src/features/sign-up/index.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUp,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
