<template>
            <v-form>
                <v-container py-0>
                    <v-layout wrap>
                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="First Name"
                                    class="purple-input"
                                    :value="userInfo.firstName"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Last Name"
                                    class="purple-input"
                                    :value="userInfo.lastName"/>
                        </v-flex>

                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="Email"
                                    class="purple-input"
                                    :value="userInfo.email"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Phone number"
                                    class="purple-input"
                                    :value="userInfo.phoneNumber"/>
                        </v-flex>


                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="Restaurant name"
                                    class="purple-input"
                                    :value="userInfo.restaurantName"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Restaurant type"
                                    class="purple-input"
                                    :value="userInfo.restaurantType"/>
                        </v-flex>

                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="Restaurant website"
                                    class="purple-input"
                                    :value="userInfo.restaurantWebsite"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Restaurant number"
                                    class="purple-input"
                                    :value="userInfo.restaurantNumber"/>
                        </v-flex>


                        <v-flex xs12  md12 >
                            <v-text-field
                                    label="Adress"
                                    class="purple-input"/>
                        </v-flex>
                        <v-flex xs12 md12>
                            <Map></Map>
                        </v-flex>
                        <v-flex
                                xs12
                                md4>
                            <v-text-field
                                    label="City"
                                    class="purple-input"/>
                        </v-flex>
                        <v-flex
                                xs12
                                md4>
                            <v-text-field
                                    label="Country"
                                    class="purple-input"/>
                        </v-flex>
                        <v-flex
                                xs12
                                md4>
                            <v-text-field
                                    class="purple-input"
                                    label="Postal Code"
                                    type="number"/>
                        </v-flex>
                        <v-flex xs12 text-xs-right >
                            <v-btn
                                    class="mr-2 font-weight-light"
                                    color="orange"
                            >
                                <v-icon class="mr-1">
                                    mdi-account-edit
                                </v-icon>
                                Edit Profile
                            </v-btn>
                            <v-btn
                                    class="mx-0 font-weight-light"
                                    color="success"
                            >
                                Save Profile
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>

</template>

<script>
    import Map from '../shared/map/Map'
    import {mapState} from 'vuex'


    // TODO :: Fix the map logic
    // TODO :: Add edit logic and validation

    export default {
      name: 'profile-card',
      components: {
        Map,
      },
      data() {
        return {}
      },
      computed: {
        ...mapState({
          userInfo: (state) => state.userProfile,
        }),
      }
    }
</script>

<style scoped lang="stylus"></style>
