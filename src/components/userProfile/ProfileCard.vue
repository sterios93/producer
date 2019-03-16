<template>
            <v-form>
                <v-container py-0>
                    <v-layout wrap>
                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="First Name"
                                    class="purple-input"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Last Name"
                                    class="purple-input"/>
                        </v-flex>

                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="Email"
                                    class="purple-input"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Phone number"
                                    class="purple-input"/>
                        </v-flex>


                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="Restaurant name"
                                    class="purple-input"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Restaurant type"
                                    class="purple-input"/>
                        </v-flex>

                        <v-flex xs12  md6 >
                            <v-text-field
                                    label="Restaurant website"
                                    class="purple-input"/>
                        </v-flex>
                        <v-flex xs12 md6 >
                            <v-text-field
                                    label="Restaurant number"
                                    class="purple-input"/>
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
                        <v-flex
                                xs12
                                text-xs-right
                        >
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
    export default {
      name: 'profile-card',
      components: {
        Map,
      }
    }
</script>

<style scoped lang="stylus"></style>
