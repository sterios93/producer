<template>
  <v-checkbox
    v-model="selected"
    :disabled="disabled"
    :label="item.name"
    :value="item.selected"/>
</template>

<script>
export default {
  props: {
    item: Object,
    disabled: Boolean
  },

  computed: {
    selected: {
      get () {
        return this.item.selected
      },
      set () {
        this.$emit('item-selected', this.item.id)
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
