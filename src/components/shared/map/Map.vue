<template>
  <div class="mt-5">

    <gmap-map
            :options="{styles: styles}"
            :center="center"
            :zoom="16"
            style="width:100%;  height: 400px;"
            ref="map"
            @dblclick="addCustomMarker"
    >
      <gmap-marker
              :position="marker"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        center: {},
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
              {
                saturation: 36,
              },
              {
                color: '#000000',
              },
              {
                lightness: 40,
              },
            ],
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                visibility: 'on',
              },
              {
                color: '#000000',
              },
              {
                lightness: 16,
              },
            ],
          },
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 17,
              },
              {
                weight: 1.2,
              },
            ],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 21,
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 17,
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 29,
              },
              {
                weight: 0.2,
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 18,
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 16,
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 19,
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000',
              },
              {
                lightness: 17,
              },
            ],
          },
        ],
        marker: null,
      };
    },
    mounted() {
      this.geolocate();
    },
    methods: {
      geolocate: function() {
          navigator.geolocation.getCurrentPosition(position => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            this.marker = {
              lat: this.center.lat,
              lng: this.center.lng,
            };

          });
      },
      addCustomMarker(e) {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        this.marker = {
          lat: lat,
          lng: lng,
        }
        this.reversGeoCode();
      },
      reversGeoCode() {
        // TODO :: we need access to the Geocoding api
        // TODO :: we need access to the Autocompleete api
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyAfYAgsxbh9FIJw1lAUc3B_t3ujOTrDRT4')
                .then(res => console.error(res));
      }
    }
  };
</script>
