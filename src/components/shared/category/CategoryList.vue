<template>
    <v-card>
        <v-toolbar :color="color" dark>
            <v-toolbar-title class="title font-weight-light mb-2 white--text">Categories</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>

        <v-list two-line>
            <template v-for="(item, index) in items">


                <v-divider></v-divider>

                <CategoryItem :item="item"/>

            </template>
        </v-list>
    </v-card>
</template>

<script>
  import CategoryItem from './CategoryItem'
  export default {
    components: {
      CategoryItem
    },
    props: {
      color: String,
      items: Array
    }
  }
</script>

<style scoped lang="stylus">

</style>