import axios from "axios"

const baseURL = "/api/auth/login"

const login = async payload => {
  const res = await axios.post(baseURL, payload)
  return res.data
}

const auth = { login }

export default auth