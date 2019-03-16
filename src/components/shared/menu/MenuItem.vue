<template>
    <v-card color="white darken-2 text-xs-center">

        <v-layout align-center justify-space-between row wrap fill-height>
            <v-flex xs12 sm3>
                <v-img
                    :src="item.image"
                    height="125px"
                    contain
                ></v-img>
            </v-flex>

            <v-flex xs12 sm7>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">{{item.name}}</div>
                        <div>{{item.description}}</div>
                    </div>
                </v-card-title>
            </v-flex>

            <v-flex xs12 sm2>
                <div class="headline">{{item.price}}</div>
            </v-flex>
        </v-layout>

        <v-divider light></v-divider>

        <v-card-actions class="pa-3">
            <v-btn
                    color="green"
                    @click="readMore"
            >
                Read more
            </v-btn>
            <v-spacer></v-spacer>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
        </v-card-actions>

    </v-card>
</template>

<script>
    // TODO :: Show the read more button only for special offers and lunch offers. Dont show them when viewing the special offer view page or lunch view page.
  export default {
    props: {
      item: Object
    },
    data() {
      return {}
    },
    methods: {
      readMore() {
        this.$router.push({ path: '/special-offer' })
      },
    }
  }
</script>

<style scoped lang="stylus">

</style>
