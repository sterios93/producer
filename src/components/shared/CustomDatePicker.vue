<template>
    <div>
        <v-menu
            v-model="show"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
        >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-on="on"
                    :label="label"
                    v-model="date"
                    readonly
                    append-icon="event"
                    :error="inError"
                    :error-messages="errorMessages"
            ></v-text-field>
        </template>
        <flat-pickr
                v-model="time"
                :config="config"
                full-width
                class="form-control"
                name="date">
        </flat-pickr>
        <v-date-picker
                v-model="date"
                width="308px"
                @input="show = false"></v-date-picker>
        </v-menu>
    </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'

  export default {
    components: {
      flatPickr
    },

    props: {
      label: String,
      options: Object,
      errorMessages: Array,
    },

    data() {
      return {
        show: false,
        config: {
          inline: true,
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i"
        },
      }
    },

    computed: {
      date: {
        get() {
          return `${this.options.date || new Date().toISOString().substr(0, 10)} ${this.time}`
        },
        set(value) {this.$emit('date-changed', value)}
      },
      time: {
        get() {return this.options.time || '12:00'},
        set(value) {this.$emit('time-changed', value)}
      },
      inError() {
        return this.errorMessages.length > 0
      }
    }
  }
</script>

<style scoped lang="stylus">
    .v-menu__content
        overflow: hidden !important

    .form-control
        display: none !important
</style>