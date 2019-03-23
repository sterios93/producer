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
      ...mapState('app', ['color']),
      ...mapState('layout', ['responsive']),
      ...mapState('categories', ['items']),
      component() {
        return this.responsive ? 'Mobile' : 'Desktop'
      },
      props() {
        return {
          tabs: this.tabs,
          color: this.color,
          activeTab: this.activeTab,
          categories: this.items,
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>