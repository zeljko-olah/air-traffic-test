// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'

// persist state on page refresh
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

// configure Vuex Persist
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  // persist when user allow Geolocation
  reducer: state => ({
    allowGeolocation: state.allowGeolocation,
    lat: state.lat,
    lng: state.lng
  })
})

// Store
export default new Vuex.Store({

  // plugins
  // plugins: [vuexLocalStorage.plugin],

  // state
  state: {
    lat: '',
    lng: '',
    allowGeolocation: false
  },

  // mutations
  mutations: {
    setCoordinates (state, payload) {
      state.lat = payload.lat
      state.lng = payload.lng
    },
    allowGeolocation (state, payload) {
      state.allowGeolocation = payload
    }
  },

  // actions
  actions: {
    fetchUserLocation ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        try {
          navigator.geolocation.getCurrentPosition(function (position) {
            console.log('Fetching Airplanes for this location inside store', position.coords.latitude, position.coords.longitude)
            commit('allowGeolocation', true)
            commit('setCoordinates', {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
          })
        } catch (e) {
          reject(e)
        }
      })
    },
    fetchFlights ({ commit }, { lat, lng }) {
      console.log('FETCHING FLIGHTS:::', lat, lng)
    }
  },

  // getters
  getters: {
    allowGeolocation (state) {
      return state.allowGeolocation
    },
    getCoordinates (state) {
      return {
        lat: state.lat,
        lng: state.lng
      }
    }
  }
})
