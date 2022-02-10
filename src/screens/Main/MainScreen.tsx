import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
} from '../../thunks/movies.thunks'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from '../../store/store'
import {selectMovieIdsListByQueryKey} from '../../selectors/movies.selectors'
import {PAGINATION_QUERY_KEY_ROOTS} from '../../store/pagination/pagination.types'
import {getPaginationQueryKey} from '../../store/pagination/pagination.slice'
import ChartMoviesSlider, {
  ChartMoviesSliderProps,
} from './components/ChartMoviesSlider/ChartMoviesSlider'
import {Animated} from 'react-native'
import {styles} from './MainScreen.styles'
import {fetchGenres} from '../../thunks/genres.thunks'
import GenresSlider, {
  GenresSliderProps,
} from './components/GenresSlider/GenresSlider'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../navigation/navigation.types'
import Header from '../../components/Header/Header'
import {SetHeaderHeightContext} from '../../hooks/useHeaderHeight'
import {useScreenScrollY} from '../../hooks/useScreenScrollY'

const screenOptions: NativeStackNavigationOptions = {
  headerBackVisible: false,
}

const MainScreen = () => {
  const dispatch = useDispatch<Dispatch>()
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, SCREENS.MAIN>>()
  const route = useRoute<RouteProp<StackParamList, SCREENS.MAIN>>()

  const [headerHeight, setHeaderHeight] = useState(0)

  const {screenScrollYAnimValue, onScreenScrollHandler} = useScreenScrollY()

  const popularMoviesPaginationQueryKey = useMemo(
    () => getPaginationQueryKey(PAGINATION_QUERY_KEY_ROOTS.POPULAR),
    [],
  )

  const popularMoviesIdsList = useSelector(
    selectMovieIdsListByQueryKey(popularMoviesPaginationQueryKey),
    shallowEqual,
  )

  const topRatedMoviesPaginationQueryKey = useMemo(
    () => getPaginationQueryKey(PAGINATION_QUERY_KEY_ROOTS.TOP_RATED),
    [],
  )

  const topRatedMoviesIdsList = useSelector(
    selectMovieIdsListByQueryKey(topRatedMoviesPaginationQueryKey),
    shallowEqual,
  )

  const onChartMovieButtonPress = useCallback<
    ChartMoviesSliderProps['onMovieButtonPress']
  >(movieId => navigation.push(SCREENS.MOVIE, {movieId}), [navigation])

  const onGenreButtonPress = useCallback<GenresSliderProps['onButtonPress']>(
    genreId => navigation.push(SCREENS.GENRE_MOVIES, {genreId}),
    [navigation],
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
    () => [styles.container, {paddingTop: headerHeight}],
    [headerHeight],
  )

  useEffect(() => {
    dispatch(fetchPopularMovies({}))
    dispatch(fetchTopRatedMovies({}))
    dispatch(fetchGenres())
  }, [dispatch])

  // console.log('MainScreen RENDER', {})
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

      <Animated.ScrollView
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        onScroll={onScreenScrollHandler}
        scrollEventThrottle={1}>
        <ChartMoviesSlider
          headerText="Популярные"
          paginationQueryKey={popularMoviesPaginationQueryKey}
          movieIdsList={popularMoviesIdsList}
          apiFunc={fetchPopularMovies}
          onMovieButtonPress={onChartMovieButtonPress}
        />
        <ChartMoviesSlider
          headerText="Топ рейтинг"
          paginationQueryKey={topRatedMoviesPaginationQueryKey}
          movieIdsList={topRatedMoviesIdsList}
          apiFunc={fetchTopRatedMovies}
          onMovieButtonPress={onChartMovieButtonPress}
        />

        <GenresSlider onButtonPress={onGenreButtonPress} />
      </Animated.ScrollView>
    </>
  )
}
export default React.memo(MainScreen)
