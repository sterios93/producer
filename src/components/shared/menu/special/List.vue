<template>
    <v-slide-x-transition xs12 group mode="out-in" tag="ul" class="pa-0 layout row wrap d-flex overflow-y-scroll overflow-x-hidden" color="transparent">
        <v-flex v-for="item in items" xs12 lg6 :key="item.id">
            <SpecialCard v-bind="menuItemProps" :item="item"/>
        </v-flex>
    </v-slide-x-transition>
</template>

<script>
  import MenuItem from '../MenuItem'
  import SpecialCard from './SpecialCard'

  export default {
    components: {
      MenuItem,
      SpecialCard
    },

    props: {
      items: Array
    },

    computed: {
      menuItemProps() {
        return {
          isSpecial: true,
          isEditable: true,
          type: 'special'
        }
      }
    },

    data() {
      return {}
    },

    methods: {
      onItemClick() {
      }
    }
  }
</script>

<style scoped lang="stylus">
    .overflow-y-scroll
        overflow-y scroll
        height 70vh
</style>
