import React, {useEffect} from 'react'
import {Provider, useDispatch} from 'react-redux'
import {Dispatch, store} from './src/store/store'
import {fetchConfiguration} from './src/store/configuration/configuration.thunks'
import {fetchFavorites} from './src/store/entities/favorites/favorites.thunks'
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native'
import TabNavigator from './src/navigation/TabNavigator'

export const App = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(fetchConfiguration)
    dispatch(fetchFavorites())
  }, [dispatch])

  // console.log('App RENDER', {})
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="dark-content"
          animated={true}
          translucent={true}
          backgroundColor="transparent"
        />
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const RootApp = () => {
  return (
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    // </React.StrictMode>
  )
}
export default RootApp
/*
       Лого                  поиск

[Популярные]
[Топ рейтинг]
[Самые новые]
[Жанры]



[Главная    Обзор    Избранное]
 */
