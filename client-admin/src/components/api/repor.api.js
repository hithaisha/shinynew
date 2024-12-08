import axios from 'axios'
import store from '../../store'

const BASE_URL = 'http://localhost:5148'


const getSalesVsPurchaseData = () => {

  const config = {
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
  }
  let url = '/api/Report/getSalesVsPurchaseData'

  return axios
    .get(BASE_URL + url, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Request failed: ' + error.message)
    })
}

const getWeeklySalesAndPurchases = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
  }
  let url = '/api/Report/getWeeklySalesAndPurchases'

  return axios
    .get(BASE_URL + url, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Request failed: ' + error.message)
    })
}

export { getSalesVsPurchaseData, getWeeklySalesAndPurchases }
