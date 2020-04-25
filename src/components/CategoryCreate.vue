<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ 'CategoryCreate_Title' | localize }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input
                            id="name"
                            type="text"
                            v-model="title"
                            :class="{invalid: $v.title.$dirty && !$v.title.required}"
                    >
                    <label for="name">{{ 'CategoryCreate_Name' | localize }}</label>
                    <span
                            v-if="$v.title.$dirty && !$v.title.required"
                            class="helper-text invalid"
                    >
                        {{ 'CategoryCreate_Create_category_name' | localize }}
                    </span>
                </div>

                <div class="input-field">
                    <input
                            id="limit"
                            type="number"
                            v-model.number="limit"
                            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                    >
                    <label for="limit">{{ 'CategoryCreate_Limit' | localize }}</label>
                    <span
                            v-if="$v.limit.$dirty && !$v.limit.minValue"
                            class="helper-text invalid"
                    >
                        {{ 'CategoryCreate_Minimum_value' | localize }} {{$v.limit.$params.minValue.min}}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{ 'CategoryCreate_Create' | localize }}
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
        name: "CategoryCreate",
        data: () => ({
            title: '',
            limit: 100
        }),
        validations: {
            title: {required},
            limit: {minValue: minValue(100)}
        },
        mounted() {
            M.updateTextFields()
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    const category = await this.$store.dispatch('createCategory', {
                        title: this.title,
                        limit: this.limit
                    })
                    this.title = ''
                    this.limit = 100
                    this.$v.$reset()
                    this.$message(localizeFilter('CategoryCreate_Category_created'))
                    this.$emit('created', category)
                } catch (e) {}
            }
        }
    }
</script>

<style scoped>

</style>