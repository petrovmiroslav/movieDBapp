/**
 * @format
 */

import {AppRegistry} from 'react-native'
import React from 'react'
import App from './App'
import {name as appName} from './app.json'
import {Provider} from 'react-redux'
import {store} from './src/store/store'
import {NavigationContainer} from '@react-navigation/native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const RootApp = () => {
  return (
    // <React.StrictMode>
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
    // </React.StrictMode>
  )
}

AppRegistry.registerComponent(appName, () => RootApp)
