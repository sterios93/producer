<template>
  <v-container>
    <v-layout wrap>
      <v-flex
        xs12
        md6>
        <v-text-field
          v-model="firstName"
          :error-messages="firstNameErrors"
          class="purple-input"
          label="First Name (required)"
          required
          @input="validate('firstName')"
          @blur="validate('firstName')"
        />
      </v-flex>

      <v-flex
        xs12
        md6>
        <v-text-field
          v-model="lastName"
          :error-messages="lastNameErrors"
          class="purple-input"
          label="Last Name (required)"
          required
          @input="validate('lastName')"
          @blur="validate('lastName')"
        />
      </v-flex>

      <v-flex
        xs12
        md6>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          class="purple-input"
          label="E-mail (required)"
          required
          @input="validate('email')"
          @blur="validate('email')"
        />
      </v-flex>

      <v-flex
        xs12
        md6>
        <CustomPhoneValidate
          v-model="phoneNumber"
          @validate="validatePhoneNumbebr"
        />
      </v-flex>

      <v-flex
        xs12
        md6>
        <v-text-field
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          v-model="password"
          :error-messages="passwordErrors"
          :type="showPassword ? 'text' : 'password'"
          class="purple-input"
          label="Password (required)"
          required
          @click:append="showPassword = !showPassword"
          @input="validate('password')"
          @blur="validate('password')"
        />
      </v-flex>

      <v-flex
        xs12
        md6>
        <v-text-field
          :append-icon="showRepeatPassword ? 'visibility' : 'visibility_off'"
          v-model="passwordRepeat"
          :error-messages="passwordRepeatErrors"
          :type="showRepeatPassword ? 'text' : 'password'"
          class="purple-input"
          label="Repeat Password (required)"
          required
          @click:append="showRepeatPassword = !showRepeatPassword"
          @input="validate('passwordRepeat')"
          @blur="validate('passwordRepeat')"
        />
      </v-flex>

      <v-flex>
        <v-btn
          color="primary"
          @click="nextScreen">Continue</v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-flex>

      <v-flex>
        <vue-recaptcha
          ref="recaptcha"
          sitekey="6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-"
          @verify="onVerify"
          @expired="onExpired"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  sameAs,
  email,
  numeric
} from 'vuelidate/lib/validators'
import CustomPhoneValidate from '../shared/CustomPhoneValidate'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'PersonalInfoCard',
  components: {
    VueRecaptcha,
    CustomPhoneValidate
  },
  mixins: [validationMixin],
  data () {
    return {
      phone: '',
      phoneNumber: '',
      phoneInfo: null,
      isPhoneValid: false,
      recaptchaVerified: false,
      firstName: null,
      firstNameErrors: [],
      lastName: null,
      lastNameErrors: [],
      email: null,
      emailErrors: [],
      password: null,
      passwordErrors: [],
      passwordRepeat: null,
      passwordRepeatErrors: [],
      showPassword: false,
      showRepeatPassword: false,
      allFields: [
        'firstName',
        'lastName',
        'email',
        'password',
        'passwordRepeat'
      ]
    }
  },
  methods: {
    ...mapActions('signUp', [
      'setPersonalInfo',
      'setPersonalInfoInvalid',
      'setPersonalInfoValid',
      'setActiveStepNumber'
    ]),
    validatePhoneNumbebr (e) {
      if (!e.isValid) {
        this.isPhoneValid = false
        this.setPersonalInfoInvalid()
      } else {
        this.isPhoneValid = true
        this.countryInfo = e.country
        this.setPersonalInfoValid()
      }
    },
    onVerify: function (response) {
      this.recaptchaVerified = response
    },
    onExpired: function () {
      this.recaptchaVerified = false
    },
    resetRecaptcha () {
      this.$refs.recaptcha.reset()
      this.recaptchaVerified = false
    },
    nextScreen () {
      this.$v.$touch()
      if (this.$v.$invalid || !this.recaptchaVerified || !this.isPhoneValid) {
        this.setPersonalInfoInvalid()
      } else {
        // Todo, check in the database if the email is not in use already
        this.setPersonalInfo({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          phoneInfo: this.phoneInfo,
          password: this.password
        })
        this.resetRecaptcha()
        this.setActiveStepNumber(2)
      }
    },
    validate (target) {
      // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
      this[target + 'Errors'] = []
      this.$v[target].$touch();

      (this.hasError() || !this.isPhoneValid) && this.setPersonalInfoInvalid()
      !this.hasError() && this.setPersonalInfoValid()

      this.checkRequired(target)
      this.checkEmail(target)
      this.checkLength(target)
      this.checkSameAs(target)
      return this[target + 'Errors']
    },
    hasError () {
      return this.allFields
        .reduce((result, item) => {
          if (this.$v[item].$error) result.push(false)
          else result.push(true)
          return result
        }, [])
        .includes(false)
    },
    checkEmail (target) {
      this.$v[target].email !== undefined &&
        !this.$v[target].email &&
        !this[target + 'Errors'].includes('Must be valid e-mail') &&
        this[target + 'Errors'].push('Must be valid e-mail')
    },
    checkLength (target) {
      this.$v[target].minLength !== undefined &&
        !this.$v[target].minLength &&
        !this[target + 'Errors'].includes(
          'Must be minimum 6 characters long'
        ) &&
        this[target + 'Errors'].push('Must be minimum 6 characters long')
    },
    checkSameAs (target) {
      this.$v[target].sameAsPassword !== undefined &&
        !this.$v[target].sameAsPassword &&
        !this[target + 'Errors'].includes('Passwords must be the same') &&
        this[target + 'Errors'].push('Passwords must be the same')
    },
    checkRequired (target) {
      !this.$v[target].required &&
        this[target + 'Errors'].push('This field is required')
    }
  },
  beforeDestroy () {
    this.resetRecaptcha()
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    passwordRepeat: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs('password')
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
