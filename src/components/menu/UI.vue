<template>
    <component :is="component" v-bind="props"></component>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState('layout', ['responsive']),
      component() {
        return this.responsive ? 'Mobile' : 'Desktop'
      },
      props() {
        return {}
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>