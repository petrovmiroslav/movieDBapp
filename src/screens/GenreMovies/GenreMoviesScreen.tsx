import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from '../../store/store'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../navigation/navigation.types'
import {useScreenScrollY} from '../../hooks/useScreenScrollY'
import {useImageUri} from '../../hooks/useImageUri'
import {IMAGE_TYPES} from '../../store/entities/images/images.types'
import {Animated, FlatListProps, ListRenderItem} from 'react-native'
import {discoverMovie} from '../../thunks/movies.thunks'
import {getGenresParam} from '../../api/movies/movies.mappers'
import {getPaginationQueryKey} from '../../store/pagination/pagination.slice'
import {PAGINATION_QUERY_KEY_ROOTS} from '../../store/pagination/pagination.types'
import {selectMovieIdsListByQueryKey} from '../../selectors/movies.selectors'
import {DiscoverMovieApiParams} from '../../api/movies/movies.types'
import {SetHeaderHeightContext} from '../../hooks/useHeaderHeight'
import Header from '../../components/Header/Header'
import GenreMovieItem from './components/GenreMovieItem/GenreMovieItem'
import {selectPaginationQueryKeyDataPrimitiveValues} from '../../selectors/pagination.selectors'
import {selectGenreById} from '../../selectors/genres.selectors'
import {styles} from './GenreMoviesScreen.styles'
import {capitalizeFirstLetter} from '../../utils/strings'

const GenreMoviesScreen = () => {
  const dispatch = useDispatch<Dispatch>()
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackParamList, SCREENS.GENRE_MOVIES>
    >()
  const route = useRoute<RouteProp<StackParamList, SCREENS.GENRE_MOVIES>>()
  const {genreId} = route.params

  const {name} = useSelector(selectGenreById(genreId), shallowEqual) ?? {}

  const discoverMoviesParams = useMemo<DiscoverMovieApiParams>(
    () => ({with_genres: getGenresParam([genreId])}),
    [genreId],
  )

  const discoverMoviesPaginationQueryKey = useMemo(
    () =>
      getPaginationQueryKey(
        PAGINATION_QUERY_KEY_ROOTS.DISCOVER_MOVIES,
        discoverMoviesParams,
      ),
    [discoverMoviesParams],
  )

  const discoverMoviesIdsList = useSelector(
    selectMovieIdsListByQueryKey(discoverMoviesPaginationQueryKey),
    shallowEqual,
  )

  const [headerHeight, setHeaderHeight] = useState(0)
  const {screenScrollYAnimValue, onScreenScrollHandler} = useScreenScrollY()

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      title: name && capitalizeFirstLetter(name),
    }),
    [name],
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

  const {page = 1, totalPages = 1} =
    useSelector(
      selectPaginationQueryKeyDataPrimitiveValues(
        'movies',
        discoverMoviesPaginationQueryKey,
      ),
      shallowEqual,
    ) ?? {}

  const onEndReachedHandler = useCallback<
    NonNullable<
      FlatListProps<
        NonNullable<typeof discoverMoviesIdsList>[number]
      >['onEndReached']
    >
  >(() => {
    if (totalPages <= page) return
    dispatch(discoverMovie({page: page + 1, ...discoverMoviesParams}))
  }, [discoverMoviesParams, dispatch, page, totalPages])

  useEffect(() => {
    dispatch(discoverMovie(discoverMoviesParams))
  }, [discoverMoviesParams, dispatch, genreId])

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
        data={discoverMoviesIdsList}
        renderItem={renderFavoriteItem}
        onScroll={onScreenScrollHandler}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={1}
      />
    </>
  )
}
export default React.memo(GenreMoviesScreen)
