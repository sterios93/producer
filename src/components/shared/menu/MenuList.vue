<template>
    <ul two-line color="transparent">
        <v-subheader v-if="category">{{ category }}</v-subheader>

        <template v-for="(item, index) in items">
            <v-flex xs12>
                <v-divider></v-divider>
                <MenuItem :item="item" :key="index"/>
            </v-flex>
        </template>
    </ul>
</template>

<script>
  import MenuItem from './MenuItem'

  export default {
    components: {
      MenuItem
    },

    props: {
      category: String,
      items: Array
    },

    data() {
      return {}
    },

    methods: {
      onItemClick() {
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>