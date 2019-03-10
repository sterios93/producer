<template>
    <div>
        <v-toolbar :color="color" dark>
            <v-toolbar-title class="title font-weight-light mb-2 white--text">Dishes</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>

        <v-slide-x-transition group mode="out-in" tag="div" class="pa-0 d-flex transition-custom">

            <v-flex class="py-0" xs12 v-for="category in selectedCategories" :key="category.id">
                <v-subheader>{{ category.name }}</v-subheader>

                <v-flex class="pa-0">
                    <v-divider></v-divider>
                    <MenuList v-bind="menuListProps(category)"/>
                </v-flex>
            </v-flex>

        </v-slide-x-transition>
    </div>
</template>

<script>
  import MenuList from '../../shared/menu/MenuList'

  import {mapGetters} from 'vuex'

  export default {
    props: {
      selectedCategories: Array,
      color: String
    },

    components: {
      MenuList,
    },

    computed: {
      ...mapGetters('menu', ['getMenuByCategory']),
    },
    methods: {
      menuListProps(category) {
        return {
          items: this.getMenuByCategory(category.id),
          color: this.color
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
    .transition-custom
        flex-direction: row
        flex-wrap: wrap
        max-height: 80vh
        overflow-y: scroll
</style>