<template>
    <v-dialog
            :value="special.visibility"
            @change="closeDialog"
            :fullscreen="special.fullscreen"
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
                            <img :src="pictureUrl" height="100" v-if="pictureUrl"/>
                            <VFileUpload @file-picked="onFilePicked"/>
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
  import {mapState, mapActions, mapGetters} from 'vuex'

  export default {
    components: {
      VFileUpload
    },

    data() {
      return {
        isEditing: false,
      }
    },

    computed: {
      ...mapState({
        item: (state) => state.special.add,
        color: (state) => state.app.color,
        special: (state) => state.modals.menu.special,
        mainVisibility: (state) => state.modals.menu.main.visibility,
        mainItems: (state) => state.main.list.items,
      }),
      ...mapGetters('special', ['getPrice']),
      name: {
        get() {return this.item.name},
        set(value) {this.setName(value)}},
      picture: {
        get() {return this.item.picture},
        set(value) {this.setPicture(value)}
      },
      pictureUrl: {
        get() {return this.item.pictureUrl},
        set(value) {this.setPictureUrl(value)}
      },
      discount: {
        get() {return this.item.discount},
        set(value) {this.setDiscount(value)}
      },
      price: {
        get() {return this.getPrice},
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

    watch: {
      mainVisibility: 'mainVisibilityHandler'
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
        'saveItem',
      ]),
      ...mapActions('modals', [
        'setMenuModalVisibility',
        'setFullscreen'
      ]),
      onFilePicked({file, url}) {
        this.pictureUrl = url
        this.setPicture(file)
      },
      onConfirm() {
        this.saveItem({action: 'add'})
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