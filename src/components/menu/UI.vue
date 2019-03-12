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
      ...mapState('menu', ['categories', 'tabs', 'activeTab']),
      ...mapGetters('menu', ['getSelectedCategories']),
      component() {
        return this.responsive ? 'Mobile' : 'Desktop'
      },
      props() {
        return {
          tabs: this.tabs,
          color: this.color,
          activeTab: this.activeTab,
          categories: this.categories,
          selectedCategories: this.getSelectedCategories
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>