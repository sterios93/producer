<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      align-center
      wrap
    >
      <material-card
        color="success"
        title="Welcome"
        text="Complete your profile"
      >
        <v-form ref="form">
          <v-container py-0>
            <v-layout wrap justify-space-around>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  class="purple-input"
                  label="Enter your e-mail address"
                  v-model="email"
                  :rules="emailRules"
                  required></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md6>
                <v-text-field
                  class="purple-input"
                  label="Enter your password"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
              </v-flex>
              <v-flex
                xs12
                text-xs-right
              >
                <v-btn
                  class="mx-0 font-weight-light"
                  color="success"
                  @click="submit" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                >
                  Login Up
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </material-card>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
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
          this.postData({action: 'login', payload})
            .then(data => {
              if (data.success !== false) {
                this.$router.push({ path: 'maps' })
              } else {
                // TODO :: make consistent with sign up / back-end map error
                this.setState({snackbar: true, message: data.msg, color: 'red'})
                this.clear();
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

<style scoped lang="stylus">
  #app
    background-image: url("https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=");
    background-size: cover;
    overflow: hidden;

  .loginOverlay
    height: 100vh;
    background: rgba(33, 150, 243, 0.1);
</style>
