import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = code => {
  token = `bearer ${code}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async payload => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, payload, config)
  return response.data
}

const blogService = { getAll, create, setToken }

export default blogService