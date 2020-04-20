import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from "./filters/date.filter"
import currencyFilter from "./filters/currency.filter"
import tooltipDirective from './directives/tooltip.directive'
import messagePlugin from './utils/message.plugin'
import Loader from "./components/app/Loader";
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
    apiKey: "AIzaSyCN0x_0MEoDd6c5txREp9mrUElI9mZ3wic",
    authDomain: "vuejs-crm-d9aac.firebaseapp.com",
    databaseURL: "https://vuejs-crm-d9aac.firebaseio.com",
    projectId: "vuejs-crm-d9aac",
    storageBucket: "vuejs-crm-d9aac.appspot.com",
    messagingSenderId: "884474605799",
    appId: "1:884474605799:web:c26b8b1c27fe54af42f242"
})

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})
