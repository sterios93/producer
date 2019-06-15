<template>
    <v-dialog
            :value="payment.visibility"
            @change="closeDialog"
            :fullscreen="payment.fullscreen"
            persistent
            min-height="800px"
            max-width="600px">
        <v-card>
            <v-toolbar dark :color="color">
                <v-card-title>
                    <span class="headline">Message</span>
                </v-card-title>
                <h3 class="display-2 font-weight-regular"></h3>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
                <v-card-text class="px-5 pb-5 text-xs-center">
                    <span class="title confirm-massage">Choose way to pay for {{payment.plan}}?</span>
                </v-card-text>

                <v-card-actions class="pb-5 layout justify-space-around row wrap">
                    <div>
                        <v-img class="payment-method" width="200px" @click="onConfirm" src="./img/visa-master.png"></v-img>
                    </div>
                    <div>
                        <v-img class="payment-method" width="200px" @click="onConfirm" src="./img/paypal.png"></v-img>
                    </div>
                </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
	import {mapState, mapActions} from 'vuex'

	export default {
		computed: {
			...mapState({
				color: (state) => state.modals.confirm.color,
                payment: (state) => state.modals.payment,
				responsive: (state) => state.layout.responsive,
			}),
		},

		methods: {
			...mapActions('categories', [
				'saveItem',
				'setCategoryName'
			]),
			...mapActions('modals', [
				'setModalData',
				'setFullscreen',
				'setModalVisibility'
			]),
			onConfirm(method) {
				let cb = method === 'billing' ? this.onBilling : this.onPaypal
                this.setModalData({
                    key: 'confirm',
                    value: {
                        visibility: true,
                        action: 'choose this payment method',
                        callback: cb
                    }
                })
			},
            onPaypal() {
              console.error('paypal')
            },
            onBilling() {
              console.error('billing')
            },
			closeDialog() {
				this.setModalVisibility({key: 'payment', value: false})
			},

		}
	}
</script>

<style scoped lang="stylus">
    .confirm-massage
        color #000000c2

    @keyframes animate-payment
        0%
            transform: scale(0)
        50%
            transform: scale(1.1)
        100%
            transform: scale(1)

    .payment-method
        filter: drop-shadow(1px 2px 1px rgba(0,0,0,0.5));
        animation animate-payment 1s
        &:hover
            transform: scale(1.1)

</style>
