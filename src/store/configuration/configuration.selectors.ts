import {State} from '../store'
import {ConfigurationImagesState} from './configuration.types'

const selectConfigurationState = (state: State) => state.configuration

/** returns ConfigurationImagesState value by key */
export const selectValueOfConfigurationImagesState =
  (key: keyof ConfigurationImagesState) => (state: State) =>
    selectConfigurationState(state).images?.[key]
