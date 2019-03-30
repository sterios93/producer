<template>
    <v-flex xs12>
        <v-layout row justify-center>
            <v-flex xs10 class="special-date-container" :style="containerStyle">
                <v-layout row>
                    <v-flex class="text-xs-center white--text date-font">
                        <span>{{item.startDate}}</span>
                    </v-flex>
                    <v-flex text-xs-center white--text date-font>
                        <v-icon>calendar_today</v-icon>
                    </v-flex>
                    <v-flex class="text-xs-center white--text date-font">
                        <span>{{item.endDate}}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-card>
            <div v-if="isSpecial">
                <h4 class="ma-0 text-xs-center">{{item.name}}</h4>
                <v-img
                        class="white--text"
                        height="150px"
                        :src="imagePath"
                >
                </v-img>
                <v-card-title>
                    <div class="text-truncate">{{item.description}}</div>
                </v-card-title>
            </div>
            <v-card-actions>
                <v-btn flat color="info" @click="readMore">Explore</v-btn>
                <div v-if="isSpecial" class="ribbon"><span>{{ribbonText}}</span></div>
                <v-flex></v-flex>
                <v-btn icon @click="onEditClick" v-if="isEditable">
                    <v-icon color="orange">edit</v-icon>
                </v-btn>
                <v-btn icon @click="onDeleteClick" v-if="isEditable">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-flex>
</template>

<script>
  // TODO :: Show the read more button only for special offers and lunch offers. Dont show them when viewing the special offer view page or lunch view page.
  import {mapActions} from 'vuex'

  export default {
    props: {
      item: {
        type: Object,
        default: () => {},
      },
      isEditable: {
        type: Boolean,
        default: false,
      },
      isSpecial: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'main',
      },
      colors: {
        type: Array,
        default: () => ['#2980b9', '#5dbfff'],
      }
    },
    data() {
      return {
        defaultImage: 'img/default-menu-v2.jpg'
      }
    },
    computed: {
      ribbonText() {
        return this.type === 'lunch' ? this.type : `- ${this.item.discount} %`
      },
      imagePath() {
        return this.item.image || this.defaultImage
      },
      containerStyle() {
        return {
          background: `linear-gradient(${this.colors[0]} 0%, ${this.colors[1]} 100%)`
        }
      }
    },
    methods: {
      ...mapActions({
        'setMenuModalVisibility': 'modals/setMenuModalVisibility',
      }),
      readMore() {
        this.$router.push({ path: `/${this.type}-offer/${this.item.id}`})
      },
      onEditClick() {
        this.setMenuModalVisibility({
          key: this.type,
          value: true,
          action: 'edit'
        })

        this.$store.dispatch(`${this.type}/setItem`, {
          payload: this.item,
          action: 'edit'
        })
      },
      onDeleteClick() {

      }
    }
  }
</script>

<style scoped lang="stylus">
    .date-font
        font-weight: 500
    .special-date-container
        border-top: 2px solid white
        border-left: 2px solid white
        border-right: 2px solid white
        border-top-left-radius: 25px
        border-top-right-radius: 25px
        padding 5px !important
    .discount-label
        position absolute
        right 0
        transform:matrix(0.66,-0.75,0.75,0.66,0,0);
        color: red
    .ribbon {
        position: absolute;
        left: -5px; top: -5px;
        z-index: 1;
        overflow: hidden;
        width: 75px; height: 75px;
        text-align: right;
    }
    .ribbon span {
        font-size: 10px;
        font-weight: bold;
        color: #FFF;
        text-transform: uppercase;
        text-align: center;
        line-height: 20px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        width: 100px;
        display: block;
        background: #79A70A;
        background: linear-gradient(#ce0d78 0%, #ff5deb 100%);
        box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
        position: absolute;
        top: 19px; left: -21px;
    }
    .ribbon span::before {
        content: "";
        position: absolute; left: 0px; top: 100%;
        z-index: -1;
        border-left: 3px solid #2980b9;
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #2980b9;
    }
    .ribbon span::after {
        content: "";
        position: absolute; right: 0px; top: 100%;
        z-index: -1;
        border-left: 3px solid transparent;
        border-right: 3px solid #2980b9;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #2980b9;
    }
</style>
