<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <CustomSnackBar/>
    <AddMainMenuItem />
    <AddSpecialMenuItem />
    <AddLunchMenuItem />
  </v-content>
</template>

<script>
import CustomSnackBar from '../material/CustomSnackBar'
import AddMainMenuItem from '../shared/menu/main/Add'
import AddSpecialMenuItem from '../shared/menu/special/Add'
import AddLunchMenuItem from '../shared/menu/lunch/Add'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    CustomSnackBar,
    AddMainMenuItem,
    AddSpecialMenuItem,
    AddLunchMenuItem
  },
  metaInfo () {
    return {
      title: 'Vuetify Material Dashboard by CreativeTim'
    }
  },
  computed: {
    ...mapState('layout', ['responsive']),
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapActions('layout', ['setResponsive']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.setResponsive(true)
      } else {
        this.setResponsive(false)
      }
    }
  }
}
</script>

<style lang="stylus">
  #core-view
    padding-bottom: 100px;
    display: flex;
    justify-content: center;
    height: 100%;
</style>
