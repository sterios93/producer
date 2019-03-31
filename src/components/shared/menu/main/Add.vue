<template>
    <v-dialog
            :value="visibility"
            @change="closeDialog"
            :fullscreen="main.fullscreen || responsive"
            persistent
            max-width="800px">
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
                            <v-text-field
                                    label="Name*"
                                    v-model="name"
                                    :error-messages="nameErrors"
                                    @blur="validate('name')"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-layout>
                                <v-flex v-if="image" xs2>
                                    <img :src="image" height="50"/>
                                </v-flex>
                                <v-flex xs12>
                                    <VFileUpload @file-picked="onFilePicked"/>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field
                                    label="Price*"
                                    v-model="price"
                                    numeric
                                    :error-messages="priceErrors"
                                    @blur="validate('price')"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-autocomplete
                                    v-model="category"
                                    :items="categories"
                                    item-text="name"
                                    item-value="id"
                                    label="Category*"
                                    :error-messages="categoryErrors"
                                    @blur="validate('category')"
                            >
                                <template v-slot:append-outer>
                                    <v-slide-x-reverse-transition mode="out-in">
                                        <v-icon
                                                color="success"
                                                @click="createCategory"
                                        >add
                                        </v-icon>
                                    </v-slide-x-reverse-transition>
                                </template>
                            </v-autocomplete>
                        </v-flex>

                        <v-flex xs12 sm6>
                            <v-text-field
                                    label="Weight*"
                                    v-model="weight"
                                    :error-messages="weightErrors"
                                    @blur="validate('weight')"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                            <v-textarea
                                    v-model="description"
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
                <v-btn color="blue darken-1 white--text" :disabled="!isFormValid" block @click="onConfirm">Save</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
  import VFileUpload from '../../../shared/VFileUpload'
  import {mapState, mapActions} from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required, numeric } from 'vuelidate/lib/validators'

  export default {
    components: {
      VFileUpload
    },

    mixins: [validationMixin],

    data() {
      return {
        visibility: false,
        nameErrors: [],
        priceErrors: [],
        weightErrors: [],
        categoryErrors: [],
        allFields: [
          'name',
          'price',
          'weight',
          'category',
        ],
        isFormValid: false,
      }
    },

    computed: {
      ...mapState({
        item(state) {return state.main[this.action]},
        main: (state) => state.modals.menu.main,
        color: (state) => state.modals.menu.main.color,
        action: (state) => state.modals.menu.main.action,
        responsive: (state) => state.layout.responsive,
        categories: (state) => state.categories.items
      }),
      name: {
        get() {return this.item.name},
        set(value) {
          this.setName({payload: value, action: this.action})
          this.validate('name');
        }
      },
      image: {
        get() {return this.item.image},
        set(value) {
          this.setPictureUrl({payload: value, action: this.action})
        }
      },
      price: {
        get() {return this.item.price},
        set(value) {
          this.setPrice({payload: value, action: this.action})
          this.validate('price');
        }
      },
      weight: {
        get() {return this.item.weight},
        set(value) {
          this.setWeight({payload: value, action: this.action})
          this.validate('weight');
        }
      },
      picture: {
        get() {return this.item.picture},
        set(value) {
          this.setPicture({payload: value, action: this.action})
        }
      },
      category: {
        get() {return this.item.category},
        set(value) {
          this.setCategory({payload: value, action: this.action})
          this.validate('category');
        }
      },
      description: {
        get() {return this.item.description},
        set(value) {
          this.setDescription({payload: value, action: this.action})
        }
      },
    },

    created() {
      this.isFormValid = this.action !== 'add'
    },

    mounted() {
      setTimeout(() => {
        this.visibility = true
      }, 100)
    },

    beforeDestroy() {
      this.action === 'add' && this.reset(this.action)
    },

    methods: {
      ...mapActions('main', [
        'reset',
        'setName',
        'setPrice',
        'saveItem',
        'setWeight',
        'setPicture',
        'setCategory',
        'setPictureUrl',
        'setDescription'
      ]),
      ...mapActions('modals', [
        'setModalVisibility',
        'setMenuModalVisibility'
      ]),
      ...mapActions('snackbar', {
        setSnackbar: 'setState'
      }),
      onConfirm() {
        this.allFields.forEach(el => this.validate(el))
        // TODO :: send the data to the database
        this.$v.$touch();
        if (this.$v.$invalid || this.hasError()) {
          this.setFormValid(false)
          this.setSnackbar({snackbar: true, message: 'Please fill correct all fields.', color: 'red'});
        } else {
          this.onFormValid();
          this.setFormValid(true);
        }
      },
      onFormValid() {
        this.saveItem({action: this.action})
          .then((data) => {
            if (!data.success) {
              return this.setSnackbar({snackbar: true, message: data.message, color: 'red'})
            }
            this.closeDialog()
            return this.setSnackbar({snackbar: true, message: 'Updated successfully', color: 'success'})
          })
          .catch((err) => this.setSnackbar({snackbar: true, message: err.message, color: 'red'}))
      },
      closeDialog() {
        this.visibility = false
        setTimeout(() => {
          this.setMenuModalVisibility({key: 'main', value: false})
        }, 200)
      },
      onFilePicked({file, url}) {
        this.image = url
        this.setPicture({payload: file, action: this.action})
      },
      createCategory() {
        this.setModalVisibility({key: 'category', value: true})
      },
      /** ---- Validations ---- **/
      setFormValid(isValid) {
        this.isFormValid = isValid
      },
      validate(target) {
        // Reset the errors everytime, so you can have dynamic fresh array on every keystroke
        this[target + 'Errors'] = []
        this.$v[target].$touch()

        this.setFormValid(!this.hasError())

        this.checkRequired(target)
        this.checkNumeric(target)
        return this[target + 'Errors']
      },
      hasError() {
        return this.allFields
          .reduce((result, item) => {
            result.push(!this.$v[item].$error)
            return result
          }, [])
          .includes(false)
      },
      checkNumeric(target) {
        (this.$v[target].numeric !== undefined) && !this.$v[target].numeric && !this[target + 'Errors'].includes('Must be numeric') && this[target + 'Errors'].push('Must be numeric')
      },
      checkRequired(target) {
        !this.$v[target].required && this[target + 'Errors'].push('This field is required')
      }
    },
    validations: {
      name: {
        required
      },
      price: {
        required,
        numeric
      },
      weight: {
        required,
        numeric
      },
      category: {
        required
      },
    }
  }
</script>

<style scoped lang="stylus">

</style>