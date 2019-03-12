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
                        :value="tabKeys.indexOf(activeTab)"
                        @change="onTabChange"
                        :color="color"
                        grow
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab
                            v-for="(tab, key, index) in tabs"
                            :item-value="key"
                            :key="key"
                    >
                        {{ tab.title }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items :value="tabKeys.indexOf(activeTab)">

            <v-tab-item v-for="n in 3" :key="n">
                <v-card flat>
                    <v-card-text>
                        <MenuTab v-bind="menuTabProps"/>
                    </v-card-text>
                </v-card>
            </v-tab-item>

        </v-tabs-items>
    </div>
</template>

<script>
  import MenuList from '../../shared/menu/MenuList'

  import {mapActions} from 'vuex'
  import MenuTab from "./MenuTab";

  export default {
    props: {
      tabs: Object,
      color: String,
      activeTab: String,
      selectedCategories: Array
    },

    data () {
      return {
        tabKeys: ['menu', 'special', 'launch']
      }
    },

    components: {
      MenuTab,
      MenuList,
    },

    computed: {
      menuTabProps () {
        return {
          color: this.color,
          selectedCategories: this.selectedCategories
        }
      }
    },

    methods: {
      ...mapActions('menu', ['setActiveTab']),
      onTabChange(tab) {
        this.setActiveTab(this.tabKeys[tab])
      }
    }
  }
</script>

<style scoped lang="stylus">
    .transition-custom
        flex-direction: row
        flex-wrap: wrap
        max-height: 80vh
        overflow-y: scroll
</style>