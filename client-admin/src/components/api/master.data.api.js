import axios from 'axios'
import store from '../../store'

const BASE_URL = 'http://localhost:5148'
// const BASE_URL = 'https://morrapi20231205153355.azurewebsites.net'

const getCategories = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
  }
  let url = '/api/MasterData/getCategoryMasterData'

  return axios
    .get(BASE_URL + url, config)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw new Error('Request failed: ' + error.message)
    })
}

export { getCategories }
