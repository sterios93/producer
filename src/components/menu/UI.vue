<template>
    <component :is="component" v-bind="props"></component>
</template>

<script>
  import Desktop from './layouts/Desktop'
  import Mobile from './layouts/Mobile'

  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    components: {
      Desktop,
      Mobile
    },
    
    created() {
      this.fetchCategories()
      .then(data => {
        if (!data.succes) {
          return this.setSnackbar({snackbar: true, message: data.message, color: 'red'})
        }
      })
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
    },

    methods: {
      ...mapActions('categories', ['fetchCategories']),
       ...mapActions('snackbar', {
        setSnackbar: 'setState'
      }),
    }
  }
</script>

<style scoped lang="stylus">

</style>