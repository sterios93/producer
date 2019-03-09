<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12 md6>
                <v-text-field
                    class="purple-input"
                    label="First Name"
                    v-model="firstName"
                    :error-messages="nameErrors"
                    required
                    >
                </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Last Name"
                v-model="lastname"
                :error-messages="lNameErrors"
                required
                >
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="E-mail"
                v-model="email"
                :error-messages="emailErrors"
                required
                >
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Phone number"
                v-model="phoneNumber"
                :error-messages="phoneErrors"
                required
                >
            </v-text-field>
            </v-flex>


            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                v-model="password"
                :error-messages="passwordErrors"
                :type="showPassword ? 'text' : 'password'"
                required
                @click:append="showPassword = !showPassword"
                >
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Repeat Password"
                :append-icon="showRepeatPassword ? 'visibility' : 'visibility_off'"
                v-model="passwordRepeat"
                :error-messages="passwordRepeatErrors"
                :type="showRepeatPassword ? 'text' : 'password'"
                 @click:append="showRepeatPassword = !showRepeatPassword"
                required
                >
            </v-text-field>
            </v-flex>

            <v-flex>
                <v-btn
                color="primary"
                @click="nextScreen"
                >
                Continue
                </v-btn>

                <v-btn flat>Cancel</v-btn>
            </v-flex>
        </v-layout>
    </v-container> 
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, email, numeric } from 'vuelidate/lib/validators';

    export default {
        name: 'personal-info-card',
        mixins: [validationMixin],
        data () {
            return {
                firstName: null,
                lastname: null,
                email: null,
                phoneNumber: null,
                password: null,
                passwordRepeat: null,
                showPassword: false,
                showRepeatPassword: false
            }
        },
        methods: {
            nextScreen() {
                this.$v.$touch();
                console.error(this.$v);
                if (this.$v.$invalid) {
                    console.error('ERROR')
                } else {
                    console.error('GO to next screen')
                }
            }
        },
        computed: {
            nameErrors () {
                const errors = [];
                if (!this.$v.firstName.$dirty) return errors
                !this.$v.firstName.required && errors.push('First Name is required')
                return errors
            },
            lNameErrors () {
                const errors = [];
                if (!this.$v.lastname.$dirty) return errors
                !this.$v.lastname.required && errors.push('Last Name is required')
                return errors
            },
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
            phoneErrors () {
                const errors = []
                if (!this.$v.phoneNumber.$dirty) return errors
                !this.$v.phoneNumber.numeric && errors.push('Must be numeric')
                !this.$v.phoneNumber.required && errors.push('Phone is required')
                return errors
            },
            passwordErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.minLength && errors.push('Must be minimum 5 characters long')
                !this.$v.password.required && errors.push('Password is required')
                return errors
            },
            passwordRepeatErrors() {
                const errors = []
                if (!this.$v.passwordRepeat.$dirty) return errors
                !this.$v.passwordRepeat.sameAsPassword && errors.push('Passwords must be the same')
                !this.$v.passwordRepeat.required && errors.push('Repeated password is required')
                return errors
            },
        },
        validations: {
            firstName: {
                required,
            },
            lastname: {
                required
            },
            email: {
                required,
                email,
            },
            phoneNumber: {
                required,
                numeric
            },
            password: {
                required,
                minLength: minLength(5)
            },
            passwordRepeat: {
                required,
                minLength: minLength(5),
                sameAsPassword: sameAs('password')
            },
        }
    }
</script>

<style scoped lang="stylus">

</style>