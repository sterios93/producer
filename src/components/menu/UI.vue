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
      ...mapState('categories', ['categories']),
      component() {
        return this.responsive ? 'Mobile' : 'Desktop'
      },
      props() {
        return {
          tabs: this.tabs,
          color: this.color,
          activeTab: this.activeTab,
          categories: this.categories,
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>