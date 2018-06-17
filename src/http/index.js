import axios from 'axios'

let http = axios.create({
  baseURL: `/api`
  // development base url
  // baseURL: `http://localhost:3000/api`
})

export default http
