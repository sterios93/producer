<template>
    <v-layout row wrap>
        <v-flex xs12 sm9 >
            <MenuListContainer v-bind="{...menuListContainerProps, ...sharedProps}"/>
        </v-flex>
        <v-flex xs12 sm3>
            <CategoryList v-bind="{...categoryProps, ...sharedProps}"/>
        </v-flex>
    </v-layout>
</template>

<script>
  import MenuListContainer from '../../shared/menu/MenuListContainer'
  import CategoryList from '../../shared/category/CategoryList'

  export default {
    props: {
      tabs: Object,
      color: String,
      categories: Array,
      selectedCategories: Array,
      activeTab: String
    },

    components: {
      MenuListContainer,
      CategoryList
    },

    computed: {
      menuListContainerProps () {
        return {
          tabs: this.tabs,
          selectedCategories: this.selectedCategories
        }
      },
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
    }
  }
</script>

<style scoped lang="stylus">

</style>