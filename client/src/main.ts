import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from 'src/router'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'

createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount('#app')
