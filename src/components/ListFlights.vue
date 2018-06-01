<template lang="pug">
  div
    ul(v-if="flights")
      li(
        v-for="flight in flights"
        :key="flight.id"
        )
          router-link(:to="{name: 'details', params: {id: flight.Id}}")
            span.plane-icon(v-if="flight.Brng < 180") &#9992;
            span.plane-icon(v-else :class="{ rotate180: flight.Brng > 180 }") &#9992;
            span.plane-alt {{ flight.Alt }} ft
            span id: {{ flight.Id }}
            span(v-if="flight.Op") : Operater: {{ flight.Op }}
            span(v-else) : --- Unknown --- 

</template>

<script>
export default {
  name: 'list-flights',
  props: {
    flights: Array
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
  position absolute
  color blue
}

.rotate180
  display inline-block
  color: red
  transform: rotate(180deg)

</style>
