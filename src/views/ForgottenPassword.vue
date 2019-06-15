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
        title="Forgotten password ?"
        text="Please enter your email"
      >
        <v-form ref="form">
          <v-container py-0>
            <v-layout
              wrap
              justify-space-around>
              <v-flex
                xs12
              >
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  class="purple-input"
                  label="E-mail"
                  required
                  @input="validate('email')"
                  @blur="validate('email')"
                />
              </v-flex>

              <v-flex
                xs12
                text-xs-right
              >

                <v-btn
                  class="font-weight-light"
                  color="success"
                  @click="submit"
                >
                  Send new password
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
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'LoginView',
  mixins: [validationMixin],
  data () {
    return {
      email: null,
      emailErrors: [],
      allFields: ['email']
    }
  },
  methods: {
    ...mapActions('authentication', ['postData']),
    ...mapActions('snackbar', ['setState']),
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.setState({ snackbar: true, message: 'Please fill correct all fields.', color: 'red' })
      } else {
        let payload = {
          email: this.email
        }

        // TODO fix the post request when the backend is ready.
        this.postData({ action: 'login', payload })
          .then(data => {
            if (data.success !== false) {
              this.$router.push({ path: 'maps' })
            } else {
              this.setState({ snackbar: true, message: data.msg, color: 'red' })
              this.clear()
            }
          })
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    goToSignUp () {
      this.$router.push({ path: 'signup' })
    },
    validate (target) {
      // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
      this[target + 'Errors'] = []
      this.$v[target].$touch()

      this.checkRequired(target)
      this.checkEmail(target)
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
    checkEmail (target) {
      (this.$v[target].email !== undefined) && !this.$v[target].email && !this[target + 'Errors'].includes('Must be valid e-mail') && this[target + 'Errors'].push('Must be valid e-mail')
    },
    checkRequired (target) {
      !this.$v[target].required && this[target + 'Errors'].push('This field is required')
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>

<style scoped lang="stylus"></style>
