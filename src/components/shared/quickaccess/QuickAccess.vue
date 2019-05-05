<template>
    <div class="quick-access">
        <div  v-for="(action, index) in actions" :key="index" class="action-card-outer-container">
            <ActionCard :action="action" class="action-card-container"/>
        </div>
    </div>
</template>

<script>
	import ActionCard from './ActionCard'
	import {mapActions} from 'vuex'

	export default {
		components: {
			ActionCard
		},
		created() {
			this.actions = [
				{
					img: 'main.png',
					title: 'Create main menu product',
					cb: () => this.setMenuModalVisibility({
						key: 'main',
						value: true
					})
				},
				{
					img: 'special.png',
					title: 'Create special offer',
					cb: () => this.setMenuModalVisibility({
						key: 'special',
						value: true
					})
				},
				{
					img: 'lunch.png',
					title: 'Create lunch offer',
					cb: () => this.setMenuModalVisibility({
						key: 'lunch',
						value: true
					})
				},
				{
					img: 'category.png',
					title: 'Create category',
					cb: () => this.setModalVisibility({
						key: 'category',
						value: true
					})
				},
				{
					img: 'menu.png',
					title: 'Menu',
					cb: () => this.$router.push('menu')
				},
				{
					img: 'profile.png',
					title: 'Edit Profile',
					cb: () => this.$router.push({name: 'user-profile', params: {forceEdit: true }})
				}
			]
		},
		methods: {
			...mapActions({
				'setModalVisibility': 'modals/setModalVisibility',
				'setMenuModalVisibility': 'modals/setMenuModalVisibility',
				'setBottomSheetVisibility': 'bottomSheet/setVisibility',
			}),
		}
	}
</script>

<style scoped lang="stylus">
    .quick-access
        display: flex
        flex-wrap: wrap
        justify-content center

        .action-card-outer-container
            padding 9px

            .action-card-container
                display inline-flex
                width 380px
                height 220px
</style>
