<template>
    <v-layout row wrap>

        <v-flex >
            <v-layout wrap justify-center>
                <v-flex xs12 v-if="isMainMenu">
                    <CategoryTabs v-bind="categoryProps" @on-tab-change="onTabChange"/>
                </v-flex>
                <v-flex xs12 class="menu-list-mobile">
                    <component :is="menuComponent" v-bind="menuListProps"></component>
                </v-flex>
            </v-layout>

        </v-flex>
        <v-bottom-nav
                :active.sync="selectedMenu"
                :value="true"
                fixed
                color="white"
        >
            <v-btn
                    color="teal"
                    flat
                    value="main"
            >
                <span>Main Menu</span>
                <v-icon>history</v-icon>
            </v-btn>

            <v-btn
                    color="teal"
                    flat
                    value="special"
            >
                <span>Special Menu</span>
                <v-icon>favorite</v-icon>
            </v-btn>

            <v-btn
                    color="teal"
                    flat
                    value="lunch"
            >
                <span>Lunch Menu</span>
                <v-icon>place</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-layout>
</template>

<script>
  import CategoryTabs from "../../shared/category/CategoryTabs";
  import LunchList from '../../shared/menu/lunch/List'
  import MenuList from "../../shared/menu/MenuList";
  import SpecialList from '../../shared/menu/special/List'

  import {mapState, mapGetters} from 'vuex'

  export default {
    props: {
      categories: Array,
      color: String
    },

    data () {
      return {
        selectedMenu: 'main',
        category: this.categories[0]
      }
    },

    components: {
      CategoryTabs,
      'lunch-menu': LunchList,
      'main-menu': MenuList,
      'special-menu': SpecialList
    },

    created() {
      this.category = this.categories[0].id
    },

    computed: {
      ...mapState('special', ['items']),
      menuComponent() {
        return `${this.selectedMenu}-menu`
      },
      menuListProps() {
        return {
          color: this.color,
          items: this.isMainMenu ? this.getMenuByCategory()(this.category) : this.$store.state[this.selectedMenu].list.items
        }
      },
      categoryProps() {
        return {
          items: this.categories,
          color: this.color
        }
      },
      isMainMenu() {
        return this.selectedMenu === 'main'
      }
    },

    methods: {
      ...mapGetters('main', ['getMenuByCategory']),
      onTabChange(id) {
        this.category = id
      },
    }
  }
</script>

<style scoped lang="stylus">

</style>