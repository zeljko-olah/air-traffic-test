// Dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import http from './http'

Vue.use(Vuex)

// Store
export default new Vuex.Store({

  // state
  state: {
    lat: '',
    lng: '',
    allowGeolocation: false,
    flights: [],
    address: '',
    currentFlight: null,
    loading: false
  },

  // mutations
  mutations: {
    setCoordinates (state, payload) {
      state.lat = payload.lat
      state.lng = payload.lng
    },
    allowGeolocation (state, payload) {
      state.allowGeolocation = payload
    },
    storeFlights (state, payload) {
      state.flights = payload
    },
    setAddress (state, payload) {
      state.address = payload
    },
    setCurrentFlight (state, payload) {
      state.currentFlight = payload
    },
    loading (state, payload) {
      state.loading = payload
    }
  },

  // actions
  actions: {
    fetchUserLocation ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        try {
          commit('loading', true)
          navigator.geolocation.getCurrentPosition(function (position) {
            console.log('Fetching Airplanes for this location inside store', position.coords.latitude, position.coords.longitude)
            commit('allowGeolocation', true)
            commit('setCoordinates', {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
            dispatch('fetchUserAddress')
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
            console.log('POSITION:::', position)
          })
        } catch (e) {
          reject(e)
        }
      })
    },
    // fetch fligth for user's location
    fetchFlights ({ commit }, { lat, lng }) {
      console.log('FETCHING FLIGHTS FOR COORDINATES:::', lat, lng)
      commit('loading', true)
      http.get('/flights', {
        params: {
          lat,
          lng
        }
      })
        .then((res) => {
          commit('storeFlights', res.data.data.acList)
          commit('loading', false)
        })
        .catch((e) => {
          commit('loading', false)
          console.log(e)
        })
    },
    fetchUserAddress ({ commit, state }) {
      http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.lat},${state.lng}&key=AIzaSyD9FwzlR4IfBYsNhIhk3FYZxwbPz6lS0cU`)
        .then((res) => {
          console.log('FIND ADDRESS::: ', res.data.results[1].formatted_address)
          const address = res.data.results[1].formatted_address
          commit('setAddress', address)
        })
    },
    // get flight details
    getFlightDetails ({ commit, getters }, payload) {
      const allFlights = getters.getFlights.slice()
      const currentFlight = allFlights.filter((flight) => {
        return flight.Id === payload.id
      })
      commit('setCurrentFlight', ...currentFlight)
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
    },
    // get flights and sort them
    getFlights (state) {
      return state.flights
        .sort((a, b) => {
          return b.Alt - a.Alt
        })
    },
    getAddress (state) {
      return state.address
    },
    getCurrentFlight (state) {
      return state.currentFlight
    },
    loading (state) {
      return state.loading
    }
  }
})
