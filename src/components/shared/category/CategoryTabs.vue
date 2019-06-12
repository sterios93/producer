<template>
    <v-tabs dark :color="color" show-arrows>
        <v-tabs-slider class="lime accent-2"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item.id" @change="tabChanged(item.name)">
            {{ item.name }}
        </v-tab>
    </v-tabs>
</template>

<script>
  export default {
    props: {
      items: Array,
      color: String
    },
    methods: {
      tabChanged(name) {
        this.$emit('on-tab-change', name)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>