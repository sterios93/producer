<template>
    <div
            class="action-card"
            @click="onClick"
    >
        <v-avatar size="100px" tile>
            <img
                    :src="'./img/' + action.img"
                    :alt="action.title"
            >
        </v-avatar>
        <hr class="line">
        <div class="action-card-title subheading">{{action.title}}</div>
    </div>
</template>

<script>
  export default {
    props: {
      action: {
      	type: Object,
        default: () => {
          return {
          	title: 'Simple Action',
            img: ''
          }
        }
      }
    },
    methods: {
      onClick() {
      	this.action.cb()
      }
    }
  }
</script>

<style scoped lang="stylus">
    .line
        width 350px
        margin 10px 0
        height: 1px
        opacity 0.2
    .action-card-title
        text-align center
</style>
