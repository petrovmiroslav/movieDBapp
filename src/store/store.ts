import {configureStore} from '@reduxjs/toolkit'
import {entitiesSlice} from './entities/entities.slice'
import {paginationSlice} from './pagination/pagination.slice'
import {configurationSlice} from './configuration/configuration.slice'
import createDebugger from 'redux-flipper'

export type Dispatch = typeof store.dispatch
export type State = ReturnType<typeof store.getState>
export type GetState = typeof store['getState']

export const store = configureStore({
  reducer: {
    [entitiesSlice.name]: entitiesSlice.reducer,
    [paginationSlice.name]: paginationSlice.reducer,
    [configurationSlice.name]: configurationSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    __DEV__
      ? getDefaultMiddleware().concat(createDebugger())
      : getDefaultMiddleware(),
})
