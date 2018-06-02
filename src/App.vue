<template>
  <v-app>
    <v-layout mb-5>
      <v-flex sm12>
        <!-- HEADER -->
        <v-card color="blue lighten-2" flat tile dark>
          <v-toolbar prominent extended color="blue">
            <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
            <v-spacer></v-spacer>
            <v-toolbar-title class="app-title">Air Traffic App v1.1</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>

        <!-- LOGO -->
        <v-avatar :size="100" class="site-logo">
           <img src="/logo.png" alt="John">
         </v-avatar>
      </v-flex>
    </v-layout>

    <!-- CONTAINER -->
    <v-container fluid>
      <v-container>
        <v-layout>
          <v-flex sm12 lg10 offset-lg1>
            <v-layout>

            <!-- SIDEBAR -->
            <v-flex hidden-sm-and-down md4 class="mt-3">
              <v-navigation-drawer v-model="drawer" stateless hide-overlay>
                <v-toolbar flat class="transparent">

                  <!-- AVATAR -->
                  <v-list class="pa-0 mt-3">
                    <v-list-tile avatar>
                      <v-list-tile-avatar>
                      <img src="https://media.licdn.com/dms/image/C4D03AQEsj6a2s2GWzg/profile-displayphoto-shrink_100_100/0?e=1533168000&v=beta&t=o1ZSAvAI_CzqCDRMUMmOPdaWbGmR8kkFjJ8RiH3rrug" >
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Zeljko Olah</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-toolbar>

              <!-- SIDEBAR ITEMS -->
              <v-list class="pt-4" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="(item, index) in items" :key="item.title" class="mt-3">
                  <!-- ICON -->
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <!-- TITLE -->
                    <v-list-tile-title v-if="index > 0">{{ item.title }}</v-list-tile-title>
                    <v-list-tile-title v-else>{{ getAddress }}</v-list-tile-title>
                    <!-- SUBTITLE -->
                    <v-list-tile-sub-title><a :href="item.link">{{ item.subtitle }}</a></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

              </v-navigation-drawer>
            </v-flex>

            <!-- MAIN CONTENT -->
            <v-flex xs12 md8>
              <v-content>
                <v-container fluid>
                  <router-view></router-view>
                </v-container>
              </v-content>
            </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>

    <!-- FOOTER -->
    <v-footer app>
      <v-spacer></v-spacer>
      MADE WITH
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      AND VUE
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      drawer: true,
      // sidebar items
      items: [
        {
          title: 'My Location',
          icon: 'location_on',
          subtitle: '',
          link: ''
        },
        {
          title: 'Home',
          icon: 'home',
          subtitle: 'Quantox Technologies ltd.',
          link: 'https://quantox.com/'
        }
      ],
      mini: true,
      right: null
    }
  },
  computed: {
    // get address
    ...mapGetters(['getAddress'])
  }
}
</script>

<style lang="stylus">
// main.styl
@import '~vuetify/src/stylus/main' // Ensure you are using stylus-loader
</style>

<style lang="stylus">

body
  font-family 'Roboto', sans-serif

aside
  height auto !important
#app
  font-family 'Roboto', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

.app-title
  font-size 2rem !important

.site-logo
  position absolute
  top 4rem
  margin-left -3rem
  @media screen and (min-width: 960px)
    margin-left -5rem
  box-shadow 2px 2px 10px rgba(0,0,0, 0.5)
</style>
