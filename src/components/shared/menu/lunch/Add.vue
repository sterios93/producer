<template>
    <v-dialog
            :value="lunch.visibility"
            @change="closeDialog"
            :fullscreen="lunch.fullscreen"
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

                        <v-flex xs12 sm6>
                            <v-autocomplete
                                    :value="chosenSpecialItems"
                                    @input="onChosenSpecialItemsChange"
                                    :items="allItems"
                                    item-text="name"
                                    item-value="id"
                                    label="Menu Items"
                                    multiple
                            >
                                <template v-slot:append-outer>
                                    <v-slide-x-reverse-transition mode="out-in">
                                        <v-icon
                                                :key="`icon-${isEditing}`"
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
                                    :value="chosenMainItems"
                                    @input="onChosenMainItemsChange"
                                    :items="mainItems"
                                    item-text="name"
                                    item-value="id"
                                    label="Menu Items"
                                    multiple
                            >
                                <template v-slot:append-outer>
                                    <v-slide-x-reverse-transition mode="out-in">
                                        <v-icon
                                                :key="`icon-${isEditing}`"
                                                color="success"
                                                @click="createItem"
                                        >add
                                        </v-icon>
                                    </v-slide-x-reverse-transition>
                                </template>
                            </v-autocomplete>
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

  export default {
    data() {
      return {
        isEditing: false,
        chosenSpecialItems: [],
        chosenMainItems: []
      }
    },

    computed: {
      ...mapState({
        item: (state) => state.lunch.add,
        allItems: (state) => state.lunch.shared.allItems,
        color: (state) => state.app.color,
        lunch: (state) => state.modals.menu.lunch,
        mainVisibility: (state) => state.modals.menu.main.visibility,
        mainItems: (state) => state.main.list.items,
      }),
      discount: {
        get() {return this.item.discount},
        set(value) {this.setDiscount(value)}
      },
      lunchItems: {
        get() {return this.item.items},
        set(value) {this.setItems(value)}
        // TODO :: all these arrays may cause performance issues (consider implementation whit add/remove item)
        // TODO :: may need to separate in different array because of equal id's (items from main and items from lunch)
      },
    },

    watch: {
      mainVisibility: 'mainVisibilityHandler'
    },

    methods: {
      ...mapActions('lunch', [
        'setDiscount',
        'setItems',
        'saveItem',
      ]),
      ...mapActions('modals', [
        'setMenuModalVisibility',
        'setFullscreen'
      ]),
      // TODO :: all these arrays may cause performance issues (consider implementation whit add/remove item)
      onChosenSpecialItemsChange(value) {
        this.chosenSpecialItems = value
        this.updateItems()
      },
      onChosenMainItemsChange(value) {
        this.chosenMainItems = value
        this.updateItems()
      },
      updateItems() {
        this.lunchItems = [...this.chosenSpecialItems, ...this.chosenMainItems]
      },
      onConfirm() {
        this.saveItem({action: 'add'})
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