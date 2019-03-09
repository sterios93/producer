<template>
    <v-container>
        <v-layout wrap>
        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant Name"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant Type"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant website"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
        </v-flex>

        <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Restaurant number"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
        </v-flex>

        <v-flex>
            <v-btn
                color="primary"
                @click="e1 = 3"
            >
                Continue
            </v-btn>

            <v-btn flat>Cancel</v-btn>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'restaurant-info-card',
        data () {
            return {

            }
        }
    }
</script>