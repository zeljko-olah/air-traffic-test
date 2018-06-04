import axios from 'axios'

let http = axios.create({
  baseURL: `/api`
})

export default http
