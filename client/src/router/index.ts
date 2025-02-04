import { createRouter, createWebHistory } from 'vue-router'
import Home from 'src/features/home/index.vue'
import Login from 'src/features/login/index.vue'
import SignUp from 'src/features/sign-up/index.vue'
import Dashboard from "src/features/dashboard/index.vue"

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
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const userToken = localStorage.getItem('login-token')
  const isAuthRoute = to.name === 'Login' || to.name === 'Sign Up'

  if (!userToken && !isAuthRoute) return { name: 'Login' }
  if (userToken && isAuthRoute) return { name: 'Home' }
})

export default router
