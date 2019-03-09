<template>
    <v-container
            fluid
            grid-list-xl
            fill-height>
        <v-layout
                justify-center
                align-center
        >
            <v-flex xs12>
                <material-card :color="color">
                    <v-layout slot="header">
                        <v-flex>
                            <div class="title font-weight-light mb-2">Menu</div>
                            <div class="category">
                                Handcrafted by us with
                                <v-icon
                                        size="17"
                                >
                                    mdi-heart
                                </v-icon>
                            </div>
                        </v-flex>

                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                    </v-layout>

                </material-card>

                <UI/>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import UI from '../components/menu/UI'

  import { mapState } from 'vuex'
  export default {
    components: {
      UI
    },
    computed: {
      ...mapState('app', ['color'])
    }
  }
</script>

<style scoped lang="stylus">

</style>