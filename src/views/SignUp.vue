<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      align-center
      wrap>
      <v-flex
        xs12
        md10>
        <material-card
          color="orange accent-3"
          title="Sign Up"
          text="Create your profile"
        >
          <v-form ref="form">
            <v-stepper v-model="activeStep">
              <v-stepper-header>
                <v-stepper-step
                  :complete="1 <= activeStep"
                  :rules="[() => this.isPersonalInfoValid]"
                  step="1"
                >
                  Personal Information
                  <small v-if="!this.isPersonalInfoValid">Please fill all fields correct.</small>
                </v-stepper-step>

                <v-divider/>

                <v-stepper-step
                  :complete="2 <= activeStep"
                  :rules="[() => this.isRestaurantInfoValid]"
                  step="2"
                >Restaurant Information
                  <small v-if="!this.isRestaurantInfoValid">Please fill all fields correct.</small>
                </v-stepper-step>

                <v-divider/>

                <v-stepper-step
                  step="3"
                >Adress Information</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <!-- Personal information -->
                <v-stepper-content step="1">
                  <personal-info-card/>
                </v-stepper-content>

                <!-- Restaurant information -->
                <v-stepper-content step="2">
                  <restaurant-info-card/>
                </v-stepper-content>

                <!-- Adress Information -->
                <v-stepper-content step="3">
                  <adress-info-card @sign-up-clicked="onSignUpClicked"/>
                </v-stepper-content>
              </v-stepper-items>

            </v-stepper>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PersonalInfoCard from '../components/signUp/PersonalInfoCard'
import RestaurantInfoCard from '../components/signUp/RestaurantInfoCard'
import AdressInfoCard from '../components/signUp/AdressInfoCard'
import Map from '../components/shared/map/Map'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'SignUp',
  components: {
    Map,
    PersonalInfoCard,
    RestaurantInfoCard,
    AdressInfoCard
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('signUp', [
      'isPersonalInfoValid',
      'isRestaurantInfoValid',
      'activeStepNumber'
    ]),
    activeStep: {
      get: function () {
        return this.activeStepNumber
      },
      set: function (stepNumber) {
        this.setActiveStepNumber(stepNumber)
      }
    }
  },
  methods: {
    ...mapActions('authentication', ['postData']),
    ...mapActions('snackbar', ['setState']),
    ...mapActions('signUp', ['setActiveStepNumber', 'doSignUpRequest']),
	  onSignUpClicked () {
      this.doSignUpRequest()
        .then(data => {
          if (data && data.success) {
            this.$router.push({ path: 'home' })
            this.setState({ snackbar: true, message: 'Loggin Succescfull.', color: 'green' })
          } else {
            this.setState({ snackbar: true, message: data.error && data.error.message, color: 'red' })
          }
        })
	  }
  }
}
</script>

<style scoped lang="stylus">
.white-text
    color: white
</style>
