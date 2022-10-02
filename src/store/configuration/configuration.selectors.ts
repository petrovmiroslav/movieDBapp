import {State} from '../store'
import {ConfigurationImagesState} from './configuration.types'

const selectConfigurationState = (state: State) => state.configuration

/** Возвращает по имени ключа значение ConfigurationImagesState*/
export const selectValueOfConfigurationImagesState =
  (key: keyof ConfigurationImagesState) => (state: State) =>
    selectConfigurationState(state).images?.[key]
