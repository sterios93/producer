<template>
  <v-dialog
    :value="visibility"
    :fullscreen="lunch.fullscreen || responsive"
    persistent
    min-height="800px"
    max-width="1200px"
    @change="closeDialog">
    <v-card>
      <v-toolbar
        :color="color"
        dark>
        <v-card-title>
          <span class="headline">Create Lunch Offer</span>
        </v-card-title>
        <h3 class="display-2 font-weight-regular"/>
        <v-spacer/>
        <v-btn
          icon
          dark
          @click="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>

            <v-flex xs12>
              <v-layout wrap>
                <v-flex
                  xs12
                  sm6>
                  <v-autocomplete
                    v-model="chosenLunchItems"
                    :items="lunchOnlyItems"
                    item-text="name"
                    item-value="id"
                    return-object
                    label="Lunch Items"
                    multiple
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

                <v-flex
                  xs12
                  sm6>
                  <v-autocomplete
                    v-model="chosenMainItems"
                    :items="mainItems"
                    item-text="name"
                    item-value="id"
                    return-object
                    label="Menu Items"
                    multiple
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
              <v-layout
                row
                wrap>
                <v-flex
                  xs12
                  sm6>
                  <v-flex xs12>
                    <CustomDatePicker
                      :options="timeStart"
                      :error-messages="timeStartErrors"
                      @date-changed="ontimeStartChange"
                      @time-changed="onStartTimeChange"
                    />
                  </v-flex>
                </v-flex>

                <v-flex
                  xs12
                  sm6>
                  <v-flex xs12>
                    <CustomDatePicker
                      :options="timeEnd"
                      :error-messages="timeEndErrors"
                      @date-changed="ontimeEndChange"
                      @time-changed="onEndTimeChange"
                    />
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex
              xs12
              sm4
              md4>
              <v-switch
                :input-value="isActive"
                :value="isActive"
                :loading="activeLoading"
                :disabled="activeLoading"
                hide-details
                @click.prevent="toggleIsActive"
              />
            </v-flex>

          </v-layout>
          <small class="red--text">*indicates required field</small>
        </v-container>
      </v-card-text>

      <v-card-actions class="px-5 pb-5">
        <v-btn
          :disabled="!isEveryThingValid || saveLoading"
          :loading="saveLoading"
          color="blue darken-1 white--text"
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
import { mapState, mapActions } from 'vuex'
import { formatDate, reverseFormatDate } from '../../../../utils/helpers'

