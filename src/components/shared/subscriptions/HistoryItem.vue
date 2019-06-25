<template>
  <v-list-tile
    class="list-item"
    avatar
    height="100px"
  >
    <v-list-tile-content>
      <v-list-tile-avatar>
        <img :src="membership.img">
      </v-list-tile-avatar>
      <v-list-tile-title v-html="membership.type.toUpperCase()"/>
    </v-list-tile-content>

    <v-list-tile-content class="align-end">
      <div class="action-container">
        <v-list-tile-title class="caption text-xs-center">Ordered: {{ item.timeStart }}</v-list-tile-title>
        <v-list-tile-title class="caption text-xs-center">Expires At: {{ item.timeEnd }}</v-list-tile-title>

        <v-btn
          :disabled="item.expired"
          class="px-2"
          block
          @click="onCancel(item)"
        >
          {{ item.expired ? 'EXPIRED' : 'CANCEL SUBSCRIPTION' }}
        </v-btn>
      </div>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  	props: {
    item: {
      	type: Object,
      default: () => ({
        id: -1,
        type: 'basic',
        expiresIn: '',
        expired: true
      })
    }
  },
  data () {
    return {
      	membership: {}
    }
  },
  created () {
    this.membership = this.getMembership()(this.item.type)
  },
  methods: {
    ...mapActions({
      cancelMemberShip: 'subscriptions/cancelMemberShip',
      setModalData: 'modals/setModalData'
    }),
    ...mapGetters('subscriptions', ['getMembership']),
    onCancel () {
      this.setModalData({
        key: 'confirm',
        value: {
          visibility: true,
          action: `cancel your ${this.item.type.toUpperCase()} Membership`,
          callback: () => {
            // this.cancelMemberShip(item)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .list-item
    min-height 100px
  >>> .v-list__tile--avatar
    height 100%
    .align-end
      align-items: flex-end
    .action-container
        min-width 200px
</style>
