<template>
    <v-layout row wrap>
        <v-flex xs12>
            <CategoryTabs v-bind="categoryProps" @on-tab-change="onTabChange"/>
        </v-flex>
        <v-flex xs12 class="menu-list-mobile">
            <MenuList v-bind="menuListProps"/>
        </v-flex>
    </v-layout>
</template>

<script>
  import CategoryTabs from "../../shared/category/CategoryTabs";
  import MenuList from "../../shared/menu/MenuList";

  import {mapState} from 'vuex'

  export default {
    props: {
      categories: Array,
      color: String
    },


    components: {
      CategoryTabs,
      MenuList
    },

    computed: {
      ...mapState('special', ['items']),
      menuListProps() {
        return {
          items: this.items,
          color: this.color
        }
      },
      categoryProps() {
        return {
          items: this.categories,
          color: this.color
        }
      }
    },

    methods: {
      onTabChange(id) {
        // this.items = this.getMenuByCategory(id)
      }
    }
  }
</script>

<style scoped lang="stylus">
    .menu-list-mobile
        max-height: 82vh // TODO :: think of more generic way to do this
        overflow-y: scroll
</style>