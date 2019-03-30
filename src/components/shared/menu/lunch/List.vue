<template>
    <v-slide-x-transition group mode="out-in" tag="ul" class="pa-0 d-flex transition-custom" color="transparent">
        <v-flex v-for="item in items" xs12 :key="item.id" class="pa-2 px-0">
            <v-divider></v-divider>
            <MenuItem v-bind="menuItemProps" :item="item"/>
        </v-flex>
    </v-slide-x-transition>
</template>

<script>
  import MenuItem from '../MenuItem'
  export default {
    components: {
      MenuItem
    },

    props: {
      items: Array
    },

    computed: {
      menuItemProps() {
        return {
          isSpecial: true,
          isEditable: true,
          type: 'lunch'
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
    .transition-custom
        width: 100%
        flex-direction: row
        flex-wrap: wrap
        max-height: 70vh
        overflow-y: scroll
</style>