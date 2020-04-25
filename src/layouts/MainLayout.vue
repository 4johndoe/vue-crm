<template>
    <div>
        <Loader v-if="loading" />
        <div v-else class="app-main-layout">
            <Navbar @click="isOpen = !isOpen" />

            <Sidebar v-model="isOpen" :key="locale"/>

            <main class="app-content" :class="{full: !isOpen}">
                <div class="app-page">
                    <router-view />
                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link
                        class="btn-floating btn-large blue"
                        to="/record"
                        v-tooltip=getTooltipTranslate
                        :key="locale"
                >
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Navbar from "../components/app/Navbar"
    import Sidebar from "../components/app/Sidebar"
    import messages from "../utils/messages"
    import localizeFilter from "../filters/localize.filter"

    export default {
        name: 'main-layout',
        data: () => ({
            isOpen: true,
            loading: true
        }),
        async mounted() {
            if (!Object.keys(this.$store.getters.info).length) {
                await this.$store.dispatch('fetchInfo')
            }

            this.loading = false
        },
        computed: {
            error() {
                return this.$store.getters.error
            },
            locale() {
                return this.$store.getters.info.locale
            },
            getTooltipTranslate() {
                return localizeFilter('MainLayout_Create_new_record')
            }
        },
        watch: {
            error(fbError) {
                this.$error(messages[fbError.code] || localizeFilter('Error_MainLayout_Smt_going_wrong'))
            }
        },
        components: {
            Sidebar, Navbar
        }
    }
</script>