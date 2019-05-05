<template>
    <v-layout justify-center>
        <div ref="membershipContainer" class="membership-container">
            <div class="card-container" v-for="(membership, key, index) of memberships" :key="key" >
                <PlanCard v-bind="membership" />
            </div>
        </div>
    </v-layout>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import PlanCard from './PlanCard'
	import EventBus from '../../../utils/eventBus'

	export default {
		components: {
			PlanCard
		},
		data() {
			return {
			}
		},
		computed: {
			...mapState({
				memberships: state => state.subscriptions.memberships
			})
		},
		mounted() {
			this.$nextTick(() => {
				this.membershipContainer = this.$refs.membershipContainer
				EventBus.$on('resize', this.fit)
			})
		},
		beforeDestroy() {
			EventBus.$off('resize', this.fit)
		},
		methods: {
			...mapActions({
				setModalData: 'modals/setModalData',
			}),
			fit(element = this.membershipContainer) {
				console.error('resize', element)
				if (!element) return
				const contentWidth = element.offsetWidth
				const contentHeight = element.offsetHeight

				const availableWidth = element.parentElement.offsetWidth
				const availableHeight = element.parentElement.offsetHeight

				const scale = Math.min(
					availableWidth / contentWidth,
					availableHeight / contentHeight
				);
				console.error('scale', scale)
				element.style.transform = `scale(${scale})`
			},
		}
	}
</script>

<style scoped lang="stylus">
    .membership-container
        margin-bottom 50px
        white-space: nowrap
        .card-container
            display: inline-block
</style>
