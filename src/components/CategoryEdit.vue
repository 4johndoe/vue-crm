<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ 'CategoryEdit_Edit' | localize }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option
                                v-for="c in categories"
                                :key="c.id"
                                :value="c.id"
                        >
                            {{c.title}}
                        </option>
                    </select>
                    <label>{{ 'CategoryEdit_Choose_category' | localize }}</label>
                </div>

                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="title"
                            :class="{invalid: $v.title.$dirty && !$v.title.required}"
                    >
                    <label for="name">{{ 'CategoryEdit_Name' | localize }}</label>
                    <span
                            v-if="$v.title.$dirty && !$v.title.required"
                            class="helper-text invalid"
                    >
                        {{ 'CategoryEdit_Create_category_name' | localize }}
                    </span>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="limit"
                            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                    >
                    <label for="limit">{{ 'CategoryEdit_Limit' | localize }}</label>
                    <span
                            v-if="$v.limit.$dirty && !$v.limit.minValue"
                            class="helper-text invalid"
                    >
                        {{ 'CategoryEdit_Minimum_value' | localize }} {{$v.limit.$params.minValue.min}}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{ 'CategoryEdit_Update' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'
    import localizeFilter from "../filters/localize.filter"

    export default {
        name: "CategoryEdit",
        data: () => ({
            select: null,
            title: '',
            limit: 100,
            current: null
        }),
        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        watch: {
            current(catId) {
                const {title, limit} = this.categories.find(c => c.id === catId)
                this.title = title
                this.limit = limit
            }
        },
        created() {
            const {title, limit, id} = this.categories[0]
            this.current = id
            this.title = title
            this.limit = limit
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    const categoryData = {
                        id: this.current,
                        title: this.title,
                        limit: this.limit
                    }
                    await this.$store.dispatch('updateCategory', categoryData)
                    this.$message(localizeFilter('CategoryEdit_Category_updated'))
                    this.$emit('updated', categoryData)
                } catch (e) {}
            }
        },
        mounted() {
            M.updateTextFields()
            this.select = M.FormSelect.init(this.$refs.select)
        },
        destroyed() {
            if (this.select && this.select.destroy) {
                this.select.destroy()
            }
        }
    }
</script>

<style scoped>

</style>