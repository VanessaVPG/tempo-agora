import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import { pt_BR } from '../src/locales/pt_br.js'
import { en } from '../src/locales/en.js'

import './assets/tailwindcss.css';


const languages = {
    pt_BR,
    en
}

const i18n = createI18n({
    locale: 'pt_BR',
    fallbackLocale: 'pt_BR',
    messages: languages
})

const app = createApp(App)

app.use(router, i18n)

app.mount('#app')
