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
                                <v-flex xs2>
                                    <img :src="image" height="50" v-if="image"/>
                                </v-flex>
                                <v-flex xs10>
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


  export default {
    components: {
      VFileUpload,
      CustomDatePicker
    },

    computed: {
      ...mapState({
        item: function (state) { return state.special[this.action]},
        special: (state) => state.modals.menu.special,
        action: (state) => state.modals.menu.special.action,
        responsive: (state) => state.layout.responsive,
        color: (state) => state.app.color,
        mainVisibility: (state) => state.modals.menu.main.visibility,
        mainItems: (state) => state.main.list.items,
      }),
      name: {
        get() {return this.item.name},
        set(value) {this.setName({payload: value, action: this.action})}
      },
      picture: {
        get() {return this.item.picture},
        set(value) {this.setPicture({payload: value, action: this.action})}
      },
      image: {
        get() {return this.item.image},
        set(value) {this.setPictureUrl({payload: value, action: this.action})}
      },
      discount: {
        get() {return this.item.discount},
        set(value) {this.setDiscount({payload: value, action: this.action})}
      },
      price: {
        get() {return this.$store.getters['special/getPrice'](this.action)},
        set(value) {this.setPrice({payload: value, action: this.action})}
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
          return {
            date: this.item.startDate.date || new Date().toISOString().substr(0, 10),
            time: this.item.startDate.time || '12:00',
            visible: false
          }
        },
        set(value) {
          this.setStartDate({payload: value, action: this.action})
        }
      },
      endDate: {
        get() {
          return {
            date: this.item.endDate.date || new Date().toISOString().substr(0, 10),
            time: this.item.endDate.time || '12:00',
            visible: false
          }
        },
        set(value) {
          this.setEndDate({payload: value, action: this.action})
        }
      }
    },

    methods: {
      ...mapActions('special', [
        'setName',
        'setPicture',
        'setPictureUrl',
        'setDescription',
        'setDiscount',
        'setPrice',
        'setItems',
        'setStartDate',
        'setEndDate',
        'saveItem',
      ]),
      ...mapActions('modals', [
        'setMenuModalVisibility',
        'setFullscreen'
      ]),
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
      onFilePicked({file, url}) {
        this.image = url
        this.setPicture({payload: file, action: this.action})
      },
      onConfirm() {
        this.saveItem({action: this.action})
      },
      closeDialog() {
        this.setMenuModalVisibility({key: 'special', value: false})
      },
      mainVisibilityHandler(visibility) {
        this.setFullscreen({key: 'special', value: visibility})
      },
      createItem() {
        this.setMenuModalVisibility({key: 'main', value: true})
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>