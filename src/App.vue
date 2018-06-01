<template lang="pug">
  #app
    #nav
      router-link(to="/") Home
      h1 Welcome to Air Traffic
      hr
    router-view
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus">
body{
  // background -webkit-linear-gradient(left, #25c481, #25b7c4)
  // background linear-gradient(to right, #25c481, #25b7c4)
  // font-family: 'Roboto', sans-serif
}
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
