import {appAxiosInstance} from '../api'
import {ConfigurationDto} from './configuration.types'
import {ConfigurationState} from '../../store/configuration/configuration.types'
import {configurationDtoMapper} from './configuration.mappers'

export const fetchConfigurationApi = (): Promise<ConfigurationState> =>
  appAxiosInstance
    .get<ConfigurationDto>('/configuration')
    .then(res => res.data)
    .then(body => configurationDtoMapper(body))
