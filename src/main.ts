import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Quasar, Notify, LoadingBar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/fontawesome-v6'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
    LoadingBar
  }, // import Quasar plugins and add here
  iconSet: quasarIconSet,
  config: {
    //brand: {
    // primary: '#e46262',
    // ... or all other brand colors
    //},
    //notify: {...}, // default set of options for Notify Quasar plugin
    //loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: {
      color: 'accent',
      size: '5px',
      position: 'bottom'
    } // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
})

const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')
