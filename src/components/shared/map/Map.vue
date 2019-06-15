<template>
  <div
    class="mt-5"
  >
    <gmap-autocomplete
      v-model="rAddress"
      :options="autocompleteOptions"
      :select-first-on-enter="true"
      class="gmap-autocomplete"
      placeholder="Address"
      @place_changed="setPlace"/>

    <gmap-map
      ref="map"
      :options="{styles: styles}"
      :center="center"
      :zoom="16"
      style="width:100%;  height: 400px;"
      @click="addCustomMarker"
    >
      <gmap-marker
        :position="marker"
      />
    </gmap-map>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    storeModule: String
  },
  data () {
    return {
      autocompleteOptions: {
        componentRestrictions: {
          country: [
            'de'
          ]
        }
      },
      defaultCoords: {
        latitude: 51.1657,
	      longitude: 10.4515
      },
      latLng: {},
      center: {
        lat: 51.1657,
        lng: 10.4515
      },
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: 36
            },
            {
              color: '#000000'
            },
            {
              lightness: 40
            }
          ]
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'on'
            },
            {
              color: '#000000'
            },
            {
              lightness: 16
            }
          ]
        },
        {
          featureType: 'all',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 17
            },
            {
              weight: 1.2
            }
          ]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 20
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 21
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 17
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 29
            },
            {
              weight: 0.2
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 18
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 16
            }
          ]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 19
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000'
            },
            {
              lightness: 17
            }
          ]
        }
      ],
      marker: null,
      apiKey: 'AIzaSyAfYAgsxbh9FIJw1lAUc3B_t3ujOTrDRT4'
    }
  },
  mounted () {
    this.geolocate()
  },
  computed: {
    ...mapState({
      rAddress (state) {
        return state[this.storeModule].address
      }
    })
  },
  methods: {
    setPlace (place) {
      if (!place) return

      this.marker = this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      const city = this.keyParser(place.address_components, 'locality')
      const country = this.keyParser(place.address_components, 'country')
      const postalCode = this.keyParser(place.address_components, 'postal_code')

      const data = {
        city,
        country,
        postalCode,
        formatted_address: place.formatted_address,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      }

      this.populateData(data)
    },
    geolocate: function () {
      const onSuccess = (position) => {
        this.setCoordinates(position.coords)
        // this.$emit('located', position.coords)
        this.getAddress(position.coords.latitude, position.coords.longitude)
      }

      const onError = (error) => {
        if (error.code === 1) {
          // user blocked location set default coordinates
          this.setCoordinates(this.defaultCoords)
          // this.$emit('located', this.defaultCoords)
          this.getAddress(this.defaultCoords.latitude, this.defaultCoords.longitude)
        }
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    },
    setCoordinates (coordinates) {
      this.$set(this.center, 'lat', coordinates.latitude)
      this.$set(this.center, 'lng', coordinates.longitude)

      this.$refs.map.$mapPromise.then((map) => {
        map.panTo(this.center)
      })

      this.marker = {
        lat: this.center.lat,
        lng: this.center.lng
      }
    },
    addCustomMarker (e) {
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()

      this.marker = {
        lat: lat,
        lng: lng
      }
      this.getAddress(lat, lng)
    },
    addressParser (data) {
      const address = (data.results && data.results[0]) ? data.results[0] : null

      if (address) {
        const { address_components, formatted_address } = address
        const city = this.keyParser(address_components, 'locality')
        const country = this.keyParser(address_components, 'country')
        const postalCode = this.keyParser(address_components, 'postal_code')
        const location = address.geometry.location

        return {
          city,
          country,
          postalCode,
          formatted_address,
          location
        }
      } else {
        return false
      }
    },
    keyParser (data, searchedKey) {
      for (let key in data) {
        if (data[key].types.includes(searchedKey)) {
          return data[key].long_name
        }
      }
    },
    /**
       *
       * @param {object} data
       */
    populateData (data) {
      this.$store.dispatch(`${this.storeModule}/setAddress`, data.formatted_address)
      this.$store.dispatch(`${this.storeModule}/setCity`, data.city)
      this.$store.dispatch(`${this.storeModule}/setCountry`, data.country)
      this.$store.dispatch(`${this.storeModule}/setPostalCode`, data.postalCode)
      this.$store.dispatch(`${this.storeModule}/setLocation`, data.location)
    },
    getAddress (lat, lng) {
      // TODO :: we need access to the Autocompleete api
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat + ',' + lng}&key=${this.apiKey}&language=en`)
        .then(res => {
          if (res.status === 200) return res.json()
        })
        .then(res => {
          const address = this.addressParser(res)
          if (address) this.populateData(address)
        })
    }
  }
}
</script>

<style scoped lang="stylus">
  .gmap-autocomplete
    border-bottom 1px solid #c3c3c3
    width 100%
    margin-bottom 5%;
    &:focus
      outline: none
</style>
