import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Dispatch} from './src/store/store'
import {fetchConfiguration} from './src/store/configuration/configuration.thunks'
import {fetchFavorites} from './src/store/entities/favorites/favorites.thunks'
import TabNavigator from './src/navigation/TabNavigator'
import {StatusBar} from 'react-native'

const App = () => {
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(fetchConfiguration)
    dispatch(fetchFavorites())
  }, [dispatch])

  // console.log('App RENDER', {})
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        translucent={true}
        backgroundColor="transparent"
      />
      <TabNavigator />
    </>
  )
}

export default App
/*
       Лого                  поиск

[Популярные]
[Топ рейтинг]
[Самые новые]
[Жанры]



[Главная    Обзор    Избранное]
 */
