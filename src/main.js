import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import '@/CSS/_variables.css'
import '@/CSS/base_styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faPlus } from '@fortawesome/free-solid-svg-icons'

import Vue3Transitions from 'vue3-transitions'

library.add(faUserSecret, faPlus)

createApp(App).use(createPinia()).use(router).use(Vue3Transitions).mount('#app')
