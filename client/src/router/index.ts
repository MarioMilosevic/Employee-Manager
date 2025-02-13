import { createRouter, createWebHistory } from 'vue-router'
import { getUserData } from 'src/api/api'
import { useUserStore } from 'src/stores/userStore'
import { useSortFilterStore } from 'src/stores/sortFIlterOptionsStore'
import Home from 'src/features/home/IndexHome.vue'
import Login from 'src/features/login/IndexLogin.vue'
import SignUp from 'src/features/sign-up/IndexSignUp.vue'
import Dashboard from 'src/features/dashboard/IndexDashboard.vue'
import NotFound from 'src/features/notFound/IndexNotFound.vue'

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
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  // console.log('kada se ovo desi')
  const userStore = useUserStore()
  const sortFilterStore = useSortFilterStore()
  const userToken = localStorage.getItem('login-token')
  const isAuthenticationRoute = to.name === 'Login' || to.name === 'Sign Up'

  if (!userToken && !isAuthenticationRoute) return { name: 'Login' }
  if (userToken && isAuthenticationRoute) {
    // console.log('uslo odje')
    return { name: 'Home', query: { sort: sortFilterStore.sortFilterOptions.sort } }
  }

  if (userToken) {
    const { data: user } = await getUserData(userToken as string)
    userStore.setUser(user)
    if (user?.role !== 'ADMIN' && to.name !== 'Home') {
      // return { name: 'Home' }
      // console.log('uslo mozd aodje')
      return { name: 'Home', query: { sort: sortFilterStore.sortFilterOptions.sort } }
    }
  }
})

export default router
