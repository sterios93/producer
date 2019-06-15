<template>
  <div class="overflow-y-scroll overflow-x-hidden">
    <v-slide-x-transition
      xs12
      group
      mode="out-in"
      tag="ul"
      class="pa-0 ma-0 layout row wrap d-flex"
      color="transparent">
      <v-flex
        v-for="(item, index) in items"
        :key="index"
        xs12
        lg6>
        <SpecialCard
          v-bind="menuItemProps"
          :item="item"/>
      </v-flex>
    </v-slide-x-transition>
  </div>
</template>

<script>
import SpecialCard from '../SpecialCard'

export default {
  components: {
    SpecialCard
  },

  props: {
    items: Array
  },

  data () {
    return {}
  },

  computed: {
    menuItemProps () {
      return {
        isSpecial: true,
        isEditable: true,
        type: 'special'
      }
    }
  },

  methods: {
    onItemClick () {
    }
  }
}
</script>

<style scoped lang="stylus">
    .overflow-y-scroll
        overflow-y scroll
        height 75vh
</style>
