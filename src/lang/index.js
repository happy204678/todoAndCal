import Vue from 'vue'
import store from '@/store'
import VueI18n from 'vue-i18n'
import cn from './cn.json'
import en from './en.json'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.state.language,
  messages: {
    'cn': cn,
    'en': en
  }
})
export default i18n
