<template>
  <v-container>
    <v-layout wrap>
      <v-flex
        xs12
        md6>
        <v-text-field
          v-model="restaurantName"
          :error-messages="restaurantNameErrors"
          class="purple-input"
          label="Restaurant Name"
          required
          @input="validate('restaurantName')"
          @blur="validate('restaurantName')"
        />
      </v-flex>

      <v-flex
        xs12
        md6>
        <v-text-field
          v-model="restaurantType"
          :error-messages="restaurantTypeErrors"
          class="purple-input"
          label="Restaurant Type"
          required
          @input="validate('restaurantType')"
          @blur="validate('restaurantType')"
        />
      </v-flex>

      <v-flex
        xs12
        md6>
        <v-text-field
          v-model="restaurantWebsite"
          class="purple-input"
          label="Restaurant website"/>
      </v-flex>

      <v-flex
        xs12
        md6>
        <CustomPhoneValidate
          v-model="restaurantNumber"
          @validate="validatePhoneNumbebr"
        />
        <a
          href="#"
          @click="setPersonalNumber">Use personal nuber.</a>
      </v-flex>

      <v-flex>
        <v-btn
          color="primary"
          @click="setActiveStepNumber(1);">Back</v-btn>
        <v-btn
          color="primary"
          @click="nextScreen(3)"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs, email, numeric } from 'vuelidate/lib/validators'
import CustomPhoneValidate from '../shared/CustomPhoneValidate'

export default {
  name: 'RestaurantInfoCard',
  components: {
    CustomPhoneValidate
  },
  mixins: [validationMixin],
  data () {
    return {
      isPhoneValid: false,
      phoneFieldDirty: false,
      restaurantName: null,
      restaurantNameErrors: [],
      restaurantType: null,
      restaurantTypeErrors: [],
      restaurantWebsite: null,
      restaurantNumber: null,
      restaurantNumberErrors: [],
      allFields: ['restaurantName', 'restaurantType', 'restaurantNumber']
    }
  },
  computed: {
    showPhoneError () {
      return !this.isPhoneValid && this.phoneFieldDirty
    }
  },
  methods: {
    ...mapActions('signUp', [
      'setActiveStepNumber',
      'setRestaurantInfoValid',
      'setRestaurantInfoInvalid',
      'setRestaurantInfo'
    ]),
    setPersonalNumber () {
      this.restaurantNumber = this.$store.state.signUp.phoneNumber
    },
    validatePhoneNumbebr (e) {
      if (!e.isValid) {
        this.isPhoneValid = false
        this.setRestaurantInfoInvalid()
      } else {
        this.isPhoneValid = true
        this.countryInfo = e.country
        this.setRestaurantInfoInvalid()
      }
    },
    nextScreen (stepNumber) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.setRestaurantInfoInvalid()
      } else {
        this.setRestaurantInfo({
          restaurantName: this.restaurantName,
          restaurantType: this.restaurantType,
          restaurantWebsite: this.restaurantWebsite,
          restaurantNumber: this.restaurantNumber
        })
        this.setActiveStepNumber(stepNumber)
      }
    },
    validate (target) {
      // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
      this[target + 'Errors'] = []
      this.$v[target].$touch()

      this.hasError() && this.setRestaurantInfoInvalid()
      !this.hasError() && this.setRestaurantInfoValid()

      this.checkRequired(target)
      this.checkNumeric(target)
      return this[target + 'Errors']
    },
    hasError () {
      return this.allFields.reduce((result, item) => {
        if (this.$v[item].$error) result.push(false)
        else result.push(true)
        return result
      }, [])
        .includes(false)
    },
    checkNumeric (target) {
      (this.$v[target].numeric !== undefined) && !this.$v[target].numeric && !this[target + 'Errors'].includes('Must be numeric') && this[target + 'Errors'].push('Must be numeric')
    },
    checkRequired (target) {
      !this.$v[target].required && this[target + 'Errors'].push('This field is required')
    }
  },
  validations: {
    restaurantName: {
      required
    },
    restaurantType: {
      required
    },
    restaurantNumber: {
      required
    }
  }
}
</script>
