<template>
    <v-container>
        <v-layout wrap>
        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant Name"
                v-model="email"
                required>
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant Type"
                v-model="email"
                required>
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant website"
                v-model="email"
                required>
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant number"
                v-model="email"
                required>
            </v-text-field>
        </v-flex>

        <v-flex>
             <v-btn color="primary" @click="stepClick(1)">Back</v-btn>
            <v-btn
                color="primary"
                @click="stepClick(3)"
            >
                Continue
            </v-btn>

            <v-btn flat>Cancel</v-btn>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

    export default {
        name: 'restaurant-info-card',
        data () {
            return {
                email: ''
            }
        },
        methods: {
             ...mapActions('signUp', [
                'setActiveStepNumber',
            ]),
            stepClick(stepNumber) {
                this.setActiveStepNumber(stepNumber);
            }
        },
        
    }
</script>