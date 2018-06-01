<template lang="pug">
  .home
    p(v-if="allowGeolocation") Lat: {{ getCoordinates.lat }}, Lng: {{ getCoordinates.lng }}
    p(v-else) You need to allow Geolocation for this app to work!
    hr
    ListFlights(msg="Welcome to Your Air Traffic App")
</template>

<script>
// @ is an alias to /src
import ListFlights from '@/components/ListFlights.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  props: ['coords'],
  components: {
    ListFlights
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getCoordinates', 'allowGeolocation'])
  },
  mounted () {
    console.log('Mounted')

    // Check if there is geolocation option
    if ('geolocation' in navigator) {
      console.log('yes')
    } else {
      console.log('no')
    }

    if (!this.allowGeolocation) {
      // Ask user for permission to use geolocation
      if (confirm('This app wants to use geolocation')) {
        this.$store.dispatch('fetchUserLocation').then(({ lat, lng }) => {
          this.$store.dispatch('fetchFlights', {
            lat,
            lng
          })
        })
      } else {
        console.log('Error: You need to allow geolocation to use this app!')
      }
    }
  }
}
</script>
