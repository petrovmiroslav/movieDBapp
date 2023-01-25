import axios from 'axios'
import {ENV} from '../constants/env'
import {BASE_URL, LANGUAGES} from '../constants/api'
import {setupMockingServer} from '../utils/setupMockingServer'
import {fetchGenresApiHandler} from './genres/__mock__/genres.mockHandlers'

export const mockServer = setupMockingServer({
  enabled: ENV.MOCK_ENABLE,
  handlers: [fetchGenresApiHandler],
})

export const appAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer ' + ENV.V4_API_KEY,
    'Content-Type': 'application/json;charset=utf-8',
  },
})

appAxiosInstance.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {}
  }
  if (!config.params.language) {
    config.params.language = LANGUAGES.EN
  }

  return config
})
