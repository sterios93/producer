<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12
      sm9 >
      <MenuListContainer
        v-bind="{...sharedProps}"
        @active-tab-change="handleActiveTabChange"/>
    </v-flex>
    <v-flex
      xs12
      sm3>
      <v-layout
        row
        wrap>
        <v-flex xs12>
          <CategoryList v-bind="{...categoryProps, ...sharedProps}"/>
        </v-flex>
        <v-flex
          xs12
          class="controls">
          <v-btn
            color="green darken-2"
            dark
            flat
            block
            @click="onControlsClicked"
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

import { mapActions } from 'vuex'

export default {

  components: {
    CategoryList,
    MenuListContainer,
    CustomsBottomSheet
  },
  props: {
    tabs: Object,
    color: String,
    categories: Array,
    selectedCategories: Array
  },

  data () {
    return {
      activeTab: null
    }
  },

  computed: {
    categoryProps () {
      return {
        items: this.categories,
        disabled: this.activeTab !== 0 // TODO :: consider placing calendar for filtering on special and lunch tabs
      }
    },
    sharedProps () {
      return {
        color: this.color,
        activeTab: this.activeTab
      }
    }
  },

  created () {
    this.controls = [
      {
        img: 'main.png',
        title: 'Create main menu product',
        cb: () => this.setMenuModalVisibility({
          key: 'main',
          value: true
        })
      },
      {
        img: 'special.png',
        title: 'Create special offer',
        cb: () => this.setMenuModalVisibility({
          key: 'special',
          value: true
        })
      },
      {
        img: 'lunch.png',
        title: 'Create lunch offer',
        cb: () => this.setMenuModalVisibility({
          key: 'lunch',
          value: true
        })
      },
      {
        img: 'category.png',
        title: 'Create category',
        cb: () => this.setModalVisibility({
          key: 'category',
          value: true
        })
      }
    ]
  },
  methods: {
    ...mapActions({
      'setModalVisibility': 'modals/setModalVisibility',
      'setMenuModalVisibility': 'modals/setMenuModalVisibility',
      'setBottomSheetVisibility': 'bottomSheet/setVisibility'
    }),
    onControlsClicked () {
      this.setBottomSheetVisibility(true)
    },
    handleActiveTabChange (value) {
      this.activeTab = value
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
