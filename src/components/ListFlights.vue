<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <!-- SPINNER -->
      <v-progress-circular v-if="loading" :size="50" indeterminate color="primary"></v-progress-circular>

      <!-- CARD COMPONENT -->
      <v-card v-else>

        <!-- CARD HEADER -->
        <v-toolbar v-if="allowGeolocation" color="blue" dark>
          <v-toolbar-title>{{ address }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip left>
            <v-btn icon slot="activator" >
              <v-icon>location_on</v-icon>
            </v-btn>
            <span>Lat: {{lat | twoDecimals}}, Lng: {{ lng | twoDecimals }}</span>
          </v-tooltip>
        </v-toolbar>

        <!-- ERROR WHEN USER DOES NOT ALLOW GEOLOCATION -->
        <v-toolbar v-else color="red" dark>
          <v-toolbar-title>You need to allow Geolocation for this app to work!</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <!-- NO DATA -->
        <v-list v-if="flights.length === 0 && allowGeolocation">
          <v-btn @click="reloadPage">
            No data
          </v-btn>
        </v-list>
        <!-- LISTING -->
        <v-list v-else-if="allowGeolocation && flights.length > 0">

          <!-- LIST ITEMS -->
          <v-list-tile v-for="flight in flights" :key="flight.Id" @click="$router.push({ name: 'details', params: {id: flight.Id} })">

            <!-- ICON -->
            <v-list-tile-action>
              <v-icon
               class="plane-icon"
               :class="{ rotate180: flight.Brng > 180 }"
               color="blue lighten-2"> airplanemode_active
             </v-icon>
            </v-list-tile-action>

            <!-- ALTITUDE -->
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-left">
                {{ flight.Alt }} <strong>ft</strong>
              </v-list-tile-title>
            </v-list-tile-content>

            <!-- FLIGHT ID -->
            <v-list-tile-content>
              <v-list-tile-title class="flight-number"><strong>#id - </strong>{{ flight.Id }}</v-list-tile-title>
            </v-list-tile-content>

            <!-- DETAILS -->
            <v-list-tile-action>
              <v-btn color="info">
                View details
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <!-- SHOW ID USER DOES NOT ALLOW GEOLOCATION -->
        <v-list v-else>
          <v-btn @click="reloadPage">
            <v-icon>refresh</v-icon>
            Refresh page and try again
          </v-btn>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'list-flights',
  props: ['flights', 'address', 'lat', 'lng', 'allowGeolocation'],
  computed: {
    ...mapGetters(['loading'])
  },
  filters: {
    // rouund to two decimals
    twoDecimals: function (number) {
      return Math.round(number * 100) / 100
    }
  },
  methods: {
    reloadPage () {
      window.document.location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  position relative
  text-align: left;
  display block
  border 1px solid grey
  padding 5px
  padding-left 20px
  margin 0 10px

a
  color #333
  margin-left 2rem

.plane-alt
  margin-left 2rem

.plane-icon {
  transform rotate(90deg)
}

.rotate180
  display inline-block
  color: lighten(red, 40%) !important
  transform: rotate(270deg)

.flight-number
  text-align left !important

</style>
