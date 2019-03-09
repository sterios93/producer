<template>
    <component :is="component" v-bind="props"></component>
</template>

<script>
  import Desktop from './layouts/Desktop'
  import Mobile from './layouts/Mobile'

  import {mapState} from 'vuex'

  export default {
    components: {
      Desktop,
      Mobile
    },

    computed: {
      ...mapState('layout', ['responsive']),
      ...mapState('app', ['color']),
      ...mapState('menu', ['items', 'categories', 'selectedCategory']),
      component() {
        return this.responsive ? 'Mobile' : 'Desktop'
      },
      props() {
        return {
          items: this.items,
          categories: this.categories,
          selectedCategory: this.selectedCategory,
          color: this.color
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>