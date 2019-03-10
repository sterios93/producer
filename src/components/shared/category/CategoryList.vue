<template>
    <v-card>
        <v-toolbar :color="color" dark>
            <v-toolbar-title class="title font-weight-light mb-2 white--text">Categories</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list two-line class="px-3">
            <template v-for="(item, index) in items">
                <v-divider></v-divider>
                <CategoryItem :item="item" @item-selected="onItemSelected"/>
            </template>
        </v-list>
    </v-card>
</template>

<script>
  import {mapActions} from 'vuex'
  import CategoryItem from './CategoryItem'

  export default {
    components: {
      CategoryItem
    },
    props: {
      color: String,
      items: Array
    },
    methods: {
      ...mapActions('menu', ['toggleCategory']),
      onItemSelected(id) {
        this.toggleCategory({id})
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>