import {combineReducers, configureStore, PreloadedState} from '@reduxjs/toolkit'
import {entitiesSlice} from './entities/entities.slice'
import {configurationSlice} from './configuration/configuration.slice'
import createDebugger from 'redux-flipper'
import {ENV} from '../constants/env'

const reducer = combineReducers({
  [entitiesSlice.name]: entitiesSlice.reducer,
  [configurationSlice.name]: configurationSlice.reducer,
})

export const setupStore = (
  preloadedState?: PreloadedState<ReturnType<typeof reducer>>,
) => {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      __DEV__ && !ENV.IS_TEST_RUNNING
        ? getDefaultMiddleware().concat(createDebugger())
        : getDefaultMiddleware(),
    preloadedState,
  })
}

export const store = setupStore()

export type Store = typeof store
export type Dispatch = Store['dispatch']
export type GetState = Store['getState']
export type State = ReturnType<GetState>
