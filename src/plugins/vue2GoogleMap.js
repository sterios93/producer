import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAfYAgsxbh9FIJw1lAUc3B_t3ujOTrDRT4',
    libraries: 'places'
  }
})
