<template>
            <v-form>
                <v-container py-0>
                    <v-layout wrap>
                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="First Name"
                                    class="purple-input"
                                    v-model="firstName"
                                    :error-messages="firstNameErrors"
                                    :disabled="!inEditMode"
                                    @blur="validate('firstName')"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Last Name"
                                    class="purple-input"
                                    v-model="lastName"
                                    :error-messages="lastNameErrors"
                                    :disabled="!inEditMode"
                                    @blur="validate('lastName')"/>
                        </v-flex>

                        <v-flex xs12 md6 >
                            <span class="label">Phone number</span>
                            <CustomPhoneValidate
                                :disabled="!inEditMode"
                                v-model="phoneNumber"
                                @validate="validatePhoneNumbebr"
                            ></CustomPhoneValidate>
                        </v-flex>


                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="Restaurant name"
                                    class="purple-input"
                                    v-model="restaurantName"
                                    :error-messages="restaurantNameErrors"
                                    :disabled="!inEditMode"
                                    @blur="validate('restaurantName')"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Restaurant type"
                                    class="purple-input"
                                    v-model="restaurantType"
                                    :error-messages="restaurantTypeErrors"
                                    :disabled="!inEditMode"
                                    @blur="validate('restaurantType')"/>
                        </v-flex>

                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="Restaurant website"
                                    class="purple-input"
                                    v-model="restaurantWebsite"
                                    :disabled="!inEditMode"/>
                        </v-flex>
                        <v-flex xs12 md6 >
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
                                    :error-messages="passwordErrors"
                                    :type="showPassword ? 'text' : 'password'"
                                    required
                                    @click:append="showPassword = !showPassword"
                                    :disabled="!inEditMode"
                                    @blur="validate('password')"
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
                                    v-if="inEditMode"
                                    @blur="validate('passwordRepeat')"
                            >
                            </v-text-field>
                        </v-flex>

                        <v-flex xs12 md12
                                :class="[{disabled: !inEditMode}]">
                            <Map storeModule="userProfile"></Map>

                        </v-flex>
                        <v-flex
                                xs12
                                md4>
                            <v-text-field
                                    label="City"
                                    class="purple-input"
                                    :disabled="!inEditMode"
                                    v-model="restaurantCity"
                                    :error-messages="restaurantCityErrors"
                                    @blur="validate('restaurantCity')"
                            />
                        </v-flex>
                        <v-flex
                                xs12
                                md4>
                            <v-text-field
                                    label="Country"
                                    class="purple-input"
                                    :disabled="!inEditMode"
                                    v-model="restaurantCountry"
                                    :error-messages="restaurantCountryErrors"
                                    @blur="validate('restaurantCountry')"
                            />
                        </v-flex>
                        <v-flex
                                xs12
                                md4>
                            <v-text-field
                                    class="purple-input"
                                    label="Postal Code"
                                    type="number"
                                    :disabled="!inEditMode"
                                    v-model="restaurantPostalCode"
                                    :error-messages="restaurantPostalCodeErrors"
                                    @blur="validate('restaurantPostalCode')"
                            />
                        </v-flex>
                        <v-flex xs12 text-xs-right >
                            <v-btn
                                    class="mr-2 font-weight-light"
                                    color="orange"
                                    dark
                                    @click="setEditMode(true)"
                            >
                                <v-icon class="mr-1">
                                    mdi-account-edit
                                </v-icon>
                                Edit Profile
                            </v-btn>
                            <v-btn
                                    v-if="inEditMode"
                                    class="mx-0 font-weight-light"
                                    color="success"
                                    @click="saveProfile"
                            >Save Profile
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>

</template>

