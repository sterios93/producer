<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    class="pa-0 ma-0"
  >
    <v-layout
      row
      wrap
      class="pa-0 ma-0">
      <v-flex
        xs12
        class="pa-5">
        <div class="home-page-title">Quick Access</div>
        <QuickAccess />
      </v-flex>

      <v-flex
        xs12
        class="pa-5">
        <div class="home-page-title">Buy Time</div>
        <Memberships/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Memberships from '../components/shared/subscriptions/Memberships'
import QuickAccess from '../components/shared/quickaccess/QuickAccess'

export default {
  components: {
    Memberships,
    QuickAccess
  },
  data () {
    return {
    }
  },
  methods: {
    complete (index) {
      this.list[index] = !this.list[index]
    }
  }
}
</script>

<style scoped lang="stylus">
    .background
        background-color #f5f5f5
    .home-page-title
        text-align center
        font-weight bold
        font-size 30px
        margin-bottom: 20px
        color #60b6ff
</style>
