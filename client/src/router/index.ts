import { createRouter, createWebHistory } from 'vue-router'
import Home from 'src/features/home/IndexHome.vue'
import Login from 'src/features/login/IndexLogin.vue'
import SignUp from 'src/features/sign-up/IndexSignUp.vue'
import Dashboard from 'src/features/dashboard/IndexDashboard.vue'
import { getUserData } from 'src/api/api'
// import { getUserData } from 'src/api/api'

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

router.beforeEach(async (to) => {
  const userToken = localStorage.getItem('login-token')
  const isAuthRoute = to.name === 'Login' || to.name === 'Sign Up'

  if (!userToken && !isAuthRoute) return { name: 'Login' }
  if (userToken && isAuthRoute) return { name: 'Home' }

  if (userToken) {
    const { data: user } = await getUserData(userToken as string)

    if (user?.role !== 'ADMIN' && to.name !== 'Home') {
      return { name: 'Home' }
    }
  }
})

export default router
