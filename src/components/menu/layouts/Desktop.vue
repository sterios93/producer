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
      color: String,
      categories: Array,
      selectedCategories: Array
    },

    components: {
      MenuListContainer,
      CategoryList
    },

    computed: {
      menuListContainerProps () {
        return {
          selectedCategories: this.selectedCategories,
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
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>