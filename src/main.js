import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { useInspectionStore } from './stores/inspection'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const vuetify = createVuetify({
  components: {
    ...components,
    VFileUpload,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          'custom-color': 'hsl(177, 100%, 34%)',
          'cardBg': 'hsl(0, 0%, 12%)'
        }
      }
    }
  }

})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(pinia)

window.addEventListener('online', () => {
  const store = useInspectionStore()
  store.flushPendingSync()
})

app.mount('#app')
