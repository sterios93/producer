<template>
    <v-layout row wrap>
        <v-flex xs12 sm9 >
            <MenuListContainer v-bind="{...sharedProps}"/>
        </v-flex>
        <v-flex xs12 sm3>
            <v-layout row wrap>
                <v-flex xs12>
                    <CategoryList v-bind="{...categoryProps, ...sharedProps}"/>
                </v-flex>
                <v-flex xs12 class="controls">
                    <v-btn
                            @click="onControlsClicked"
                            color="green darken-2"
                            dark
                            flat
                            block
                    >
                        Create new product
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
        <CustomsBottomSheet :controls="controls" />
    </v-layout>
</template>

<script>
  import MenuListContainer from '../../shared/menu/MenuListContainer'
  import CategoryList from '../../shared/category/CategoryList'
  import CustomsBottomSheet from '../../shared/CustomsBottomSheet'

  import {mapActions} from 'vuex'


  export default {
    props: {
      tabs: Object,
      color: String,
      activeTab: String,
      categories: Array,
      selectedCategories: Array
    },

    components: {
      CategoryList,
      MenuListContainer,
      CustomsBottomSheet
    },

    created() {
      this.controls = [
        {
          img: 'keep.png',
          title: 'Create main menu product',
          cb: () => this.setMenuModalVisibility({
            key: 'main',
            value: true
          })
        },
        {
          img: 'inbox.png',
          title: 'Create special offer',
          cb: () => this.setMenuModalVisibility({
            key: 'special',
            value: true
          })
        },
        {
          img: 'hangouts.png',
          title: 'Create lunch offer',
          cb: () => this.setMenuModalVisibility({
            key: 'lunch',
            value: true
          })
        }
      ]
    },


    computed: {
      categoryProps () {
        return {
          items: this.categories,
        }
      },
      sharedProps () {
        return {
          color: this.color,
          activeTab: this.activeTab
        }
      }
    },
    methods: {
      ...mapActions({
        'setMenuModalVisibility': 'modals/setMenuModalVisibility',
        'setBottomSheetVisibility': 'bottomSheet/setVisibility'
      }),
      onControlsClicked() {
        this.setBottomSheetVisibility(true)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>