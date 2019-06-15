<template>
  <v-toolbar
    v-if="toolbar"
    id="core-toolbar"
    :class="{'responsive': !responsive}"
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        v-if="isUserLogged"
        align-center
        layout
        py-2
      >
        <component :is="component"/>

        <v-menu
          bottom
          left
          full-width
          min-width="200px"
          class="toolbar-items"
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
          <template v-slot:activator="{ on }">
            <v-icon
              color="green"
              v-on="on">mdi-account</v-icon>
          </template>
          <v-card>
            <v-list dense>
              <router-link
                v-for="(item, index) in links"
                :to="item.to"
                :key="index">
                <v-list-tile
                  v-ripple
                  class="toolbar-items"
                >
                  <v-list-tile-title v-text="item.text"/>
                </v-list-tile>
              </router-link>
            </v-list>
          </v-card>
        </v-menu>

        <v-icon
          v-if="isUserLogged"
          color="orange"
          @click="logOutAccount">mdi-exit-to-app</v-icon>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import NotificationsDropDown from '../shared/notifications/NotificationsDropDown'
import NotificationsBottomSheet from '../shared/notifications/NotificationsBottomSheet'

export default {
  components: {
    NotificationsDropDown,
    NotificationsBottomSheet
  },

  data: () => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      'You\'re now a friend with Andrew',
      'Another Notification',
      'Another One'
    ],
    title: null,
    links: [
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'User Profile',
        userAccess: true
      },
      {
        to: '/subscriptions',
        icon: 'mdi-account',
        text: 'Subscriptions',
        userAccess: true
      }
    ]
  }),

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },

  computed: {
    ...mapState('authentication', ['isUserLogged']),
    ...mapState('layout', ['responsive']),
    ...mapState('app', ['toolbar']),
    component () {
      return this.responsive ? 'NotificationsBottomSheet' : 'NotificationsDropDown'
    }
  },

  methods: {
    ...mapActions('authentication', ['logout']),
    ...mapActions('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn () {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick () {
      //
    },
    logOutAccount () {
      this.logout().then(() => this.$router.push('login'))
    }
  }
}
</script>

<style scoped lang="stylus">
  .logo-image
    height 64px
  #core-toolbar
    margin-bottom 0
  #core-toolbar a
    text-decoration: none
  .responsive
    >>> .v-toolbar__content
      margin-left 260px !important

</style>
