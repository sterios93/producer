<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <core-footer v-if="$route.name !== 'Maps'" />
    <core-footer/>
    <CustomSnackBar/>
    <!--<AddMenuItem/>-->
  </v-content>
</template>

<script>
import CustomSnackBar from '../material/CustomSnackBar'
import AddMenuItem from '../custom/dialogs/AddMenuItem'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    CustomSnackBar,
    AddMenuItem
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

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
