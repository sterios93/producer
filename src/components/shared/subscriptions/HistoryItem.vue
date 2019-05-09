<template>
    <v-list-tile
            avatar
            @click=""
    >
        <v-list-tile-avatar>
            <img :src="membership.img">
        </v-list-tile-avatar>

        <v-list-tile-content>
            <v-list-tile-title v-html="membership.type.toUpperCase()"></v-list-tile-title>
        </v-list-tile-content>


        <v-list-tile-content>
            <v-list-tile-title class="caption">Ordered: {{item.startDate}}</v-list-tile-title>
            <v-list-tile-title class="caption">Expires At: {{item.endDate}}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action >
            <div class="action-container">
<!--                <v-btn-->
<!--                        icon-->
<!--                        class="mx-2"-->
<!--                        @click="toggleFollow(item)"-->
<!--                >-->
<!--                    <v-icon :color="item.following ? 'teal' : 'grey'">hearing</v-icon> &lt;!&ndash;mdi-bell&ndash;&gt;-->
<!--                </v-btn>-->
                <v-btn
                        :disabled="item.expired"
                        class="px-2"
                        block
                        @click="onCancel(item)"
                >
                    {{item.expired ? 'EXPIRED' : 'CANCEL SUBSCRIPTION'}}
                </v-btn>
            </div>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

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
    data() {
      return {
      	membership: {}
      }
    },
    created() {
      this.membership = this.getMembership()(this.item.type)
    },
    methods: {
      ...mapActions({
        cancelMemberShip: 'subscriptions/cancelMemberShip',
        setModalData: 'modals/setModalData',
      }),
      ...mapGetters('subscriptions', ['getMembership']),
      onCancel() {
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
    .action-container
        min-width 200px
</style>
