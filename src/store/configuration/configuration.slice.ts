import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ConfigurationState} from './configuration.types'

export const DEFAULT_IMAGE_SIZE = 'original'

const initialConfigurationState: ConfigurationState = {}

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState: initialConfigurationState,
  reducers: {
    loadConfigurationSuccess(state, action: PayloadAction<ConfigurationState>) {
      return action.payload
    },
  },
})

export const {loadConfigurationSuccess} = configurationSlice.actions
