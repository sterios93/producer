<template>
    <v-layout>
        <v-flex xs12 sm8>
            <MenuList v-bind="menuListProps"/>
        </v-flex>
        <v-flex xs12 sm4>
            <CategoryList v-bind="categoryProps"/>
        </v-flex>
    </v-layout>
</template>

<script>
  import MenuList from '../../shared/menu/MenuList'
  import CategoryList from '../../shared/category/CategoryList'

  export default {
    props: {
      items: Array,
      categories: Array,
      selectedCategory: String
    },

    components: {
      MenuList,
      CategoryList
    },

    computed: {
      menuListProps () {
        return {
          items: this.items,
          category: this.selectedCategory
        }
      },
      categoryProps () {
        return {
          items: this.categories
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>