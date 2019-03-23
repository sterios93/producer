<template>
    <v-dialog
            :value="lunch.visibility"
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
  import {mapState, mapActions} from 'vuex'
  import CustomDatePicker from '../../CustomDatePicker'

  export default {
    components: {
      CustomDatePicker
    },

    computed: {
      ...mapState({
        item: function (state) {return state.lunch[this.action]},
        lunch: (state) => state.modals.menu.lunch,
        action: (state) => state.modals.menu.lunch.action,
        responsive: (state) => state.layout.responsive,
        allItems: (state) => state.lunch.shared.allItems,
        color: (state) => state.app.color,
        mainVisibility: (state) => state.modals.menu.main.visibility,
        mainItems: (state) => state.main.list.items,
      }),
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
        get() {return this.lunchItems.filter(el => el.isLunchOnly)},
        set(value) {this.updateItems(value, null)}
      },
      chosenMainItems: {
        get() {return this.lunchItems.filter(el => !el.isLunchOnly)},
        set(value) {this.updateItems(null, value)}
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
      },
    },

    methods: {
      ...mapActions('lunch', [
        'setDiscount',
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
      updateItems(chosenLunchItems, chosenMainItems) {
        this.lunchItems = [
          ...(chosenLunchItems ? chosenLunchItems : this.chosenLunchItems),
          ...(chosenMainItems ? chosenMainItems : this.chosenMainItems)
        ]
      },
      onConfirm() {
        this.saveItem({action: this.action})
      },
      closeDialog() {
        this.setMenuModalVisibility({key: 'lunch', value: false})
      },
      mainVisibilityHandler(visibility) {
        this.setFullscreen({key: 'lunch', value: visibility})
      },
      createItem() {
        this.setMenuModalVisibility({key: 'main', value: true})
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>