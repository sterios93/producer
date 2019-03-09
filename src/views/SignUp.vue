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
            <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1" editable>Personal Information</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2" editable>Restaurant Information</v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="3" editable>Adress Information</v-stepper-step>
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

import { mapActions } from 'vuex';

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
      valid: false,
      e1: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
    }
  },
  methods: {
    ...mapActions('authentication', ['postData']),
    ...mapActions('snackbar', ['setState']),
    submit () {
      if (this.$refs.form.validate()) {
        let payload = {
          email: this.email,
          password: this.password
        }

        this.postData({action: 'register', payload})
          .then((r) => {
            if (r.success !== false) {
              this.postData({action: 'login', payload})
                .then(data => {
                  if (data.success !== false) {
                    this.$router.push({ path: 'maps' })
                  }
                })
            } else {
              this.setState({snackbar: true, message: r.err.name, color: 'red'})
            }
          })
      }
    },
    clear() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped lang="stylus"></style>
