<template>
    <v-layout>
        <v-flex xs12 sm8 >
            <MenuListContainer v-bind="MenuListContainerProps"/>
        </v-flex>
        <v-flex xs12 sm4>
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
          selectedCategories: this.selectedCategories
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