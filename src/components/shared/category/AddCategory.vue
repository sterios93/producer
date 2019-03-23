<template>
    <v-dialog
            :value="category.visibility"
            @change="closeDialog"
            :fullscreen="category.fullscreen"
            persistent
            min-height="800px"
            max-width="500px">
        <v-card>
            <v-toolbar dark :color="color">
                <v-card-title>
                    <span class="headline">Create category</span>
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
    computed: {
      ...mapState({
        item: (state) => state.categories.current,
        color: (state) => state.modals.category.color,
        category: (state) => state.modals.category,
        responsive: (state) => state.layout.responsive,
      }),
      name: {
        get() {return this.item.name},
        set(value) {this.setCategoryName(value)}
      },
    },

    methods: {
      ...mapActions('categories', [
        'saveItem',
        'setCategoryName'
      ]),
      ...mapActions('modals', [
        'setFullscreen',
        'setModalVisibility'
      ]),
      onConfirm() {
        this.saveItem({action: this.action})
      },
      closeDialog() {
        this.setModalVisibility({key: 'category', value: false})
      },

    }
  }
</script>

<style scoped lang="stylus">

</style>