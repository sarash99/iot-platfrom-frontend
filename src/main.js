import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'
import { messages } from './locale/index.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueApexCharts from 'vue-apexcharts'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.component('date-picker', VuePersianDatetimePicker);
Vue.use(VuePersianDatetimePicker, {
  name: 'custom-date-picker',
  props: {
    inputFormat: 'YYYY-MM-DD HH:mm',
    format: 'jYYYY-jMM-jDD HH:mm',
    editable: false,
    inputClass: 'form-control my-custom-class-name',
    placeholder:'زمان شروع نمایش داده‌ها',
    altFormat: 'YYYY-MM-DD HH:mm',
    color: '#00acc1',
    autoSubmit: false,
    type:'datetime'
    //...
    //... And whatever you want to set as default
    //...
  }
})

const i18n = new VueI18n({
  locale: 'fa',
  messages
})

new Vue({
  router,
  store,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
