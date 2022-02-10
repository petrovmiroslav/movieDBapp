import {Dispatch} from '../store/store'
import {ResponseError} from '../api/api'
import {fetchConfigurationApi} from '../api/configuration/configuration.requests'
import {loadConfigurationSuccess} from '../store/configuration/configuration.slice'

export const fetchConfiguration = async (dispatch: Dispatch) => {
  try {
    const res = await fetchConfigurationApi()
    dispatch(loadConfigurationSuccess(res))
  } catch (e) {
    const responseError = e as ResponseError
    responseError.error = true
    console.error('Error: fetchConfigurationApi', {responseError})
    return responseError
  }
}
