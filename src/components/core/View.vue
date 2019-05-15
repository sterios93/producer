<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <CustomSnackBar/>

    <AddCategory />
    <PaymentModal />
    <ConfirmModal />
    <AddMainMenuItem v-if="mainVisibility" />
    <AddLunchMenuItem v-if="lunchVisibility" />
    <AddSpecialMenuItem v-if="specialVisibility" />
  </v-content>
</template>

<script>
  import AddCategory from "../shared/category/AddCategory"
  import ConfirmModal from "../custom/dialogs/ConfirmModal";
  import PaymentModal from "../custom/dialogs/PaymentModal";
  import CustomSnackBar from '../material/CustomSnackBar'
  import AddMainMenuItem from '../shared/menu/main/Add'
  import AddLunchMenuItem from '../shared/menu/lunch/Add'
  import AddSpecialMenuItem from '../shared/menu/special/Add'
  import {mapActions, mapState} from 'vuex'
  import EventBus from '../../utils/eventBus'

  export default {
    components: {
      ConfirmModal,
      PaymentModal,
      AddCategory,
      CustomSnackBar,
      AddMainMenuItem,
      AddLunchMenuItem,
      AddSpecialMenuItem,
    },
    metaInfo() {
      return {
        title: 'Vuetify Material Dashboard by CreativeTim'
      }
    },
    computed: {
      ...mapState('layout', ['responsive']),
      ...mapState('modals', {
        mainVisibility: (state) => state.menu.main.visibility,
        lunchVisibility: (state) => state.menu.lunch.visibility,
        specialVisibility: (state) => state.menu.special.visibility,
      }),
    },
    mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      ...mapActions('layout', ['setResponsive']),
      onResponsiveInverted() {
      	EventBus.$emit('resize')
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

        .action-card
            cursor pointer
            display inline-flex
            flex-direction column
            padding: 50px 100px
            border-radius 20px
            justify-content space-around
            align-items center
            box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.4)
            border 1px solid transparent

            &:hover
                box-shadow: unset
                border 1px solid #1e90ff
</style>
