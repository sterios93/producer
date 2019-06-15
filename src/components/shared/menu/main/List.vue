<template>
  <v-slide-x-transition
    v-if="!isCategoriesEmpty"
    group
    mode="out-in"
    tag="div"
    class="pa-0 d-flex transition-custom">
    <v-flex
      v-for="category in getSelectedCategories"
      :key="category.id"
      class="py-0"
      xs12>
      <v-subheader>{{ category.name }}</v-subheader>

      <v-flex class="pa-0">
        <v-divider/>
        <MenuList v-bind="menuListProps(category)"/>
      </v-flex>
    </v-flex>
  </v-slide-x-transition>

  <v-flex
    v-else
    class="pa-1">
    <v-subheader>All products</v-subheader>
    <MenuList
      :items="items"
      class="pa-1 transition-custom"/>
  </v-flex>

</template>

<script>
import MenuList from '../MenuList'

import { mapState, mapGetters } from 'vuex'

export default {

  components: {
    MenuList
  },
  props: {
    color: String
  },

  computed: {
    ...mapState({
      items: (state) => state.main.list.items
    }),
    ...mapGetters('main', ['getMenuByCategory']),
    ...mapGetters('categories', ['getSelectedCategories']),
    isCategoriesEmpty () {
      return this.getSelectedCategories.length === 0
    }
  },

  methods: {
    menuListProps (category) {
      return {
        items: this.getMenuByCategory(category.name),
        color: this.color
      }
    }
  }
}
</script>

<style scoped lang="stylus">
    .transition-custom
        width: 100%
        flex-direction: row
        flex-wrap: wrap
        max-height: 75vh
        overflow-y scroll
        overflow-x hidden
</style>
