<template>
    <v-dialog
            :value="confirm.visibility"
            @change="closeDialog"
            :fullscreen="confirm.fullscreen"
            persistent
            min-height="800px"
            max-width="500px">
        <v-card>
            <v-toolbar dark :color="color">
                <v-card-title>
                    <span class="headline">Message</span>
                </v-card-title>
                <h3 class="display-2 font-weight-regular"></h3>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text class="px-5 pb-5 text-xs-center">
                <span class="title confirm-massage">Are you sure you want to {{action}} ?</span>
            </v-card-text>

            <v-card-actions class="pb-5">
                <v-btn color="blue-grey lighten-2" dark block @click="closeDialog">Cancel</v-btn>
                <v-btn color="red lighten-2" dark block @click="onConfirm">Confirm</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapState({
        color: (state) => state.modals.confirm.color,
        action: (state) => state.modals.confirm.action,
        confirm: (state) => state.modals.confirm,
        responsive: (state) => state.layout.responsive,
      }),
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
        this.confirm.callback()
        this.closeDialog()
      },
      closeDialog() {
        this.setModalVisibility({key: 'confirm', value: false})
      },

    }
  }
</script>

<style scoped lang="stylus">
    .confirm-massage
        color #000000c2
</style>