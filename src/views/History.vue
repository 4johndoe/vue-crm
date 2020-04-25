<template>
    <div>
        <div class="page-title">
            <h3>{{ 'History_Records' | localize }}</h3>
        </div>

        <div class="history-chart">
            <canvas ref="canvas"></canvas>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">
            {{ 'History_No_records_yet' | localize }}.
            <router-link to="/record">
                {{ 'History_Add_new_one' | localize }}.
            </router-link>
        </p>

        <section v-else>
            <HistoryTable :records="items" />

            <Paginate
                    v-model="page"
                    :page-count="pageCount"
                    :click-handler="pageChangeHandler"
                    :prev-text=paginate.prev
                    :next-text=paginate.next
                    :container-class="'pagination'"
                    :page-class="'waves-effect'"
            />
        </section>
    </div>
</template>

<script>
    import HistoryTable from "../components/HistoryTable"
    import paginationMixin from '../mixins/pagination.mixin'
    import {Pie} from 'vue-chartjs'
    import localizeFilter from "../filters/localize.filter"

    export default {
        name: "History",
        extends: Pie,
        mixins: [paginationMixin],
        data: () => ({
            loading: true,
            records: [],
            paginate: {
                prev: localizeFilter('History_Paginate_Next'),
                next: localizeFilter('History_Paginate_Prev')
            }
        }),
        async mounted() {
            this.records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.setup(categories)

            this.loading = false
        },
        methods: {
            setup(categories) {
                this.setupPagination(this.records.map(record => {
                    return {
                        ...record,
                        categoryName: categories
                            .find(c => c.id === record.categoryId).title,
                        typeClass: record.type === 'income' ? 'green' : 'red',
                        typeText: record.type === 'income' ? localizeFilter('History_Income') : localizeFilter('History_Outcome'),
                    }
                }))

                this.renderChart({
                    labels: categories.map(c => c.title),
                    datasets: [
                        {
                            label: localizeFilter('History_Outcomes_per_category'),
                            backgroundColor: '#f87979',
                            data: categories.map(c => {
                                return this.records.reduce((total, r) => {
                                    if (r.categoryId === c.id && r.type === 'outcome') {
                                        total += +r.amount
                                    }
                                    return total
                                }, 0)
                            })
                        }
                    ]
                })
            }
        },
        components: {
            HistoryTable
        }
    }
</script>

<style scoped>

</style>