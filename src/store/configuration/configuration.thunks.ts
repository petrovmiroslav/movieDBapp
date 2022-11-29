import {Dispatch} from '../store'
import {fetchConfigurationApi} from '../../api/configuration/configuration.requests'
import {loadConfigurationSuccess} from './configuration.slice'
import {withResponseErrorCatcher} from '../../utils/errors'

export const fetchConfiguration = withResponseErrorCatcher(
  async (dispatch: Dispatch) => {
    const res = await fetchConfigurationApi()
    dispatch(loadConfigurationSuccess(res))
  },
  'fetchConfigurationApi',
)
