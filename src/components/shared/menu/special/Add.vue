<template>
    <v-dialog
            :value="special.visibility"
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
                            <v-text-field label="Name*" v-model="name" required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field label="Discount*" v-model="discount" required></v-text-field>
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
                            <v-text-field label="Price*" v-model="price" required></v-text-field>
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
                                                @date-changed="onStartDateChange"
                                                @time-changed="onStartTimeChange"
                                        />
                                    </v-flex>
                                </v-flex>

                                <v-flex xs12 sm6>
                                    <v-flex xs12>
                                        <CustomDatePicker
                                                :options="endDate"
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
                <v-btn color="blue darken-1" block @click="onConfirm">Save</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
  import VFileUpload from '../../../shared/VFileUpload'
  import CustomDatePicker from '../../CustomDatePicker'
  import {mapState, mapActions, mapGetters} from 'vuex'
  import {formatDate, reverseFormatDate} from '../../../../utils/helpers'

  export default {
    components: {
      VFileUpload,
      CustomDatePicker
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
      name: {
        get() {return this.item.name},
        set(value) {this.setName({payload: value, action: this.action})}
      },
      image: {
        get() {return this.item.image},
        set(value) {this.setPictureUrl({payload: value, action: this.action})}
      },
      price: {
        get() {return this.$store.getters['special/getPrice'](this.action)},
        set(value) {this.setPrice({payload: value, action: this.action})}
      },
      discount: {
        get() {return this.item.discount},
        set(value) {this.setDiscount({payload: value, action: this.action})}
      },
      picture: {
        get() {return this.item.picture},
        set(value) {this.setPicture({payload: value, action: this.action})}
      },
      specialItems: {
        get() {return this.item.items},
        set(value) {this.setItems({payload: value, action: this.action})}
      },
      description: {
        get() {return this.item.description},
        set(value) {this.setDescription({payload: value, action: this.action})}
      },
      startDate: {
        get() {
          if (this.item.startDate) {
            return formatDate(this.item.startDate)
          }
          return {
            date: new Date().toISOString().substr(0, 10),
            time: '12:00',
            visible: false
          }
        },
        set(value) {
          this.setStartDate({payload: reverseFormatDate(value), action: this.action})
        }
      },
      endDate: {
        get() {
          if (this.item.endDate) {
            return formatDate(this.item.endDate)
          }
          return {
            date: new Date().toISOString().substr(0, 10),
            time: '13:00',
            visible: false
          }
        },
        set(value) {
          this.setEndDate({payload: reverseFormatDate(value), action: this.action})
        }
      },
    },

    methods: {
      ...mapActions('special', [
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
        this.setMenuModalVisibility({key: 'special', value: false})
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
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>