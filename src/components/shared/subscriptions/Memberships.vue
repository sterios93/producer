<template>
  <v-layout
    justify-center
    row
    wrap>
    <v-flex
      v-for="(membership, key, index) of memberships"
      :key="key"
      xs12
      sm6
      lg3
      class="card-container" >
      <PlanCard
        v-bind="membership"
        :is-active="currentMembership && membership.type === currentMembership.type"/>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PlanCard from './PlanCardNew'

export default {
  components: {
    PlanCard
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      memberships: state => state.subscriptions.memberships,
      currentMembership: state => state.subscriptions.currentMembership
    })
  },
  methods: {
    ...mapActions({
      setModalData: 'modals/setModalData'
    }),
    fit (element = this.membershipContainer) {
      if (!element) return
      const contentWidth = element.offsetWidth
      const contentHeight = element.offsetHeight

      const availableWidth = element.parentElement.offsetWidth
      const availableHeight = element.parentElement.offsetHeight

      const scale = Math.min(
        availableWidth / contentWidth,
        availableHeight / contentHeight
      )
      element.style.transform = `scale(${scale})`
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
