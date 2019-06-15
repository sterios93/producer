<template>
  <v-container
    fluid
    fill-height
    grid-list-xl>
    <v-layout
      row
      wrap
      justify-center>
      <v-flex
        xs12
        lg10>
        <SharedSubscriptions/>
      </v-flex>

      <v-flex
        xs12
        lg10
        class="pt-4">
        <Memberships />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Memberships from '../components/shared/subscriptions/Memberships'
import SharedSubscriptions from '../components/shared/subscriptions/SharedSubscriptions'

export default {
  components: {
	    Memberships,
	    SharedSubscriptions
  },
  data () {
    return {
	      tabs: null,
	      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  computed: {
    ...mapState({
      color: state => state.app.color
    })
  }
}
</script>

<style scoped lang="stylus">
    .container
        padding 16px !important
    >>> .v-input
        .v-input__slot
            min-height unset !important

        .v-input__append-outer
            margin 0 !important
            padding: 0 !important
            justify-content: center !important
            align-items: center !important

            .v-btn
                bottom: 0 !important
    >>> .v-list
        width 95%
</style>
