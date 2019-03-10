<template>
    <component :is="component" v-bind="props"></component>
</template>

<script>
  import Desktop from './layouts/Desktop'
  import Mobile from './layouts/Mobile'

  import {mapState, mapGetters} from 'vuex'

  export default {
    components: {
      Desktop,
      Mobile
    },

    computed: {
      ...mapState('layout', ['responsive']),
      ...mapState('app', ['color']),
      ...mapState('menu', ['categories']),
      ...mapGetters('menu', ['getSelectedCategories']),
      component() {
        return this.responsive ? 'Mobile' : 'Desktop'
      },
      props() {
        return {
          categories: this.categories,
          selectedCategories: this.getSelectedCategories,
          color: this.color
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>