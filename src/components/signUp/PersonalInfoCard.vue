<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="First Name"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Last Name"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="E-mail"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Phone number"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
            </v-flex>


            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Password"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
            <v-text-field
                class="purple-input"
                label="Repeat Password"
                v-model="email"
                :rules="emailRules"
                required>
            </v-text-field>
            </v-flex>

            <v-flex>
                <v-btn
                color="primary"
                @click="e1 = 2"
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
        name: 'personal-info-card',
        data () {
            return {

            }
        }
    }
</script>