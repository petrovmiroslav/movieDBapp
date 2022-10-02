import React, {useCallback, useMemo} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from '../../store/store'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../navigation/navigation.types'
import {useImageUri} from '../../hooks/useImageUri'
import {IMAGE_TYPES} from '../../store/entities/images/images.types'
import {Animated, ListRenderItem} from 'react-native'
import {discoverMovie} from '../../store/entities/movies/movies.thunks'
import {getGenresParam} from '../../api/movies/movies.mappers'
import {DiscoverMovieApiParams} from '../../api/movies/movies.types'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import GenreMovieItem from './components/GenreMovieItem/GenreMovieItem'
import {selectGenreById} from '../../store/entities/genres/genres.selectors'
import {styles} from './GenreMoviesScreen.styles'
import {capitalizeFirstLetter} from '../../utils/strings'
import {useDefaultScreenHeaderAnimation} from '../../hooks/useDefaultScreenHeaderAnimation'
import {ON_END_REACHED_THRESHOLD_DEFAULT} from '../../constants/virtualizedLists'
import {
  useFetchDataList,
  UseFetchDataListParams,
} from '../../hooks/useFetchData'
import {EntitiesIds} from '../../store/entities/entities.types'
import {getEntityId} from '../../utils/store'
import {keyExtractorForId} from '../../utils/virtualizedLists'

const GenreMoviesScreen = () => {
  const dispatch = useDispatch<Dispatch>()
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackParamList, SCREENS.GENRE_MOVIES>
    >()
  const route = useRoute<RouteProp<StackParamList, SCREENS.GENRE_MOVIES>>()
  const {genreId} = route.params
  const {
    screenHeaderHeight,
    setScreenHeaderHeight,
    screenHeaderShadowStyle,
    onScreenScrollHandler,
  } = useDefaultScreenHeaderAnimation()

  const {name} = useSelector(selectGenreById(genreId), shallowEqual) ?? {}

  const discoverMoviesParams = useMemo<DiscoverMovieApiParams>(
    () => ({with_genres: getGenresParam([genreId])}),
    [genreId],
  )

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      title: name && capitalizeFirstLetter(name),
    }),
    [name],
  )

  const contentContainerStyle = useMemo(
    () => [
      styles.container,
      {paddingTop: styles.container.paddingTop + screenHeaderHeight},
    ],
    [screenHeaderHeight],
  )

  const {baseUrl, sizePart} = useImageUri({
    imageType: IMAGE_TYPES.POSTERS,
  })

  const renderFavoriteItem = useCallback<
    ListRenderItem<NonNullable<typeof discoverMoviesIdsList>[number]>
  >(
    ({item}) => (
      <GenreMovieItem
        key={item}
        movieId={item}
        baseUrl={baseUrl}
        sizePart={sizePart}
      />
    ),
    [baseUrl, sizePart],
  )

  const fetchDiscoverMovies = useCallback<
    UseFetchDataListParams<EntitiesIds['movie']>['fetchDataListFunc']
  >(
    async page => {
      const res = await dispatch(discoverMovie({...discoverMoviesParams, page}))
      const movies = res && 'entities' in res ? res.entities.movies : undefined
      if (!movies) return
      return movies.map(getEntityId)
    },
    [dispatch, discoverMoviesParams],
  )

  const {dataList: discoverMoviesIdsList, loadMoreData} = useFetchDataList({
    fetchDataListFunc: fetchDiscoverMovies,
  })

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
        data={discoverMoviesIdsList}
        renderItem={renderFavoriteItem}
        keyExtractor={keyExtractorForId}
        onScroll={onScreenScrollHandler}
        onEndReached={loadMoreData}
        onEndReachedThreshold={ON_END_REACHED_THRESHOLD_DEFAULT}
      />
    </>
  )
}
export default React.memo(GenreMoviesScreen)