export default {
  components: {
    CustomDatePicker
  },

  mixins: [validationMixin],

  data () {
    return {
      visibility: false,
      timeEndErrors: [],
      timeStartErrors: [],
      chosenMainItemsErrors: [],
      chosenLunchItemsErrors: [],
      allFields: [
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
      item: function (state) { return state.lunch[this.action] },
      color: (state) => state.modals.menu.lunch.color,
      lunch: (state) => state.modals.menu.lunch,
      action: (state) => state.modals.menu.lunch.action,
      mainItems: (state) => state.main.shared.mainItems,
      responsive: (state) => state.layout.responsive,
      mainVisibility: (state) => state.modals.menu.main.visibility,
      lunchOnlyItems: (state) => state.main.shared.lunchOnlyItems
    }),
    isEveryThingValid () {
      return this.isFormValidForced // this.isFormValid &&
    },
    discount: {
      get () { return this.item.discount },
      set (value) { this.setDiscount({ payload: value, action: this.action }) }
    },
    lunchItems: {
      // TODO :: all these arrays may cause performance issues (consider implementation whit add/remove item)
      // TODO :: may need to separate in different array because of equal id's (items from main and items from lunch)
      get () { return this.item.items },
      set (value) { this.setItems({ payload: value, action: this.action }) }
    },
    chosenLunchItems: {
      get () { return this.lunchItems.filter(el => el.lunchOnly) },
      set (value) {
        this.updateItems(value, null)
      }
    },
    chosenMainItems: {
      get () { return this.lunchItems.filter(el => !el.lunchOnly) },
      set (value) {
        this.updateItems(null, value)
      }
    },
    isActive () { return this.item.active },
    timeStart: {
      get () {
        if (this.item.timeStart) {
          return formatDate(this.item.timeStart)
        }
        return this.today
      },
      set (value) {
        this.settimeStart({ payload: reverseFormatDate(value), action: this.action })
        this.validateDates(value, this.timeEnd)
      }
    },
    timeEnd: {
      get () {
        if (this.item.timeEnd) {
          return formatDate(this.item.timeEnd)
        }
        return this.today
      },
      set (value) {
        this.settimeEnd({ payload: reverseFormatDate(value), action: this.action })
        this.validateDates(this.timeStart, value)
      }
    }
  },

  created () {
    this.fetchAvailableItems({
      action: this.action
    })
    this.fetchAvailableLunchOnlyItems({
      action: this.action
    })

    if (this.action === 'add') {
      this.timeEnd = this.today
      this.timeStart = this.today
    }

    this.isFormValid = this.action !== 'add'
  },

  mounted () {
    setTimeout(() => {
      this.visibility = true
    }, 100)
  },

  beforeDestroy () {
    this.action === 'add' && this.reset(this.action)
  },

  methods: {
    ...mapActions('lunch', [
      'reset',
      'setItems',
      'saveItem',
      'settimeEnd',
      'setDiscount',
      'toggleActive',
      'settimeStart'
    ]),
    ...mapActions('modals', [
      'setFullscreen',
      'setMenuModalVisibility'
    ]),
    ...mapActions('main', [
      'fetchAvailableItems',
      'fetchAvailableLunchOnlyItems'
    ]),
    ...mapActions('snackbar', {
      setSnackbar: 'setState'
    }),
    onConfirm () {
      this.allFields.forEach(el => this.validate(el))
      this.validateDates(this.timeStart, this.timeEnd)
      // TODO :: send the data to the database
      this.$v.$touch()
      if (this.$v.$invalid || this.hasError()) {
        this.setFormValid(false)
        this.setSnackbar({ snackbar: true, message: 'Please fill correct all fields.', color: 'red' })
      } else {
        this.onFormValid()
        this.setFormValid(true)
      }
    },
    onFormValid () {
      if (this.saveLoading) return
      this.saveLoading = true

      this.saveItem({ action: this.action })
        .then((data) => {
          this.saveLoading = false

          if (!data.success) {
            return this.setSnackbar({ snackbar: true, message: data.error.message, color: 'red' })
          }

          this.closeDialog()
          return this.setSnackbar({ snackbar: true, message: 'Updated successfully', color: 'success' })
        })
        .catch((err) => this.setSnackbar({ snackbar: true, message: err.message, color: 'red' }))
    },
    createItem () {
      this.setMenuModalVisibility({ key: 'main', value: true })
    },
    closeDialog () {
      this.visibility = false
      setTimeout(() => {
        this.setMenuModalVisibility({ key: 'lunch', value: false })
      }, 200)
    },
    toggleIsActive (e) {
      e.stopImmediatePropagation()
      if (this.activeLoading) return
      this.activeLoading = true

      this.$store.dispatch(`lunch/toggleActive`, {
        payload: this.item.id,
        action: this.action
      }).then((data) => {
        this.activeLoading = false
        if (!data.success) {
          return this.setSnackbar({ snackbar: true, message: data.message, color: 'red' })
        }
        this.setSnackbar({ snackbar: true, message: 'Toggled successfully', color: 'success' })
      })
    },
    onStartTimeChange (value) {
      this.timeStart = {
        ...this.timeStart,
        time: value
      }
    },
    onEndTimeChange (value) {
      this.timeEnd = {
        ...this.timeEnd,
        time: value
      }
    },
    ontimeStartChange (value) {
      this.timeStart = {
        ...this.timeStart,
        date: value
      }
    },
    ontimeEndChange (value) {
      this.timeEnd = {
        ...this.timeEnd,
        date: value
      }
    },
    updateItems (chosenLunchItems, chosenMainItems) {
      this.lunchItems = [
        ...(chosenMainItems || this.chosenMainItems),
        ...(chosenLunchItems || this.chosenLunchItems)
      ]
    },
    mainVisibilityHandler (visibility) {
      this.setFullscreen({ key: 'lunch', value: visibility })
    },
    /** ---- Validations ---- **/
    setFormValid (isValid) {
      this.isFormValid = isValid
    },
    setFormValidForced (isValid) {
      this.isFormValidForced = isValid
    },
    validate (target) {
      // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
      this[target + 'Errors'] = []
      this.$v[target].$touch()

      this.setFormValid(!this.hasError())

      this.checkRequired(target)
      this.checkNumeric(target)
      return this[target + 'Errors']
    },
    validateDates (...dates) {
      let istimeEndInThePast = this.checkDates(...dates)
      this.setFormValidForced(!istimeEndInThePast)
      if (istimeEndInThePast) {
        this.timeEndErrors = ['End date is in the past']
      } else {
        this.timeEndErrors = []
      }
    },
    hasError () {
      return this.allFields
        .reduce((result, item) => {
          result.push(!this.$v[item].$error)
          return result
        }, [])
        .includes(false)
    },
    checkNumeric (target) {
      (this.$v[target].numeric !== undefined) && !this.$v[target].numeric && !this[target + 'Errors'].includes('Must be numeric') && this[target + 'Errors'].push('Must be numeric')
    },
    checkRequired (target) {
      !this.$v[target].required && this[target + 'Errors'].push('This field is required')
    },
    /* ---- CUSTOM ---- */
    checkDates (timeStart, timeEnd) {
      let parsedtimeEnd = moment(reverseFormatDate(timeEnd))
      let parsedtimeStart = moment(reverseFormatDate(timeStart))

      return parsedtimeEnd < parsedtimeStart
    }
  },
  validations: {
    chosenMainItems: {
    },
    chosenLunchItems: {
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
