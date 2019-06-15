<template>
  <div>

    <v-toolbar
      class="toolbar"
      dark>
      <v-tabs
        v-model="activeTab"
        color="transparent"
        grow >
        <v-tabs-slider color="yellow"/>
        <v-tab
          v-for="(tab, key) in tabs"
          :key="key"
        >
          {{ tab }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <MainList v-bind="MainMListProps" />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <SpecialList v-bind="SpecialListProps" />
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <LunchList v-bind="LunchListProps" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
import LunchList from '../../shared/menu/lunch/List'
import MainList from '../../shared/menu/main/List'
import SpecialList from '../../shared/menu/special/List'

import { mapState, mapActions } from 'vuex'

export default {

  components: {
    LunchList,
    MainList,
    SpecialList
  },
  props: {
    color: String
  },

  data () {
    return {
      activeTab: null,
      tabs: ['Main Menu', 'Special Offers', 'Lunch Menu']
    }
  },

  computed: {
    MainMListProps () {
      return {
        color: this.color,
        items: this.$store.state.main.list.items
      }
    },
    LunchListProps () {
      return {
        color: this.color,
        items: this.$store.state.lunch.list.items
      }
    },
    SpecialListProps () {
      return {
        color: this.color,
        items: this.$store.state.special.list.items
      }
    }
  },

  watch: {
    activeTab: {
      	handler: function (value) {
        this.$emit('active-tab-change', value)
        // TODO: Add loader , during the response time
        //   Main Menu
        if (value === 0) this.fetchMenuItems().then(data => !data.success && this.errorHandler(data))
        // Special offers
        if (value === 1) this.fetchSpecialOffers().then(data => !data.success && this.errorHandler(data))
        // Lunch offers
        if (value === 2) this.fetchLunchItems().then(data => !data.success && this.errorHandler(data))
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions('main', ['fetchMenuItems']),
    ...mapActions('special', ['fetchSpecialOffers']),
    ...mapActions('lunch', ['fetchLunchItems']),
    ...mapActions('snackbar', ['setState']),
    errorHandler (data) {
 			this.setState({ snackbar: true, message: data.error && data.error.message, color: 'red' })
    }
  }
}
</script>

<style scoped lang="stylus">
    .toolbar
        background-image: linear-gradient(#4caf50, rgba(76, 175, 80, 0.82))
</style>
