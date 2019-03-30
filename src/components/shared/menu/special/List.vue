<template>
    <v-slide-x-transition xs12 group mode="out-in" tag="ul" class="pa-0 layout row wrap" color="transparent">
        <v-flex v-for="item in items" xs12 md6 :key="item.id">
            <!--<v-divider></v-divider>-->
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

</style>
