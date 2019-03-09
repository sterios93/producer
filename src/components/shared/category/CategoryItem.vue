<template>
    <v-checkbox v-model="selected" :label="item" :value="item"></v-checkbox>
</template>

<script>
  export default {
    props: {
      item: Object
    },

    computed: {
      selected: {
        get () {
          return this.item.selected
        },
        set (value) {
          this.emit('item-selected', { value, item: this.item.id } )
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>