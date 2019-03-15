<template>
    <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
            <v-toolbar dark :color="color">
                <v-card-title>
                    <span class="headline">Create Dish</span>
                </v-card-title>
                <h3 class="display-2 font-weight-regular"></h3>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="closeDialog">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Name*" required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <VFileUpload/>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field label="Price*" required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-autocomplete
                                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                    label="Category"-outer-i
                                    multiple
                            >
                                <template v-slot:append-outer>
                                    <v-slide-x-reverse-transition mode="out-in">
                                        <v-icon
                                                :key="`icon-${isEditing}`"
                                                color="success"
                                                @click="createCategory"
                                        >add</v-icon>
                                    </v-slide-x-reverse-transition>
                                </template>
                            </v-autocomplete>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field label="Weight*" required></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-textarea
                                    name="input-7-1"
                                    label="Description"
                                    value=""
                                    hint="Example: Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust."
                            ></v-textarea>
                        </v-flex>

                    </v-layout>
                    <small class="red--text">*indicates required field</small>
                </v-container>
            </v-card-text>

            <v-card-actions class="px-5 pb-5">
                <v-btn color="blue darken-1" block @click="saveItem">Save</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
	import VFileUpload from '../../../shared/VFileUpload'
	import { mapState } from 'vuex'

	export default {
		components: {
			VFileUpload
		},

		computed: {
			...mapState('app', ['color'])
		},

		data() {
			return {
				dialog: true,
				isEditing: false,
			}
		},

		methods: {
			saveItem () {
				// TODO :: save item
			},
			closeDialog () {
				this.dialog = false
			},
			createCategory () {
				// TODO :: create category
			}
		}
	}
</script>

<style scoped lang="stylus">
    .v-toolbar:not(.v-toolbar--fixed) .v-toolbar__content
        margin-left: 0 !important
</style>