import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from "./category"
import record from "./record"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        error: null
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async fetchCurrency() {
            const res = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            const array = await res.json()

            const base = 'UAH'
            const date = new Intl
                .DateTimeFormat('ru-RU', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric'
                })
                .format(new Date())
                .split('.').reverse().join('-')
            const rates = {}
            const currencies = array
                .filter(item => item.base_ccy === base)
                .forEach(element => {
                    rates[element.ccy] = parseFloat(element.sale)
                })

            return {
                base,
                date,
                rates
            }
        }
    },
    getters: {
        error: s => s.error
    },
    modules: {
        auth, info, category, record
    }
})
