<template>
  <v-container
    fill-height
    fluid
    -list-xl>
    <v-layout
      justify-center
      wrap>
      <v-flex
        xs12
        md8>
        <material-card
          color="green"
          title="Special offer"
        >
          <v-layout wrap>

            <v-flex
              class="v-card-profile"
              d-flex>
              <v-layout wrap>

                <v-flex xs12 lg6>
                  <v-avatar
                          slot="offset"
                          class="mx-auto d-block"
                          size="260"
                  >
                    <img src="https://api-content.prod.pizzahutaustralia.com.au//umbraco/api/Image/Get2?path=assets/products/menu/Veggie-Tandoori-LGE-Pizza-menu.jpg">
                  </v-avatar>
                </v-flex>


                <v-flex xs12 lg6>
                  <v-card-text class="text-xs-center">
                    <h3 class="category font-weight-bold mb-3">From 20.03.2019 to 23.03.2019</h3>
                    <h3 class="card-title font-weight-light">Grande Pica Peperoni with Cheese !!</h3>
                    <p class="card-description font-weight-light">Only now in our Restaurant. Order one
                      picca and get the second one for free !</p>
                    <p class="card-description font-weight-light">Also see our other offers bellow :)</p>
                    <v-btn
                            color="success"
                            round
                            class="font-weight-light"
                    >Follow
                    </v-btn>
                    <v-btn
                            color="orange"
                            round
                            class="font-weight-light"
                    >EDIT
                    </v-btn>
                    <v-btn
                            color="red"
                            round
                            class="font-weight-light"
                    >MENU
                    </v-btn>
                    <v-btn
                            color="blue"
                            round
                            class="font-weight-light"
                    >LUNCH OFFERS
                    </v-btn>
                  </v-card-text>
                </v-flex>

              </v-layout>


            </v-flex>

          </v-layout>
          <v-flex
            xs12
            mt-5>
            <v-flex
              v-for="item in specialOfferItems"
              :key="item.id"
              xs12
              class="py-2 px-0">
              <v-divider/>
              <MenuItem :item="item"/>
            </v-flex>
          </v-flex>

        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import MenuItem from '../components/shared/menu/MenuItem'

export default {
  name: 'SpecialOffer',
  components: {
    MenuItem
  },
  data () {
    return {}
  },
  computed: {
    specialOfferItems () {
      return this.$store.state.special.list.items.slice(0, 3)
    }
  }
}
</script>

<style scoped lang="stylus"></style>
