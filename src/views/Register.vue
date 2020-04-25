<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">{{ 'Register_Title' | localize }}</span>
            <div class="input-field">
                <input
                        id="email"
                        type="text"
                        v-model.trim="email"
                        :class="{invalid: ($v.email.$dirty && !$v.email.required)
                                        || ($v.email.$dirty && !$v.email.email)}"
                >
                <label for="email">{{ 'Register_Email' | localize }}</label>
                <small
                        class="helper-text invalid"
                        v-if="$v.email.$dirty && !$v.email.required"
                >{{ 'Register_Email_required' | localize }}</small>
                <small
                        class="helper-text invalid"
                        v-else-if="$v.email.$dirty && !$v.email.email"
                >{{ 'Register_Email_email' | localize }}</small>
            </div>
            <div class="input-field">
                <input
                        id="password"
                        type="password"
                        v-model.trim="password"
                        :class="{invalid: ($v.password.$dirty && !$v.password.required)
                                        || ($v.password.$dirty && !$v.password.minLength)}"
                >
                <label for="password">{{ 'Register_Password' | localize }}</label>
                <small
                        class="helper-text invalid"
                        v-if="$v.password.$dirty && !$v.password.required"
                >{{ 'Register_Password_required' | localize }}</small>
                <small
                        class="helper-text invalid"
                        v-else-if="$v.password.$dirty && !$v.password.minLength"
                >{{ 'Register_Password_min_len' | localize }} {{this.$v.password.$params.minLength.min}} {{ 'Register_Password_curr_len' | localize }} {{password.length}}</small>
            </div>
            <div class="input-field">
                <input
                        id="name"
                        type="text"
                        v-model.trim="name"
                        :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                >
                <label for="name">{{ 'Register_Name' | localize }}</label>
                <small
                        class="helper-text invalid"
                        v-if="$v.name.$dirty && !$v.name.required"
                >{{ 'Register_Name_required' | localize }}</small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model="agree"/>
                    <span>{{ 'Register_Agree' | localize }}</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    {{ 'Register_Register' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                {{ 'Register_Already_has_acc' | localize }}?
                <router-link to="/login">{{ 'Register_Enter' | localize }}!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "register",
        data: () => ({
            email: '',
            password: '',
            name: '',
            agree: false
        }),
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(6)},
            name: {required},
            agree: {checked: v => v}
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                const formData = {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }

                try {
                    await this.$store.dispatch('register', formData)
                    this.$router.push('/')
                } catch (e) {}
            }
        }
    }
</script>

<style scoped>

</style>