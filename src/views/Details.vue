<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>

        <!-- CARD -->
        <v-card v-if="current" color="white" class="black--text">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs7>
                <div style="text-align: left;">

                  <!-- MANUFACTURER -->
                  <div class="headline"><span class="details-info">Manufacturer:</span>{{ current.Man }}</div>

                  <!-- MODEL -->
                  <div>
                    <span class="details-info">Model:</span>{{ current.Mdl }}
                  </div>

                  <!-- FROM -->
                  <div v-if="current.From">
                    <span class="details-info">From:</span>
                    <span class="details-results">{{ current.From }}</span>
                  </div>
                  <div v-else>
                    <span class="details-info">From:</span>No data
                  </div>

                  <!-- TO -->
                  <div v-if="current.To">
                    <span class="details-info">To:</span>{{ current.To }}
                  </div>
                  <div v-else>
                    <span class="details-info">To:</span> No data
                  </div>
                </div>

                <!-- BACK -->
                <v-btn block class="mt-4" left color="blue" dark @click="$router.go(-1)">
                  Back
                </v-btn>
              </v-flex>

              <!-- COMPANY LOGO -->
              <v-flex xs5>
                <v-card-media
                  :src="operatorName(current.Op)"
                  height="125px"
                  contain
                ></v-card-media>

                <!-- OPERATOR NAME -->
                <div v-if="current.Op" style="margin-top: 10px;">
                  {{ current.Op }}
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

        <!-- GO BACK IF PAGE REFRESH ACCIDENTALY -->
        <v-card v-else>
          <h2 mb-3>Please go back and try again!</h2>
          <v-btn color="blue" dark @click="$router.push({ name: 'home' })">
            Home
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// list operators and their webisites
import { airlineWebsites } from '../utilities/airline-websites'

export default {
  name: 'flight-details',
  computed: {
    ...mapGetters({ current: 'getCurrentFlight' })
  },
  methods: {
    ...mapActions(['getFlightDetails']),
    // get logo
    operatorName (operator) {
      console.log('Operater:::', operator)
      let src

      console.log(Object.keys(airlineWebsites).includes(operator))
      if (Object.keys(airlineWebsites).includes(operator)) {
        src = `https://logo.clearbit.com/${airlineWebsites[operator]}`
      } else {
        src = 'http://www.truemovers.in/images/no-logo.png'
      }

      return src
    }
  },
  mounted () {
    console.log(this.$route.params)
    // get flight from store
    this.getFlightDetails(this.$route.params)
  }
}
</script>

<style lang="stylus">
  .details-info
    display inline-block
    width 120px
    @media screen and (max-width: 960px)
      width 80px
    margin-top 1rem
    padding-right 1rem
    color: #999
    font-size 0.8rem
</style>
