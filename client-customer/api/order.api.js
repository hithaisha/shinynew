import axios from 'axios'
import store from '../pages/store/store'

const BASE_URL = 'http://localhost:5148'
// const BASE_URL = 'http://morr.eastus.cloudapp.azure.com:8084'

const createOrder = (payload) => {
  const formattedReq = {
    invoiceNumber: payload.invoiceNumber,
    orderId: payload.orderId,
    totalPrice: payload.totalPrice,
    orderItems: payload.orderItems,
  }

  const config = {
    headers: {
      Authorization: store.getState().auth.token
        ? `Bearer ${store.getState().auth.token}`
        : null,
    },
  }

  return axios
    .post(BASE_URL + `/api/Order/saveOrder`, formattedReq, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Request failed: ' + error.message)
    })
}
export { createOrder }
