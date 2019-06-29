<template>
  <v-form>
    <v-container py-0>
      <v-layout wrap>
        <v-flex xs12 md6>
          <v-text-field
            v-model="firstName"
            :disabled="!inEditMode"
            :rules="[rules.required]"
            :error="inEditMode"
            label="First Name"
            class="purple-input"
          />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            v-model="lastName"
            :disabled="!inEditMode"
            :rules="[rules.required]"
            :error="inEditMode"
            label="Last Name"
            class="purple-input"
          />
        </v-flex>

        <v-flex xs12 md6>
          <span class="label">Phone number</span>
          <CustomPhoneValidate
            :disabled="!inEditMode"
            v-model="phoneNumber"
            @validate="validatePhoneNumbebr"
          />
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field
            v-model="restaurantName"
            :disabled="!inEditMode"
            :rules="[rules.required]"
            :error="inEditMode"
            label="Restaurant name"
            class="purple-input"
          />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            v-model="restaurantType"
            :disabled="!inEditMode"
            :error="inEditMode"
            :rules="[rules.required]"
            label="Restaurant type"
            class="purple-input"
          />
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field
            v-model="restaurantWebsite"
            :disabled="!inEditMode"
            :error="inEditMode"
            label="Restaurant website"
            class="purple-input"
          />
        </v-flex>
        <v-flex xs12 md6>
          <span class="label">Restaurant number</span>
          <CustomPhoneValidate
            :disabled="!inEditMode"
            v-model="restaurantNumber"
            @validate="validatePhoneNumbebr"
          />
        </v-flex>

        <v-flex xs12 md6>
          <v-btn
              :class="{ disabled: !inEditMode }"
              class="mx-0"
              color="primary"
              @click="togglePasswordView"
              >Change Password
          </v-btn>
        </v-flex>

        <v-flex xs12 md6 v-if="showPassFields && inEditMode">
          <v-text-field
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            v-model="oldPassword"
            :type="showPassword ? 'text' : 'password'"
            :error="inEditMode"
            :rules="[rules.required,rules.min]"
            :disabled="!inEditMode"
            class="purple-input"
            label="Old Password"
            required
            @click:append="showPassword = !showPassword"
          />
        </v-flex>

        <v-flex xs12 md6 v-if="showPassFields && inEditMode">
          <v-text-field
            :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
            v-model="password"
            :type="showNewPassword ? 'text' : 'password'"
            :error="inEditMode"
            :rules="[rules.required,rules.min]"
            :disabled="!inEditMode"
            class="purple-input"
            label="New Password"
            hint="At least 6 characters"
            required
            @click:append="showNewPassword = !showNewPassword"
          />
        </v-flex>

        <v-flex xs12 md6 v-if="showPassFields && inEditMode">
          <v-text-field
            :append-icon="showRepeatPassword ? 'visibility' : 'visibility_off'"
            v-model="passwordRepeat"
            :type="showRepeatPassword ? 'text' : 'password'"
            :error="inEditMode"
            v-if="inEditMode"
            :rules="[rules.required, rules.password, rules.min]"
            class="purple-input"
            label="Repeat Password"
            required
            hint="At least 6 characters"
            @click:append="showRepeatPassword = !showRepeatPassword"
          />
        </v-flex>

        <v-flex :class="[{disabled: !inEditMode}]" xs12 md12>
          <Map storeModule="userProfile"/>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            :disabled="!inEditMode"
            v-model="restaurantCity"
            label="City"
            class="purple-input"
          />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            :disabled="!inEditMode"
            v-model="restaurantCountry"
            label="Country"
            class="purple-input"
          />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            :disabled="!inEditMode"
            v-model="restaurantPostalCode"
            class="purple-input"
            label="Postal Code"
            type="number"
          />
        </v-flex>
        <v-flex xs12 text-xs-right>
          <v-btn
            class="mr-2 font-weight-light"
            color="orange"
            dark
            @click="setEditMode(true)">
            <v-icon class="mr-1">mdi-account-edit</v-icon>Edit Profile
          </v-btn>
          <v-btn
            v-if="inEditMode"
            class="mx-0 font-weight-light"
            color="success"
            @click="saveProfile"
          >Save Profile</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import Map from '../shared/map/Map'
