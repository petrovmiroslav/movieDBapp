import {State} from '../store/store'
import createCachedSelector from 're-reselect'
import {defaultCachedSelectorKeySelector} from '../utils/selectors'
import {ConfigurationImagesState} from '../store/configuration/configuration.types'

const selectConfigurationState = (state: State) => state.configuration

/** Возвращает по имени ключа значение ConfigurationImagesState*/
export const valueOfConfigurationImagesStateSelector = (() => {
  const selector = createCachedSelector(
    [
      selectConfigurationState,
      (_S: State, key: keyof ConfigurationImagesState) => {
        // console.log('selectValueOfConfigurationImagesState IN', {key})
        return key
      },
    ],
    (configurationState, key) => {
      // console.log('selectValueOfConfigurationImagesState OUT', {key})
      return configurationState.images?.[key]
    },
  )(defaultCachedSelectorKeySelector)

  return (state: State, key: keyof ConfigurationImagesState) =>
    selector(state, key)
})()
export const selectValueOfConfigurationImagesState =
  (key: keyof ConfigurationImagesState) => (state: State) =>
    valueOfConfigurationImagesStateSelector(state, key)
