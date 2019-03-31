<template>
    <v-dialog
            :value="visibility"
            @change="closeDialog"
            :fullscreen="special.fullscreen || responsive"
            persistent
            min-height="800px"
            max-width="1200px">
        <v-card>
            <v-toolbar dark :color="color">
                <v-card-title>
                    <span class="headline">Create Special Offer</span>
                </v-card-title>
                <h3 class="display-2 font-weight-regular"></h3>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                    label="Name*"
                                    v-model="name"
                                    :error-messages="nameErrors"
                                    @blur="validate('name')"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field
                                    label="Discount*"
                                    v-model="discount"
                                    numeric
                                    :error-messages="discountErrors"
                                    @blur="validate('discount')"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-layout>
                                <v-flex v-if="image" xs2>
                                    <img :src="image" height="50" />
                                </v-flex>
                                <v-flex xs12>
                                    <VFileUpload @file-picked="onFilePicked"/>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field
                                    label="Price*"
                                    :disabled="true"
                                    v-model="price"
                                    required
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-autocomplete
                                    v-model="specialItems"
                                    :items="mainItems"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    label="Menu Items"
                                    multiple
                                    :error-messages="specialItemsErrors"
                                    @blur="validate('specialItems')"
                            >
                                <template v-slot:append>
                                    <v-slide-x-reverse-transition mode="out-in">
                                        <v-icon
                                                color="success"
                                                @click="createItem"
                                        >add
                                        </v-icon>
                                    </v-slide-x-reverse-transition>
                                </template>
                            </v-autocomplete>
                        </v-flex>

                        <v-flex xs12>
                            <v-layout row wrap>
                                <v-flex xs12 sm6>
                                    <v-flex xs12>
                                        <CustomDatePicker
                                                :options="startDate"
                                                :error-messages="startDateErrors"
                                                @date-changed="onStartDateChange"
                                                @time-changed="onStartTimeChange"
                                        />
                                    </v-flex>
                                </v-flex>

                                <v-flex xs12 sm6>
                                    <v-flex xs12>
                                        <CustomDatePicker
                                                :options="endDate"
                                                :error-messages="endDateErrors"
                                                @date-changed="onEndDateChange"
                                                @time-changed="onEndTimeChange"
                                        />
                                    </v-flex>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12>
                            <v-textarea
                                    v-model="description"
                                    name="input-7-1"
                                    label="Description"
                                    value=""
                                    hint="Example: Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust."
                            ></v-textarea>
                        </v-flex>

                    </v-layout>
                    <small class="red--text">*indicates required field</small>
                </v-container>
            </v-card-text>

            <v-card-actions class="px-5 pb-5">
                <v-btn color="blue darken-1 white--text" :disabled="!isEveryThingValid"  block @click="onConfirm">Save</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
  import VFileUpload from '../../../shared/VFileUpload'
  import CustomDatePicker from '../../CustomDatePicker'

  import moment from 'moment'

  import { validationMixin } from 'vuelidate'
  import { required, numeric } from 'vuelidate/lib/validators'
  import {mapState, mapActions, mapGetters} from 'vuex'
  import {formatDate, reverseFormatDate} from '../../../../utils/helpers'

  export default {
    components: {
      VFileUpload,
      CustomDatePicker
    },

    mixins: [validationMixin],

    data() {
      return {
        visibility: false,
        nameErrors: [],
        endDateErrors: [],
        discountErrors: [],
        startDateErrors: [],
        specialItemsErrors: [],
        allFields: [
          'name',
          'discount',
          'specialItems',
        ],
        today: {
          date: new Date().toISOString().substr(0, 10),
          time: '12:00',
          visible: false
        },
        isFormValid: false,
        isFormValidForced: true,
      }
    },

    computed: {
      ...mapState({
        item: function (state) { return state.special[this.action]},
        color: (state) => state.modals.menu.special.color,
        action: (state) => state.modals.menu.special.action,
        special: (state) => state.modals.menu.special,
        mainItems: (state) => state.main.list.items,
        responsive: (state) => state.layout.responsive,
        mainVisibility: (state) => state.modals.menu.main.visibility,
      }),
      isEveryThingValid() {
        return this.isFormValid && this.isFormValidForced
      },
      name: {
        get() {return this.item.name},
        set(value) {
          this.setName({payload: value, action: this.action})
          this.validate('name')
        }
      },
      image: {
        get() {return this.item.image},
        set(value) {
          this.setPictureUrl({payload: value, action: this.action})
        }
      },
      price: {
        get() {return this.$store.getters['special/getPrice'](this.action)},
        set(value) {
          this.setPrice({payload: value, action: this.action})
        }
      },
      discount: {
        get() {return this.item.discount},
        set(value) {
          this.setDiscount({payload: value, action: this.action})
          this.validate('discount')
        }
      },
      picture: {
        get() {return this.item.picture},
        set(value) {
          this.setPicture({payload: value, action: this.action})
        }
      },
      specialItems: {
        get() {return this.item.items},
        set(value) {
          this.setItems({payload: value, action: this.action})
          this.validate('specialItems')
        }
      },
      description: {
        get() {return this.item.description},
        set(value) {
          this.setDescription({payload: value, action: this.action})
        }
      },
      startDate: {
        get() {
          if (this.item.startDate) {
            return formatDate(this.item.startDate)
          }
          return this.today
        },
        set(value) {
          this.setStartDate({payload: reverseFormatDate(value), action: this.action})
          this.validateDates(value, this.endDate)
        }
      },
      endDate: {
        get() {
          if (this.item.endDate) {
            return formatDate(this.item.endDate)
          }
          return this.today
        },
        set(value) {
          this.setEndDate({payload: reverseFormatDate(value), action: this.action})
          this.validateDates(this.startDate, value)
        }
      },
    },

    created() {
      this.endDate = this.today
      this.startDate = this.today

      this.isFormValid = this.action !== 'add'
    },

    mounted() {
      setTimeout(() => {
        this.visibility = true
      }, 100)
    },

    beforeDestroy() {
      this.action === 'add' && this.reset(this.action)
    },

    methods: {
      ...mapActions('special', [
        'reset',
        'setName',
        'setPrice',
        'setItems',
        'saveItem',
        'setEndDate',
        'setPicture',
        'setDiscount',
        'setStartDate',
        'setPictureUrl',
        'setDescription',
      ]),
      ...mapActions('modals', [
        'setFullscreen',
        'setMenuModalVisibility'
      ]),
      ...mapActions('snackbar', {
        setSnackbar: 'setState'
      }),
      onConfirm() {
        this.allFields.forEach(el => this.validate(el))
        this.validateDates(this.startDate, this.endDate)
        // TODO :: send the data to the database
        this.$v.$touch();
        console.log(this.$v.$invalid)
        console.log(this.hasError())
        if (this.$v.$invalid || this.hasError()) {
          this.setFormValid(false)
          this.setSnackbar({snackbar: true, message: 'Please fill correct all fields.', color: 'red'});
        } else {
          this.onFormValid();
          this.setFormValid(true);
        }
      },
      onFormValid() {
        this.saveItem({action: this.action})
          .then((data) => {
            if (!data.success) {
              return this.setSnackbar({snackbar: true, message: data.message, color: 'red'})
            }
            this.closeDialog()
            return this.setSnackbar({snackbar: true, message: 'Updated successfully', color: 'success'})
          })
          .catch((err) => this.setSnackbar({snackbar: true, message: err.message, color: 'red'}))      },
      createItem() {
        this.setMenuModalVisibility({key: 'main', value: true})
      },
      closeDialog() {
        this.visibility = false
        setTimeout(() => {
          this.setMenuModalVisibility({key: 'special', value: false})
        }, 200)
      },
      onFilePicked({file, url}) {
        this.image = url
        this.setPicture({payload: file, action: this.action})
      },
      onStartTimeChange(value) {
        this.startDate = {
          ...this.startDate,
          time: value
        }
      },
      onEndTimeChange(value) {
        this.endDate = {
          ...this.endDate,
          time: value
        }
      },
      onStartDateChange(value) {
        this.startDate = {
          ...this.startDate,
          date: value
        }
      },
      onEndDateChange(value) {
        this.endDate = {
          ...this.endDate,
          date: value
        }
      },
      mainVisibilityHandler(visibility) {
        this.setFullscreen({key: 'special', value: visibility})
      },
      /** ---- Validations ---- **/
      setFormValid(isValid) {
        this.isFormValid = isValid
      },
      setFormValidForced(isValid) {
        this.isFormValidForced = isValid
      },
      validate(target) {
        // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
        this[target + 'Errors'] = []
        this.$v[target].$touch()

        this.setFormValid(!this.hasError())

        this.checkRequired(target)
        this.checkNumeric(target)
        return this[target + 'Errors']
      },
      validateDates(...dates) {
        let isEndDateInThePast = this.checkDates(...dates)
        this.setFormValidForced(!isEndDateInThePast)
        if (isEndDateInThePast) {
          this.endDateErrors = ['End date is in the past']
        } else {
          this.endDateErrors = []
        }
      },
      hasError() {
        return this.allFields
          .reduce((result, item) => {
            result.push(!this.$v[item].$error)
            return result
          }, [])
          .includes(false)
      },
      checkNumeric(target) {
        (this.$v[target].numeric !== undefined) && !this.$v[target].numeric && !this[target + 'Errors'].includes('Must be numeric') && this[target + 'Errors'].push('Must be numeric')
      },
      checkRequired(target) {
        !this.$v[target].required && this[target + 'Errors'].push('This field is required')
      },
      /* ---- CUSTOM ---- */
      checkDates(startDate, endDate) {
        let parsedEndDate = moment(reverseFormatDate(endDate))
        let parsedStartDate = moment(reverseFormatDate(startDate))

        return parsedEndDate < parsedStartDate
      }
    },
    validations: {
      name: {
        required
      },
      discount: {
        required,
        numeric
      },
      specialItems: {
        required
      },
    }
  }
</script>

<style scoped lang="stylus">

</style>