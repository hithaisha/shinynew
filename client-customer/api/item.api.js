import axios from 'axios'
import store from '../pages/store/store'

const BASE_URL = 'http://localhost:5148'
// const BASE_URL = 'http://morr.eastus.cloudapp.azure.com:8084'

const getItems = (payload) => {
  const formattedReq = {
    searchText: payload.searchText,
    categoryId: payload.categoryId,
  }

  const config = {
    headers: {
      Authorization: store.getState().auth.token
        ? `Bearer ${store.getState().auth.token}`
        : null,
    },
  }
  let url = '/api/Client/getProductsByFilter'

  return axios
    .post(BASE_URL + url, formattedReq, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Request failed: ' + error.message)
    })
}

const getProductById = (id) => {
  const config = {
    headers: {
      Authorization: store.getState().auth.token
        ? `Bearer ${store.getState().auth.token}`
        : null,
    },
  }
  let url = `/api/Product/getProductById/${id}`

  return axios
    .get(BASE_URL + url, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Request failed: ' + error.message)
    })
}

export { getItems, getProductById }
