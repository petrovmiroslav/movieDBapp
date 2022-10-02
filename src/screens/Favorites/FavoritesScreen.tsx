import {Animated, ListRenderItem} from 'react-native'
import React, {useCallback, useMemo} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import FavoriteItem from './components/FavoriteItem/FavoriteItem'
import {selectFavoriteIdsListByType} from '../../store/entities/favorites/favorites.selectors'
import {styles} from './FavoritesScreen.styles'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../navigation/navigation.types'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import {useImageUri} from '../../hooks/useImageUri'
import {IMAGE_TYPES} from '../../store/entities/images/images.types'
import {useDefaultScreenHeaderAnimation} from '../../hooks/useDefaultScreenHeaderAnimation'
import {keyExtractorForId} from '../../utils/virtualizedLists'

const screenOptions: NativeStackNavigationOptions = {
  headerBackVisible: false,
}

const FavoritesScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, SCREENS.MAIN>>()
  const route = useRoute<RouteProp<StackParamList, SCREENS.MAIN>>()
  const {
    screenHeaderHeight,
    setScreenHeaderHeight,
    screenHeaderShadowStyle,
    onScreenScrollHandler,
  } = useDefaultScreenHeaderAnimation()

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

  const contentContainerStyle = useMemo(
    () => [
      styles.container,
      {paddingTop: styles.container.paddingTop + screenHeaderHeight},
    ],
    [screenHeaderHeight],
  )

  // console.log('FavoritesScreen RENDER', {favoritesIdsIdsList})
  return (
    <>
      <ScreenHeader
        navigation={navigation}
        route={route}
        options={screenOptions}
        headerLayoutSetHeaderHeight={setScreenHeaderHeight}
        headerLayoutShadowStyle={screenHeaderShadowStyle}
      />

      <Animated.FlatList
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={favoritesIdsIdsList}
        keyExtractor={keyExtractorForId}
        renderItem={renderFavoriteItem}
        onScroll={onScreenScrollHandler}
      />
    </>
  )
}
export default React.memo(FavoritesScreen)
