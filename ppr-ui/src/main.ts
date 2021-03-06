import Vue, { VNode } from 'vue'
import VueCompositionApi from '@vue/composition-api'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from '@/App.vue'
import configHelper from '@/utils/config-helper'
import router from '@/router/router'
import store from './store'
import layoutPublic from '@/layouts/LayoutPublic.vue'
import layoutUser from '@/layouts/LayoutUser.vue'
import SentryHelper from '@/utils/sentry-helper'
import './assets/styles/styles.scss'
import { Config } from "@/utils/app-data"
import { initializeVueLdClient } from '@/flags/ld-client'

const opts = { iconfont: 'mdi' }

Vue.use(VueCompositionApi)
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.component('public-layout', layoutPublic)
Vue.component('user-layout', layoutUser)

const userKey = sessionStorage.getItem('userKey') ? sessionStorage.getItem('userKey') : 'unauthenticated-user'
sessionStorage.setItem('userKey', userKey)
let appConfig: Config

configHelper.fetchConfig()
  .then((cfg: Config): void => {
    appConfig = cfg
    return SentryHelper.setup(appConfig)
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  }).then(() => {
    return initializeVueLdClient(appConfig.launchDarklyClientKey, userKey)
  })
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .then(() => {
    new Vue({
      vuetify: new Vuetify(opts),
      router,
      store,
      render: (h): VNode => h(App)
    }).$mount('#app')
  })
  .catch((error): void => {
    console.error('error fetching config -', error)
    alert('Fatal error loading app')
  })
