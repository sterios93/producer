<template>
            <SpecialCard v-bind="menuItemProps" :item="item"/>
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
      item: Object,
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
