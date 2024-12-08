import axios from 'axios'

const BASE_URL = 'http://localhost:5148'
// const BASE_URL = 'https://morrapi20231205153355.azurewebsites.net'

const login = (payload) => {
  const formattedReq = {
    userName: payload.userName,
    password: payload.password,
  }
  return axios
    .post(BASE_URL + `/api/Authentication/login`, formattedReq)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Login failed: ' + error.message)
    })
}

const postReq = (url, payload) => {
  const formattedReq = {
    userName: payload.userName,
    password: payload.password,
  }

  const config = {
    headers: {
      Authorization: `Bearer BEARER_TOKEN_HERE`,
    },
  }

  return axios
    .post(BASE_URL + url, formattedReq, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Request failed: ' + error.message)
    })
}

const getUsers = (url, queryParams) => {
  return axios
    .get(BASE_URL + url, { params: queryParams })
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Get users failed: ' + error.message)
    })
}

export { login, postReq, getUsers }
