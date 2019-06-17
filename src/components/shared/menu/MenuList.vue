<template>
  <v-slide-x-transition
    group
    mode="out-in"
    tag="ul"
    class="pa-0 full-width"
    color="transparent">
    <v-flex
      v-for="(item, index) in items"
      :key="index"
      xs12
      class="py-2 px-0">
      <MenuItem
        v-bind="menuItemProps"
        :item="item" />
    </v-flex>
  </v-slide-x-transition>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  components: {
    MenuItem
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
        isEditable: true,
        isSpecial: false,
        type: 'main'
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
    .full-width
        width: 100%
</style>
