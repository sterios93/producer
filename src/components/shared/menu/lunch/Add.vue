<template>
    <v-dialog
            :value="visibility"
            @change="closeDialog"
            :fullscreen="lunch.fullscreen || responsive"
            persistent
            min-height="800px"
            max-width="1200px">
        <v-card>
            <v-toolbar dark :color="color">
                <v-card-title>
                    <span class="headline">Create Lunch Offer</span>
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
                            <v-layout wrap>
                                <v-flex xs12 sm6>
                                    <v-autocomplete
                                            v-model="chosenLunchItems"
                                            :items="allItems"
                                            item-text="name"
                                            item-value="id"
                                            return-object
                                            label="Lunch Items"
                                            multiple
                                            :error-messages="chosenLunchItemsErrors"
                                            @blur="validate('chosenLunchItems')"
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

                                <v-flex xs12 sm6>
                                    <v-autocomplete
                                            v-model="chosenMainItems"
                                            :items="mainItems"
                                            item-text="name"
                                            item-value="id"
                                            return-object
                                            label="Menu Items"
                                            multiple
                                            :error-messages="chosenMainItemsErrors"
                                            @blur="validate('chosenMainItems')"
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
                            </v-layout>
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

                        <v-flex xs12 sm4 md4>
                            <v-switch
                                    :input-value="isActive"
                                    :value="isActive"
                                    :loading="activeLoading"
                                    :disabled="activeLoading"
                                    @click.prevent="toggleIsActive"
                                    hide-details
                            >
                            </v-switch>
                        </v-flex>

                    </v-layout>
                    <small class="red--text">*indicates required field</small>
                </v-container>
            </v-card-text>

            <v-card-actions class="px-5 pb-5">
                <v-btn
                        color="blue darken-1 white--text"
                        :disabled="!isEveryThingValid || saveLoading"
                        :loading="saveLoading"
                        block
                        @click="onConfirm"
                >Save</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
  import CustomDatePicker from '../../CustomDatePicker'

  import moment from 'moment'

  import { validationMixin } from 'vuelidate'
  import { required, numeric } from 'vuelidate/lib/validators'
  import {mapState, mapActions} from 'vuex'
  import {formatDate, reverseFormatDate} from '../../../../utils/helpers'

  export default {
    components: {
      CustomDatePicker
    },

    mixins: [validationMixin],

    data() {
      return {
        visibility: false,
        endDateErrors: [],
        startDateErrors: [],
        chosenMainItemsErrors: [],
        chosenLunchItemsErrors: [],
        allFields: [
          'chosenMainItems',
          'chosenLunchItems',
        ],
        today: {
          date: new Date().toISOString().substr(0, 10),
          time: '12:00',
          visible: false
        },
        isFormValid: false,
        isFormValidForced: true,
        activeLoading: false,
        saveLoading: false
      }
    },

    computed: {
      ...mapState({
        item: function (state) {return state.lunch[this.action]},
        color: (state) => state.modals.menu.lunch.color,
        lunch: (state) => state.modals.menu.lunch,
        action: (state) => state.modals.menu.lunch.action,
        allItems: (state) => state.lunch.shared.allItems,
        mainItems: (state) => state.main.list.items,
        responsive: (state) => state.layout.responsive,
        mainVisibility: (state) => state.modals.menu.main.visibility,
      }),
      isEveryThingValid() {
        return this.isFormValid && this.isFormValidForced
      },
      discount: {
        get() {return this.item.discount},
        set(value) {this.setDiscount({payload: value, action: this.action})}
      },
      lunchItems: {
        // TODO :: all these arrays may cause performance issues (consider implementation whit add/remove item)
        // TODO :: may need to separate in different array because of equal id's (items from main and items from lunch)
        get() {return this.item.items},
        set(value) {this.setItems({payload: value, action: this.action})}
      },
      chosenLunchItems: {
        get() {return this.lunchItems.filter(el => el.lunchOnly)},
        set(value) {
          this.updateItems(value, null)
          this.validate('chosenLunchItems')
        }
      },
      chosenMainItems: {
        get() {return this.lunchItems.filter(el => !el.lunchOnly)},
        set(value) {
          this.updateItems(null, value)
          this.validate('chosenMainItems')
        }
      },
      isActive() {return this.item.isActive},
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
      ...mapActions('lunch', [
        'reset',
        'setItems',
        'saveItem',
        'setEndDate',
        'setDiscount',
        'toggleActive',
        'setStartDate',
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
        if (this.$v.$invalid || this.hasError()) {
          this.setFormValid(false)
          this.setSnackbar({snackbar: true, message: 'Please fill correct all fields.', color: 'red'});
        } else {
          this.onFormValid();
          this.setFormValid(true);
        }
      },
      onFormValid() {
        if (this.saveLoading) return
        this.saveLoading = true

        this.saveItem({action: this.action})
          .then((data) => {
            this.saveLoading = false
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
          this.setMenuModalVisibility({key: 'lunch', value: false})
        }, 200)
      },
      toggleIsActive(e) {
        e.stopImmediatePropagation()
        if (this.activeLoading) return
        this.activeLoading = true

        this.$store.dispatch(`lunch/toggleActive`, {
          payload: this.item.id,
          action: this.action
        }).then((data) => {
          this.activeLoading = false
          if (!data.success) {
            return this.setSnackbar({snackbar: true, message: data.message, color: 'red'});
          }
          this.setSnackbar({snackbar: true, message: 'Toggled successfully', color: 'success'});
        })
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
      updateItems(chosenLunchItems, chosenMainItems) {
        this.lunchItems = [
          ...(chosenMainItems ? chosenMainItems : this.chosenMainItems),
          ...(chosenLunchItems ? chosenLunchItems : this.chosenLunchItems)
        ]
      },
      mainVisibilityHandler(visibility) {
        this.setFullscreen({key: 'lunch', value: visibility})
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
      chosenMainItems: {
        required
      },
      chosenLunchItems: {
        required
      },
    }
  }
</script>

<style scoped lang="stylus">

</style>