<script>
    import Map from '../shared/map/Map'
    import {mapState, mapActions} from 'vuex'
    import { validationMixin } from 'vuelidate'
    import CustomPhoneValidate from "../shared/CustomPhoneValidate";

    import { required, minLength, sameAs, numeric } from 'vuelidate/lib/validators';
    // TODO :: Fix the map logic
    export default {
      name: 'profile-card',
      components: {
        Map,
        CustomPhoneValidate,
      },
      props: {
        forceEdit: {
          type: Boolean,
          default: false
        }
      },
      mixins: [validationMixin],
      beforeDestroy() {
        this.setProfileValid(true);
        this.setEditMode(false);
      },
      data() {
        return {
          _firstName: null,
          firstNameErrors: [],
          lastNameErrors: [],
          emailErrors: [],
          phoneNumberErrors: [],
          passwordErrors: [],
          passwordRepeat: null,
          passwordRepeatErrors: [],
          showPassword: false,
          showRepeatPassword: false,
          restaurantNameErrors: [],
          restaurantTypeErrors: [],
          restaurantNumberErrors: [],
          restaurantAddressErrors: [],
          restaurantCityErrors: [],
          restaurantCountryErrors: [],
          restaurantPostalCodeErrors: [],
          allFields: [
            'firstName',
            'lastName',
            'phoneNumber',
            'password',
            'passwordRepeat',
            'restaurantName',
            'restaurantType',
            'restaurantNumber',
            'restaurantAddress',
            'restaurantCity',
            'restaurantCountry',
            'restaurantPostalCode'
          ],
        }
      },
      computed: {
        ...mapState({
          userInfo: (state) => state.userProfile,
          inEditModeStore: (state) => state.userProfile.inEditMode,
        }),
        inEditMode() {
          return this.inEditModeStore || this.forceEdit
        },
        firstName: {
          get() {return this.userInfo.firstName},
          set(value) {
            this._firstName = value;
            // this.setFirstName(value);
            this.validate('firstName');
          }
        },
        lastName: {
          get() {return this.userInfo.lastName},
          set(value) {
            // this.setLastName(value);
            this.validate('lastName');
          }
        },
        phoneNumber: {
          get() {return this.userInfo.phoneNumber},
        },
        password: {
          get() {return this.userInfo.password},
          set(value) {
            // this.setPassword(value);
            this.validate('password');
          }
        },
        restaurantName: {
          get() {return this.userInfo.restaurantName},
          set(value) {
            // this.setRestaurantName(value);
            this.validate('restaurantName');
          }
        },
        restaurantType: {
          get() {return this.userInfo.restaurantType},
          set(value) {
            // this.setRestaurantType(value);
            this.validate('restaurantType');
          }
        },
        restaurantWebsite: {
          get() {return this.userInfo.restaurantWebsite},
          set(value) {
            // this.setRestaurantWebsite(value)
            }
        },
        restaurantNumber: {
          get() {return this.userInfo.restaurantNumber},
        },
        restaurantAddress: {
          get() {return this.userInfo.address},
          set(value) {
            // this.setAddress(value);
            this.validate('restaurantAddress');
          }
        },
        restaurantCity: {
          get() {return this.userInfo.city},
          set(value) {
            // this.setCity(value);
            this.validate('restaurantCity');
          }
        },
        restaurantCountry: {
          get() {return this.userInfo.country},
          set(value) {
            // this.setCountry(value);
            this.validate('restaurantCountry');
          }
        },
        restaurantPostalCode: {
          get() {return this.userInfo.postalCode},
          set(value) {
            // this.setPostalCode(value);
            this.validate('restaurantPostalCode');
          }
        },
      },
      watch: {
        passwordRepeat: 'passRepeatHandler'
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
          'setProfileValid',
          'setAddress',
          'setCity',
          'setCountry',
          'setPostalCode',
          'updateProfile',
        ]),
        ...mapActions('snackbar', ['setState']),
        validatePhoneNumbebr(e) {
          this.setProfileValid(e.isValid);
        },
        saveProfile() {
          // TODO :: send the data to the database
          this.$v.$touch();
          if (this.$v.$invalid || this.hasError()) {
            this.setProfileValid(false)
            this.setState({snackbar: true, message: 'Please fill correct all fields.', color: 'red'});
          } else {
            // Todo, check in the database if the email is not in use already
            this.setState({snackbar: true, message: 'Profile updated.', color: 'green'});
            this.updateProfie({
              name: this._firstName,
            })
            this.setEditMode(false);
            this.setProfileValid(true);
          }
        },
        validate(target) {
          // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
          this[target + 'Errors'] = [];
          this.$v[target].$touch();

          this.setProfileValid(!this.hasError());

          this.checkRequired(target);
          this.checkNumeric(target);
          this.checkLength(target);
          this.checkSameAs(target)
          return this[target + 'Errors']
        },
        hasError() {
          return this.allFields.reduce((result, item) => {
            if (this.$v[item].$error) result.push(false)
            else result.push(true)
            return result
          },[])
            .includes(false)
        },
        checkNumeric(target) {
          (this.$v[target].numeric !== undefined) && !this.$v[target].numeric && !this[target + 'Errors'].includes('Must be numeric') && this[target + 'Errors'].push('Must be numeric');
        },
        checkLength(target) {
          (this.$v[target].minLength !== undefined) && !this.$v[target].minLength && !this[target + 'Errors'].includes('Must be minimum 5 characters long') && this[target + 'Errors'].push('Must be minimum 5 characters long');
        },
        checkSameAs(target) {
          (this.$v[target].sameAsPassword !== undefined) && !this.$v[target].sameAsPassword && !this[target + 'Errors'].includes('Passwords must be the same') && this[target + 'Errors'].push('Passwords must be the same');
        },
        checkRequired(target){
          console.error(this.$v[target])
          !this.$v[target].required && this[target + 'Errors'].push('This field is required');
        },
        passRepeatHandler(){
          this.validate('passwordRepeat');
        },
      },
      validations: {
        firstName: {
          required,
        },
        lastName: {
          required
        },
        phoneNumber: {
          required,
        },
        password: {
          required,
          minLength: minLength(6),
        },
        passwordRepeat: {
          required,
          minLength: minLength(6),
          sameAsPassword: sameAs('password')
        },
        restaurantName: {
          required,
        },
        restaurantType: {
          required
        },
        restaurantNumber: {
          required,
        },
        restaurantAddress: {
          required,
        },
        restaurantCity: {
          required
        },
        restaurantCountry: {
          required
        },
        restaurantPostalCode: {
          required
        }
      }
    }
</script>

<style scoped lang="stylus">
    .disabled
        pointer-events none
    .label
      font-size: 11px
      color: grey
      position: absolute
      z-index: 1
      transform: translateY(-5px);
</style>
