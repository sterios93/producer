<template>
  <v-card
    :style="cardStyle"
    tile
    max-width="250"
    class="plan-card">
    <v-card
      :color="colors.primary"
      tile
      class="mx-auto plan-card-container"
      dark
      min-width="250"
    >
      <v-card-title primary-title>
        <div>
          <div>
            <p class="price text"><span class="price sign text">$</span>{{ price }}</p>
          </div>
          <span>per {{ per }}</span>
        </div>
      </v-card-title>
    </v-card>
    <v-card
      tile
      class="mx-auto plan-card-container"
      color="#868686"
      dark
      min-width="250"
    >
      <v-card-title
        primary-title
        class="card-type text">{{ type.toUpperCase() }}</v-card-title>
    </v-card>
    <v-card
      :color="colors.second"
      tile
      class="mx-auto plan-card-container plan-card-list"
      dark
      min-width="250"
    >
      <v-list class="inner-container">
        <v-list-tile class="list-item">30 days Membership</v-list-tile>
        <v-list-tile class="list-item">150+ Projects</v-list-tile>
        <v-list-tile class="list-item">Advanced options</v-list-tile>
      </v-list>

      <v-btn
        :color="colors.primary"
        width="400"
        @click="onClick">ORDER</v-btn>
    </v-card>

  </v-card>
</template>

<script>
export default {
  props: {
    colors: {
      type: Object,
      default: () => {
        return {
          primary: '#205D3C',
          second: '#47BB78'
        }
      }
    },
    type: {
      type: String,
      default: 'Basic'
    },
    price: {
      type: Number,
      default: 50
    },
	  position: {
      type: Object,
      default: () => {
      	return {
          upper: false,
          down: false
        }
      }
    },
    per: {
      type: String,
      default: 'month'
    }
  },
  data () {
  	return {
      minHeight: {
      	special: 170,
        ordinary: 150
      }
    }
  },
  computed: {
    cardStyle () {
      return {
      	top: this.position.down ? '20px' : this.position.upper ? '-20px' : 0
      }
    }
  },
  methods: {
    onClick () {
    	//
    }
  }
}
</script>

<style scoped lang="stylus">
    .plan-card
        white-space: initial
        display inline-block

        .plan-card-container
            text-align: center
            display: flex
            justify-content center
            align-items center
            flex-direction column
            .text
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                font-family: Avenir, Helvetica, Arial, sans-serif !important

            .price
                font-size: 55px !important
                font-weight bold

                .sign
                    position: relative
                    top -15px

            .card-type
                font-size: 30px !important
                font-weight bold

        .plan-card-list
            padding: 35px 0

            .list-item
                text-align center !important
                padding-top 10px
                padding-bottom 10px

            .inner-container
                background-color: transparent
                align-items center
                justify-content center
                height: 100%
        &:hover
            transform scale(1.02)
            box-shadow: 0 0 20px -7px rgba(0,0,0,0.75);
</style>
