<template>
    <div class="overflow-y-scroll overflow-x-hidden">
        <v-slide-x-transition group mode="out-in" tag="ul" class="pa-0 layout d-flex row wrap" color="transparent">
            <v-flex v-for="item in items" xs12 :key="item.id" class="pa-2 px-0">
                <v-divider></v-divider>
                <MenuItem v-bind="menuItemProps" :item="item"/>
            </v-flex>
        </v-slide-x-transition>
    </div>
</template>

<script>
  import MenuItem from '../MenuItem'

  export default {
    components: {
      MenuItem
    },

    props: {
      items: Array
    },

    computed: {
      menuItemProps() {
        return {
          isSpecial: true,
          isEditable: true,
          type: 'lunch'
        }
      }
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
    .overflow-y-scroll
        overflow-y scroll
        height 75vh
</style>