import { mapState, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import CustomPhoneValidate from '../shared/CustomPhoneValidate'

import { required, minLength, sameAs, numeric } from 'vuelidate/lib/validators'
export default {
  name: 'ProfileCard',
  components: {
    Map,
    CustomPhoneValidate
  },
  mixins: [validationMixin],
  props: {
    forceEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      _firstName: null,
      passwordRepeat: null,
      oldPassword: null,
      showPassword: false,
      showNewPassword: false,
      showRepeatPassword: false,
      showPassFields: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => (v && v.length >= 6) || 'Min 6 characters',
        password: value => {
          if (value !== this.password) return 'Passwords does not match'
          else return true
        }
      }
    }
  },
    watch: {
    passwordRepeat: {
      handler (value) {

      }
    }
  },
  beforeDestroy () {
    this.setEditMode(false)
  },
  computed: {
    ...mapState({
      userInfo: state => state.userProfile,
      inEditModeStore: state => state.userProfile.inEditMode
    }),
    inEditMode () {
      return this.inEditModeStore || this.forceEdit
    },
    firstName: {
      get () {
        return this.userInfo.firstName
      },
      set (value) {
        this._firstName = value
        this.setFirstName(value)
      }
    },
    lastName: {
      get () {
        return this.userInfo.lastName
      },
      set (value) {
        this.setLastName(value)
      }
    },
    phoneNumber: {
      get () {
        return this.userInfo.phoneNumber
      }
    },
    password: {
      get () {
        return this.userInfo.password
      },
      set (value) {
        this.setPassword(value)
      }
    },
    restaurantName: {
      get () {
        return this.userInfo.restaurantName
      },
      set (value) {
        this.setRestaurantName(value)
      }
    },
    restaurantType: {
      get () {
        return this.userInfo.restaurantType
      },
      set (value) {
        this.setRestaurantType(value)
      }
    },
    restaurantWebsite: {
      get () {
        return this.userInfo.restaurantWebsite
      },
      set (value) {
        this.setRestaurantWebsite(value)
      }
    },
    restaurantNumber: {
      get () {
        return this.userInfo.restaurantNumber
      }
    },
    restaurantAddress: {
      get () {
        return this.userInfo.address
      },
      set (value) {
        this.setAddress(value)
      }
    },
    restaurantCity: {
      get () {
        return this.userInfo.city
      },
      set (value) {
        this.setCity(value)
      }
    },
    restaurantCountry: {
      get () {
        return this.userInfo.country
      },
      set (value) {
        this.setCountry(value)
      }
    },
    restaurantPostalCode: {
      get () {
        return this.userInfo.postalCode
      },
      set (value) {
        this.setPostalCode(value)
      }
    }
  },
  methods: {
    ...mapActions('userProfile', [
      'setEditMode',
      'setFirstName',
      'setLastName',
      'setEmail',
      'setPhoneNumber',
      'setPassword',
      'setRestaurantName',
      'setRestaurantType',
      'setRestaurantWebsite',
      'setRestaurantNumber',
      'setAddress',
      'setCity',
      'setCountry',
      'setPostalCode',
      'updateProfile'
    ]),
    ...mapActions('snackbar', ['setState']),
    validatePhoneNumbebr (e) {
      this.setProfileValid(e.isValid)
    },
    togglePasswordView() {
		  this.showPassFields = !this.showPassFields;
	  },
    saveProfile () {

      let payload = null;
      if (this.showPassFields) {
        payload = {
          oldPassword: this.oldPassword,
          newPassword: this.password,
          repeatedPassword: this.passwordRepeat,
        };
      }
      this.updateProfile(payload)
        .then(data => {
          if (data.success) {
            this.password = '';
            this.passwordRepeat = null;
            this.oldPassword = null;
            this.setEditMode(false);
            this.setState({ snackbar: true, message: 'Profile updated.', color: 'green' });
          }
          !data.success && this.setState({ snackbar: true, message: data.error ? data.error && data.error.message : 'Please fill correct all fields.', color: 'red' })
        })
      
    }
  }
}
</script>

<style scoped lang="stylus">
.disabled {
  pointer-events: none;
}

.label {
  font-size: 11px;
  color: grey;
  position: absolute;
  z-index: 1;
  transform: translateY(-5px);
}
</style>
