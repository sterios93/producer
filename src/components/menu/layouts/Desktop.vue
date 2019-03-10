<template>
    <v-layout row wrap>
        <v-flex xs12 sm9 >
            <MenuListContainer v-bind="MenuListContainerProps"/>
        </v-flex>
        <v-flex xs12 sm3>
            <CategoryList v-bind="categoryProps"/>
        </v-flex>
    </v-layout>
</template>

<script>
  import MenuListContainer from '../../shared/menu/MenuListContainer'
  import CategoryList from '../../shared/category/CategoryList'

  export default {
    props: {
      categories: Array,
      selectedCategories: Array,
      color: String
    },

    components: {
      MenuListContainer,
      CategoryList
    },

    computed: {
      MenuListContainerProps () {
        return {
          selectedCategories: this.selectedCategories,
          color: this.color
        }
      },
      categoryProps () {
        return {
          items: this.categories,
          color: this.color
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>