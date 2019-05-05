<template>
    <div
            class="action-card"
            @click="onClick"
    >
        <div class="plan-type">
            <div class="card-type text">{{type.toUpperCase()}}</div>
        </div>

        <hr class="line">

        <div class="plan-price orange--text text--lighten-2">
            <div>
                <p class="price text"><span class="price sign text">$</span>{{price}}</p>
            </div>
            <span class="price-per grey--text text--darken-3">per {{per}}</span>
        </div>


        <!--        <v-avatar size="100px" tile>-->
        <!--            <img-->
        <!--                    :src="'./img/' + action.img"-->
        <!--                    :alt="action.title"-->
        <!--            >-->
        <!--        </v-avatar>-->

        <div class="plan-includes">
            <ul class="inner-container">
                <li class="list-item">30 days Membership</li>
                <li class="list-item">150+ Projects</li>
                <li class="list-item">Advanced options</li>
            </ul>
        </div>

        <hr class="line">

        <div class="plan-actions">
            <v-btn dark :color="colors.second" block width="400" @click="onClick">ORDER</v-btn>
        </div>

    </div>

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
				default: 50,
			},
			position: {
				type: Object,
				default: () => {
					return {
						upper: false,
						down: false,
					}
				}
			},
			per: {
				type: String,
				default: 'month'
			}
		},
		data() {
			return {
				minHeight: {
					special: 170,
					ordinary: 150
				}
			}
		},
		computed: {
			cardStyle() {
				return {
					top: this.position.down ? '20px' : this.position.upper ? '-20px' : 0
				}
			}
		},
		methods: {
			onClick() {
				//
			},
		}
	}
</script>

<style scoped lang="stylus">
    .action-card
        padding 50px 0 !important
        width 400px
        text-align: center

        .line
            width 100%
            margin 40px 0
            height: 1px
            opacity 0.2

        .text
            font-family: Avenir, Helvetica, Arial, sans-serif !important

        .plan-type
            font-size: 30px !important
            font-weight bold

        .plan-price
            .price
                font-size: 55px !important
                font-weight bold

                .sign
                    position: relative
                    top -15px

            .price-per
                position: relative
                top -15px

        .plan-includes
            padding-top: 10px


            .inner-container
                padding-left 0 !important
                list-style-type: none
                background-color: transparent
                align-items center
                justify-content center
                height: 100%

                .list-item
                    padding-top 10px
                    padding-bottom 10px

        .plan-actions
            width: 50%
</style>

