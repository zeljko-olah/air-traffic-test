<template lang="pug">
  .details(v-if="current")
    h1 Show flight details.
    router-link(:to={ name: 'home' }) Back
    //- MODEL - MANUFACTURER
    p Manufacturer/Model: {{ current.Man }} ::: {{ current.Mdl }}
    //- FROM/TO
    p(v-if="current.From") From/To: {{ current.From }} ::: {{ current.To }}
    p(v-else) From/To: Destination not available.
    //- OPERATER - AIRLINE
    p Operater: {{ current.Op }} ::: {{ current.OpIcao }}
    //- LOGO
    img(:src="operatorName(current.Op)")
    .card
  //- RETURN USER BACK IF NO DATA
  .no-data(v-else) Please go back.
    br
    router-link(:to={ name: 'home' }) Home
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { airlineWebsites } from '../utilities/airline-websites'

  export default {
    name: 'flight-details',
    computed: {
      ...mapGetters({ current: 'getCurrentFlight' })
    },
    methods: {
      ...mapActions(['getFlightDetails']),
      operatorName (operator) {
        console.log('Operater:::', operator)
        let src

        console.log(Object.keys(airlineWebsites).includes(operator))
        if (Object.keys(airlineWebsites).includes(operator)) {
          src = `https://logo.clearbit.com/${ airlineWebsites[operator] }`
        } else {
          src = 'https://logo.clearbit.com/air-serbia.com'
        }

        return src
      }
    },
    mounted () {
      console.log(this.$route.params)
      this.getFlightDetails(this.$route.params)
    }
  }
</script>
