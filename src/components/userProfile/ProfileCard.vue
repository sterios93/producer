<template>
  <v-form>
    <v-container py-0>
      <v-layout wrap>
        <v-flex xs12 md6>
          <v-text-field
            label="First Name"
            class="purple-input"
            v-model="firstName"
            :disabled="!inEditMode"
            :rules="[rules.required]"
            :error="inEditMode"
          />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            label="Last Name"
            class="purple-input"
            v-model="lastName"
            :disabled="!inEditMode"
            :rules="[rules.required]"
            :error="inEditMode"
          />
        </v-flex>

        <v-flex xs12 md6>
          <span class="label">Phone number</span>
          <CustomPhoneValidate
            :disabled="!inEditMode"
            v-model="phoneNumber"
            @validate="validatePhoneNumbebr"
          ></CustomPhoneValidate>
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field
            label="Restaurant name"
            class="purple-input"
            v-model="restaurantName"
            :disabled="!inEditMode"
            :rules="[rules.required]"
            :error="inEditMode"
          />
        </v-flex>
        <v-flex xs12 md6>
          <v-text-field
            label="Restaurant type"
            class="purple-input"
            v-model="restaurantType"
            :disabled="!inEditMode"
            :error="inEditMode"
            :rules="[rules.required]"
          />
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field
            label="Restaurant website"
            class="purple-input"
            v-model="restaurantWebsite"
            :disabled="!inEditMode"
            :error="inEditMode"
          />
        </v-flex>
        <v-flex xs12 md6>
          <span class="label">Restaurant number</span>
          <CustomPhoneValidate
            :disabled="!inEditMode"
            v-model="restaurantNumber"
            @validate="validatePhoneNumbebr"
          ></CustomPhoneValidate>
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field
            class="purple-input"
            label="Password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            hint="At least 6 characters"
            :error="inEditMode"
            :rules="[rules.required, rules.password, rules.min]"
            required
            @click:append="showPassword = !showPassword"
            :disabled="!inEditMode"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md6>
          <v-text-field
            class="purple-input"
            label="Repeat Password"
            :append-icon="showRepeatPassword ? 'visibility' : 'visibility_off'"
            v-model="passwordRepeat"
            :type="showRepeatPassword ? 'text' : 'password'"
            @click:append="showRepeatPassword = !showRepeatPassword"
            required
            hint="At least 6 characters"
            :error="inEditMode"
            :rules="[rules.required, rules.password, rules.min]"
            v-if="inEditMode"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 md12 :class="[{disabled: !inEditMode}]">
          <Map storeModule="userProfile"></Map>
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            label="City"
            class="purple-input"
            :disabled="!inEditMode"
            v-model="restaurantCity"
          />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            label="Country"
            class="purple-input"
            :disabled="!inEditMode"
            v-model="restaurantCountry"
          />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field
            class="purple-input"
            label="Postal Code"
            type="number"
            :disabled="!inEditMode"
            v-model="restaurantPostalCode"
          />
        </v-flex>
        <v-flex xs12 text-xs-right>
          <v-btn class="mr-2 font-weight-light" color="orange" dark @click="setEditMode(true)">
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
import Map from "../shared/map/Map";
import { mapState, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import CustomPhoneValidate from "../shared/CustomPhoneValidate";

import { required, minLength, sameAs, numeric } from "vuelidate/lib/validators";
// TODO :: Fix the map logic
export default {
  name: "profile-card",
  components: {
    Map,
    CustomPhoneValidate
  },
  props: {
    forceEdit: {
      type: Boolean,
      default: false
    }
  },
  mixins: [validationMixin],
  beforeDestroy() {
    this.setEditMode(false);
  },
  data() {
    return {
      _firstName: null,
      passwordRepeat: null,
      showPassword: false,
      showRepeatPassword: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        password: value => {
          if (value !== this.password) return "Passwords does not match";
        }
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userProfile,
      inEditModeStore: state => state.userProfile.inEditMode
    }),
    inEditMode() {
      return this.inEditModeStore || this.forceEdit;
    },
    firstName: {
      get() {
        return this.userInfo.firstName;
      },
      set(value) {
        this._firstName = value;
        this.setFirstName(value);
      }
    },
    lastName: {
      get() {
        return this.userInfo.lastName;
      },
      set(value) {
        this.setLastName(value);
      }
    },
    phoneNumber: {
      get() {
        return this.userInfo.phoneNumber;
      }
    },
    password: {
      get() {
        return this.userInfo.password;
      },
      set(value) {
        this.setPassword(value);
      }
    },
    restaurantName: {
      get() {
        return this.userInfo.restaurantName;
      },
      set(value) {
        this.setRestaurantName(value);
      }
    },
    restaurantType: {
      get() {
        return this.userInfo.restaurantType;
      },
      set(value) {
        this.setRestaurantType(value);
      }
    },
    restaurantWebsite: {
      get() {
        return this.userInfo.restaurantWebsite;
      },
      set(value) {
        this.setRestaurantWebsite(value);
      }
    },
    restaurantNumber: {
      get() {
        return this.userInfo.restaurantNumber;
      }
    },
    restaurantAddress: {
      get() {
        return this.userInfo.address;
      },
      set(value) {
        this.setAddress(value);
      }
    },
    restaurantCity: {
      get() {
        return this.userInfo.city;
      },
      set(value) {
        this.setCity(value);
      }
    },
    restaurantCountry: {
      get() {
        return this.userInfo.country;
      },
      set(value) {
        this.setCountry(value);
      }
    },
    restaurantPostalCode: {
      get() {
        return this.userInfo.postalCode;
      },
      set(value) {
        this.setPostalCode(value);
      }
    }
  },
  watch: {
    passwordRepeat: "passRepeatHandler"
  },
  methods: {
    ...mapActions("userProfile", [
      "setEditMode",
      "setFirstName",
      "setLastName",
      "setEmail",
      "setPhoneNumber",
      "setPassword",
      "setRestaurantName",
      "setRestaurantType",
      "setRestaurantWebsite",
      "setRestaurantNumber",
      "setAddress",
      "setCity",
      "setCountry",
      "setPostalCode",
      "updateProfile"
    ]),
    ...mapActions("snackbar", ["setState"]),
    validatePhoneNumbebr(e) {
      this.setProfileValid(e.isValid);
    },
    saveProfile() {
      this.setState({
        snackbar: true,
        message: "Please fill correct all fields.",
        color: "red"
      });
      this.setState({
        snackbar: true,
        message: "Profile updated.",
        color: "green"
      });
      this.updateProfile({
        name: this._firstName
      });
      this.setEditMode(false);
    }
  }
};
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
