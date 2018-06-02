<template>

  <ListFlights
    :flights="getFlights"
    :address="getAddress"
    :lat="getCoordinates.lat"
    :lng="getCoordinates.lng"
    :allowGeolocation="allowGeolocation"
    />
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
  computed: {
    // get information from store
    ...mapGetters([
      'getCoordinates',
      'allowGeolocation',
      'getFlights',
      'getAddress'])
  },
  mounted () {
    // Check if there is geolocation option
    if ('geolocation' in navigator) {
      console.log('Geolocation OK!')
    } else {
      alert('You may have to upgrade your Browser to use this app!')
    }

    if (!this.allowGeolocation) {
      // Ask user for permission to use geolocation
      if (confirm('This app wants to use geolocation')) {
        // Fetch user location
        this.$store.dispatch('fetchUserLocation').then(({ lat, lng }) => {
          const vm = this

          // Then fetch flights for user's location
          vm.$store.dispatch('fetchFlights', {
            lat,
            lng
          })

          // Set data to update on 1 minute interval
          setInterval(function () {
            vm.$store.dispatch('fetchFlights', {
              lat,
              lng
            })
          }, 60 * 1000)
        })
      } else {
        console.log('Error: You need to allow geolocation to use this app!')
      }
    }
  }
}
</script>

<style lang="stylus">
.location-headline
  font-size 20px
  font-weight 700
</style>
