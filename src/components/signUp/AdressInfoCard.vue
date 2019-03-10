<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12>
            <v-text-field
                label="Adress"
                append-icon="place"
            ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <Map></Map>
            </v-flex>
            <v-flex>
                <v-btn color="primary" @click="stepClick(2)">Back</v-btn>
                <v-btn
                color="primary"
                @click="e1 = 1"
            >
                Continue
            </v-btn>

            <v-btn flat>Cancel</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Map from '../shared/map/Map';
import { mapActions } from 'vuex'


    export default {
        name: 'adress-info-card',
        components: {
            Map
        },
        data () {
            return {

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