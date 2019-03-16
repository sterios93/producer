<template>
    <v-dialog :value="special.visibility" @change="closeDialog" persistent max-width="800px">
        <v-card>
            <v-toolbar dark :color="color">
                <v-card-title>
                    <span class="headline">Create Dish</span>
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
                            <v-text-field label="Weight*" v-model="weight" required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <VFileUpload/>
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
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      VFileUpload
    },

    computed: {
      ...mapState({
        item: (state) => state.special.add,
        color: (state) => state.app.color,
        special: (state) => state.modals.menu.special,
        mainItems: (state) => state.main.list.items,
      }),
      name: {
        get() {return this.item.name},
        set(value) {this.setName(value)}},
      picture: {
        get() {return this.item.picture},
        set(value) {this.setPicture(value)}
      },
      weight: {
        get() {return this.item.weight},
        set(value) {this.setWeight(value)}
      },
      price: {
        get() {return this.item.price},
        set(value) {this.setPrice(value)}},
      specialItems: {
        get() {return this.item.items},
        set(value) {this.setItems(value)}
      },
      description: {
        get() {return this.item.description},
        set(value) {this.setDescription(value)}
      },
    },

    data() {
      return {
        dialog: true,
        isEditing: false,
      }
    },

    methods: {
      ...mapActions('special', [
        'setName',
        'setPicture',
        'setDescription',
        'setWeight',
        'setPrice',
        'setItems',
        'saveItem'
      ]),
      ...mapActions('modals', ['setMenuModalVisibility']),
      onConfirm() {
        this.saveItem({action: 'add'})
      },
      closeDialog() {
        this.setMenuModalVisibility({key: 'special', value: false})
      },
      createItem() {
        // TODO :: create menu item
      }
    }
  }
</script>

<style scoped lang="stylus">
    .v-toolbar:not(.v-toolbar--fixed) .v-toolbar__content
        margin-left: 0 !important
</style>