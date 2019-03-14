<template>
    <div>
        <v-toolbar :color="color" dark>
            <v-toolbar-title class="title font-weight-light mb-2 white--text">Dishes</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>

            <template v-slot:extension>
                <v-tabs
                        v-model="activeTab"
                        :color="color"
                        grow
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab
                            v-for="(tab, key, index) in tabs"
                            :key="key"
                    >
                        {{ tab }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items v-model="activeTab">

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <MainList v-bind="MainMListProps" />
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <SpecialList v-bind="SpecialListProps" />
                    </v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <LaunchList v-bind="LaunchListProps" />
                    </v-card-text>
                </v-card>
            </v-tab-item>

        </v-tabs-items>
    </div>
</template>

<script>
  import LaunchList from '../../shared/menu/launch/List'
  import MainList from '../../shared/menu/main/List'
  import SpecialList from '../../shared/menu/special/List'

  import {mapState} from 'vuex'

  export default {
    props: {
      color: String,
    },

    data () {
      return {
        activeTab: null,
        tabs: ['Main Menu', 'Special Menu', 'Launch Menu']
      }
    },

    components: {
      LaunchList,
      MainList,
      SpecialList
    },

    computed: {
      MainMListProps () {
        return {
          color: this.color,
          items: this.$store.state.main.list.items
        }
      },
      SpecialListProps () {
        return {
          color: this.color,
          items: this.$store.state.special.list.items
        }
      },
      LaunchListProps () {
        return {
          color: this.color,
          items: this.$store.state.launch.list.items
        }
      }
    },
  }
</script>

<style scoped lang="stylus">
    .transition-custom
        flex-direction: row
        flex-wrap: wrap
        max-height: 80vh
        overflow-y: scroll
</style>