<template>
  <v-container
    fluid
    grid-list-xl
    fill-height
    class="py-0 my-0">
    <v-layout justify-center>
      <v-flex xs12>
        <UI/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UI from '../components/menu/UI'

import { mapState } from 'vuex'
export default {
  components: {
    UI
  },
  computed: {
    ...mapState('app', ['color'])
  }
}
</script>

<style scoped lang="stylus">

</style>
