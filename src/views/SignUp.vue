<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center align-center wrap>
      <v-flex xs12 md10>
        <material-card
          color="purple darken-2"
          title="Sign Up"
          text="Create your profile"
        >
          <v-form ref="form">
            <v-stepper v-model="activeStepNumber">
                <v-stepper-header>
                  <v-stepper-step
                   :complete="1 <= activeStepNumber"
                   step="1"
                   :rules="[() => this.isPersonalInfoValid]"
                   @click="stepClick(1)"
                   >
                    Personal Information
                     <small v-if="!this.isPersonalInfoValid">Please fill all fields correct.</small>
                    </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step 
                    :complete="2 <= activeStepNumber"
                    step="2"
                    @click="stepClick(2)"
                    >Restaurant Information</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    step="3" 
                    @click="stepClick(3)"
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
                    <adress-info-card/>
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
import PersonalInfoCard from '../components/signUp/PersonalInfoCard';
import RestaurantInfoCard from '../components/signUp/RestaurantInfoCard';
import AdressInfoCard from '../components/signUp/AdressInfoCard';
import Map from '../components/shared/map/Map';

import { mapActions, mapState } from 'vuex';

export default {
  name:'sign-up',
  components: {
    Map,
    PersonalInfoCard,
    RestaurantInfoCard,
    AdressInfoCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('signUp', [
      'isPersonalInfoValid',
      'activeStepNumber'
    ])
  },
  methods: {
    ...mapActions('authentication', ['postData']),
    ...mapActions('snackbar', ['setState']),
    ...mapActions('signUp', ['setActiveStepNumber']),
    stepClick(stepNumber) {
      this.setActiveStepNumber(stepNumber);
    }
  },
}
</script>

<style scoped lang="stylus"></style>
