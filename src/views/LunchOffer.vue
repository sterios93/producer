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
          color="purple"
          title="Lunch offer">
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
                    size="260">
                    <v-img :src="imagePath"/>
                  </v-avatar>
                </v-flex>

                <v-flex
                  xs12
                  lg6>
                  <v-card-text class="text-xs-center">
                    <v-flex
                      v-if="item.price"
                      xs12
                      class="new-price ma-0 pa-0 headline red--text text--accent-4 text-uppercase font-weight-bold text-xs-center"
                    >{{ item.price - item.price * (item.discount / 100) | formatCurrency }}</v-flex>
                    <v-flex
                      v-if="item.price"
                      xs12
                      class="old-price ma-0 pa-0 title red--text text--accent-1 text-uppercase font-weight-medium text-xs-center"
                    >{{ item.price | formatCurrency }}</v-flex>
                    <br>
                    <h3 class="category font-weight-bold mb-3">{{ item.timeStart }}</h3>
                    <v-btn
                      dark
                      color="orange"
                      round
                      class="font-weight-light"
                      @click="onEditClick"
                    >EDIT</v-btn>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-flex
            xs12
            mt-5>
            <v-flex
              v-for="item in item.items"
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
      defaultImage: 'http://lunchdeal24.de/images/default/default-menu-v2.jpg'
    }
  },
  computed: {
    ...mapState('lunch', {
      item: state => state.view
    }),
    imagePath () {
      return this.defaultImage
    }
  },
  created () {
    this.fetchItem({ itemId: this.id, action: 'view' })
      .then(data => {
        if (!data.success) {
          return this.setSnackbar({ snackbar: true, message: data.error.message, color: 'red' })
        }
      })
  },
  methods: {
    ...mapActions({
      fetchItem: 'lunch/fetchItem',
      setMenuModalVisibility: 'modals/setMenuModalVisibility'
    }),
    onEditClick () {
      this.setMenuModalVisibility({
        key: 'lunch',
        value: true,
        action: 'edit'
      })

      this.$store.dispatch(`lunch/setItem`, {
        payload: JSON.parse(JSON.stringify(this.item)),
        action: 'edit'
      })
    }
  }
}
</script>

<style scoped lang="stylus"></style>
