import axios from 'axios'

let http = axios.create({
  baseURL: `https://api.caresome.com`
})

export default http
