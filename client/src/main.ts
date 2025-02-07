import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'src/scss/main.scss'
import App from 'src/App.vue'
import router from 'src/router'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount('#app')
