<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap >
      <v-flex xs12>
        <material-card
          :color="isProfileCardValid ? 'green' : 'red'"
          title="Edit Profile"
          text="Complete your profile">
          <profile-card :force-edit="forceEdit"/>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfileCard from '../components/userProfile/ProfileCard'
import { mapState, mapActions } from 'vuex'


export default {
  name: 'UserProfile',
  components: {
    Map,
    ProfileCard,
  },
  props: {
  	forceEdit: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.fetchUserData()
      .then(data => {
        if (!data.succes) {
          return this.setSnackbar({ snackbar: true, message: data.error.message, color: 'red' })
        }
      })
  },
  methods: {
    ...mapActions('authentication', ['fetchUserData']),
  },
  computed: {
    ...mapState({
      isProfileCardValid: (state) => state.userProfile.isProfileValid
    })
  }
}
</script>
