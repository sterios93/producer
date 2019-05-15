<template>
    <div
            class="plan-card"
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
        </div>

        <v-avatar size="50px" tile>
            <img
                    :src="img"
                    :alt="type"
            >
        </v-avatar>

        <div class="plan-includes">
            <ul class="inner-container">
                <li v-for="item in includes" :key="item" class="list-item">{{item}}</li>
            </ul>
        </div>

        <hr class="line">

        <div class="plan-actions">
            <v-btn dark :color="colors.second" block width="400" @click="onClick">ORDER</v-btn>
        </div>

    </div>

</template>

<script>
    import {mapActions} from 'vuex'
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
            includes: {
            	type: Array,
                default: () => []
            },
            type: {
				type: String,
				default: 'Basic'
			},
            price: {
				type: Number,
				default: 50,
			},
            img: {
	            type: String,
	            default: './img/basic.png'
            },
            isActive: {
				type: Boolean,
                default: false
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
		methods: {
            ...mapActions({
                cancelMemberShip: 'subscriptions/cancelMemberShip',
                setModalData: 'modals/setModalData',
            }),
            onClick() {
                this.setModalData({
                    key: 'payment',
                    value: {
                        visibility: true,
                        plan: this.type,
                    }
                })
            }
		}
	}
</script>

<style scoped lang="stylus">
    .ribbon
        position: absolute;
        left: 20px;
        top: 20px;
        z-index: 1;
        overflow: hidden;
        width: 75px; height: 75px;
        text-align: right;
        transform: scale(1.5)

    .ribbon span
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
        background: linear-gradient(#fe7d34 0%, #de7332 100%);
        box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
        position: absolute;
        top: 19px; left: -21px;

    .ribbon span::before
        content: "";
        position: absolute; left: 0px; top: 100%;
        z-index: -1;
        border-left: 3px solid #2980b9;
        border-right: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #2980b9;

    .ribbon span::after
        content: "";
        position: absolute; right: 0px; top: 100%;
        z-index: -1;
        border-left: 3px solid transparent;
        border-right: 3px solid #2980b9;
        border-bottom: 3px solid transparent;
        border-top: 3px solid #2980b9;

    .plan-card
        padding 50px 0 !important
        text-align: center
        cursor pointer
        display flex
        flex-direction column
        border-radius 20px
        justify-content space-around
        align-items center
        box-shadow: 0px 0px 60px -25px rgba(0, 0, 0, 0.4)
        border 1px solid transparent

        .line
            width 100%
            margin 40px 0
            height: 1px
            opacity 0.2

        .text
            font-family: Avenir, Helvetica, Arial, sans-serif !important

        .plan-type
            display flex
            justify-content center
            align-items center
            min-height: 100px
            font-size: 30px !important
            font-weight bold

        .plan-price
            .price
                font-size: 55px !important
                font-weight bold

                .sign
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

