import axios, {AxiosError} from 'axios'
import Config from 'react-native-config'

export type DefaultErrorDataType = {
  details?: string[]
  error?: string
  localized_error?: string
}
export type ResponseError<ErrorDataType = DefaultErrorDataType | string> =
  AxiosError<ErrorDataType> & {error: true}

export const BASE_URL = 'https://api.themoviedb.org/3'

export enum LANGUAGES {
  RU = 'ru',
  EN = 'en',
  NULL = 'null',
}
export const DEFAULT_INCLUDE_LANGUAGE_PARAM = `${LANGUAGES.RU},${LANGUAGES.EN},${LANGUAGES.NULL}`

export enum SORT_BY_PARAM {
  POPULARITY_ASC = 'popularity.asc',
  POPULARITY_DESC = 'popularity.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  VOTE_AVERAGE_DESC = 'vote_average.desc',
}

export const appAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer ' + Config.V4_API_KEY,
    'Content-Type': 'application/json;charset=utf-8',
  },
})

appAxiosInstance.interceptors.request.use(config => {
  if (!config.params) {
    config.params = {}
  }
  if (!config.params.language) {
    config.params.language = LANGUAGES.RU
  }

  return config
})
