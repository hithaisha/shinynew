import axios from 'axios'
//
const BASE_URL = 'http://localhost:5148'
// const BASE_URL = 'http://morr.eastus.cloudapp.azure.com:8084'

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

const createUser = (payload) => {
  const formattedReq = {
    userDetails: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
    },
  }

  const config = {
    headers: {
      Authorization: `Bearer BEARER_TOKEN_HERE`,
    },
  }

  return axios
    .post(BASE_URL + `/api/Client/saveCustomer`, formattedReq, config)
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

export { login, createUser, getUsers }
