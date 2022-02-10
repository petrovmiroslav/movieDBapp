import {Animated, ListRenderItem} from 'react-native'
import React, {useCallback, useMemo, useState} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import FavoriteItem from './components/FavoriteItem/FavoriteItem'
import {selectFavoriteIdsListByType} from '../../selectors/favorites.selectors'
import {styles} from './FavoritesScreen.styles'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../navigation/navigation.types'
import {useScreenScrollY} from '../../hooks/useScreenScrollY'
import {SetHeaderHeightContext} from '../../hooks/useHeaderHeight'
import Header from '../../components/Header/Header'
import {useImageUri} from '../../hooks/useImageUri'
import {IMAGE_TYPES} from '../../store/entities/images/images.types'

const screenOptions: NativeStackNavigationOptions = {
  headerBackVisible: false,
}

const FavoritesScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, SCREENS.MAIN>>()
  const route = useRoute<RouteProp<StackParamList, SCREENS.MAIN>>()

  const [headerHeight, setHeaderHeight] = useState(0)
  const {screenScrollYAnimValue, onScreenScrollHandler} = useScreenScrollY()

  const favoritesIdsIdsList = useSelector(
    selectFavoriteIdsListByType(),
    shallowEqual,
  )

  const {baseUrl, sizePart} = useImageUri({
    imageType: IMAGE_TYPES.POSTERS,
  })

  const renderFavoriteItem = useCallback<
    ListRenderItem<NonNullable<typeof favoritesIdsIdsList>[number]>
  >(
    ({item}) => (
      <FavoriteItem
        key={item}
        favoriteId={item}
        baseUrl={baseUrl}
        sizePart={sizePart}
      />
    ),
    [baseUrl, sizePart],
  )

  const headerOpacityStyle = useMemo(
    () => ({
      opacity: screenScrollYAnimValue.interpolate({
        inputRange: [0, headerHeight * 0.5],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    }),
    [headerHeight, screenScrollYAnimValue],
  )

  const contentContainerStyle = useMemo(
    () => [
      styles.container,
      {paddingTop: styles.container.paddingTop + headerHeight},
    ],
    [headerHeight],
  )

  // console.log('FavoritesScreen RENDER')
  return (
    <>
      <SetHeaderHeightContext.Provider value={setHeaderHeight}>
        <Header
          navigation={navigation}
          route={route}
          options={screenOptions}
          shadowStyle={headerOpacityStyle}
        />
      </SetHeaderHeightContext.Provider>
      <Animated.FlatList
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={favoritesIdsIdsList}
        renderItem={renderFavoriteItem}
        onScroll={onScreenScrollHandler}
      />
    </>
  )
}
export default React.memo(FavoritesScreen)
