import {PreloadedState} from '@reduxjs/toolkit'
import {setupStore, State, Store} from '../store/store'
import React, {PropsWithChildren} from 'react'
import {Provider} from 'react-redux'
import {render, RenderOptions} from '@testing-library/react-native'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<State>
  store?: Store
}

export function renderWithStoreProvider(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}
