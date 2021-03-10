// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import '@/polyfills'
// Notifications plugin. Used on Notifications page
import Notifications from '@/components/NotificationPlugin'
// Validation plugin used to validate forms
import { configure } from 'vee-validate'
// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents'
// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives'
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from '@/components/SidebarPlugin'

// element ui language configuration
import lang from 'element-ui/lib/locale/lang/es'
import locale from 'element-ui/lib/locale'

locale.use(lang)

// vue-bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// asset imports
import '@/assets/scss/argon.scss'
import '@/assets/vendor/nucleo/css/nucleo.css'
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/es.json'

import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../routes/router'
import VueI18n from 'vue-i18n'

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

export default {
  install (Vue) {
    Vue.use(GlobalComponents)
    Vue.use(GlobalDirectives)
    Vue.use(SideBar)
    Vue.use(Notifications)
    Vue.use(BootstrapVue)
    Vue.use(IconsPlugin)
    Vue.use(VueAxios, axios)
    Vue.use(VueI18n)

    axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
    let token = localStorage.getItem('access_token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    axios.get('/api/token')
      .then(() => {})
      .catch(() => {
        router.push('/login')
      })

    configure({
      classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
      }
    })
  }
}
