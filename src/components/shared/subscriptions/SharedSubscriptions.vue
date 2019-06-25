<template>
  <v-card>
    <v-card-title>
      <div class="headline">{{ history.length }} Subscriptions</div>
      <v-spacer/>
      <v-text-field
        v-model="text"
        hide-details
        height="50px"
        label="Search for subscription"
        type="text"
      >

        <v-btn
          slot="append-outer"
          icon
          color="grey lighten-4"
          @click="() => {}">
          <v-icon
            color="grey darken-1"
            class="ma-0 pa-0"
            dark
          >search
          </v-icon>
        </v-btn>

      </v-text-field>
    </v-card-title>
    <v-divider/>
    <v-layout
      row
      wrap
      justify-center
      align-center>

      <v-list subheader>
        <v-subheader>Recent subscriptions</v-subheader>
        <div
          v-for="item in history"
          :key="item.id">
          <HistoryItem :item="item"/>
        </div>
      </v-list>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import HistoryItem from './HistoryItem'

export default {
  components: {
    HistoryItem
  },
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapState({
      history: state => state.subscriptions.history
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
        width 90%
</style>
