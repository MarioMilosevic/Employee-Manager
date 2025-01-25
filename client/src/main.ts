import { createApp } from 'vue'
import "./scss/main.scss";
import App from './App.vue'
import router from 'src/router'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'

createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount('#app')
