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
          title="Special offer" >
          <v-layout wrap>
            <v-flex
              class="v-card-profile"
              d-flex>
              <v-layout wrap>

                <v-flex
                  xs12
                  lg6>
                  <v-avatar
                    slot="offset"
                    class="mx-auto d-block"
                    size="260" >
                    <v-img :src="imagePath"/>
                  </v-avatar>
                </v-flex>

                <v-flex
                  xs12
                  lg6>
                  <v-card-text class="text-xs-center">
                    <v-flex
                      v-if="price"
                      xs12
                      class="new-price ma-0 pa-0 headline red--text text--accent-4 text-uppercase font-weight-bold text-xs-center"
                    >
                      {{ price - price * (discount / 100) | formatCurrency }}
                    </v-flex>
                    <v-flex
                      v-if="price"
                      xs12
                      class="old-price ma-0 pa-0 title red--text text--accent-1 text-uppercase font-weight-medium text-xs-center"
                    >
                      {{ price | formatCurrency }}
                    </v-flex>
                    <br>
                    <h3 class="category font-weight-bold mb-3">From {{ timeStart }}</h3>
                    <h3 class="category font-weight-bold mb-3">To {{ timeEnd }}</h3>
                    <h3 class="card-title font-weight-light">{{ name }}</h3>
                    <p class="card-description font-weight-light">{{ description }}</p>
                    <p class="card-description font-weight-light">Also see our other offers bellow :)</p>
                    <v-btn
                      dark
                      color="orange"
                      round
                      class="font-weight-light"
                      @click="onEditClick" >EDIT </v-btn>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-flex
            xs12
            mt-5>
            <v-flex
              v-for="item in items"
              :key="item.id"
              xs12
              class="py-2 px-0">
              <v-divider/>
              <MenuItem :item="item" />
            </v-flex>
          </v-flex>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import MenuItem from '../components/shared/menu/MenuItem'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SpecialOffer',
  components: {
    MenuItem
  },
  props: {
    id: String || Number
  },
  data () {
    return {
      isEditable: false,
      defaultImage: '/img/default-menu-v2.jpg'
    }
  },
  computed: {
    ...mapState('special', {
      name: (state) => state.view.name,
      image: (state) => state.view.image,
      price: (state) => state.view.price, // TODO
      items: (state) => state.view.menuItems,
      timeEnd: (state) => state.view.timeEnd,
      discount: (state) => state.view.discount, // TODO
      timeStart: (state) => state.view.timeStart,
      description: (state) => state.view.description
    }),
    imagePath () {
      return this.image || this.defaultImage
    }
  },
  created () {
    this.fetchItem({ itemId: this.id, action: 'view' })
      .then(data => {
        if (data.success) {
          this.item = data.result
        } else {
          return this.setSnackbar({ snackbar: true, message: data.error.message, color: 'red' })
        }
      })
  },
  methods: {
    ...mapActions({
      'fetchItem': 'special/fetchItem',
      'setMenuModalVisibility': 'modals/setMenuModalVisibility'
    }),
    onEditClick () {
      this.setMenuModalVisibility({
        key: 'special',
        value: true,
        action: 'edit'
      })

      // TODO :: consider making new request for edit
      this.$store.dispatch(`special/setItem`, {
        payload: JSON.parse(JSON.stringify(this.item)),
        action: 'edit'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
    .old-price
        text-decoration line-through
</style>
