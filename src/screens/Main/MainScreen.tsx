import React, {useCallback, useMemo} from 'react'
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
} from '../../store/entities/movies/movies.thunks'
import ChartMoviesSlider, {
  ChartMoviesSliderProps,
} from './components/ChartMoviesSlider/ChartMoviesSlider'
import {Animated} from 'react-native'
import {styles} from './MainScreen.styles'
import GenresSlider, {
  GenresSliderProps,
} from './components/GenresSlider/GenresSlider'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../navigation/navigation.types'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import {useIsTheFirstRender} from '../../hooks/useIsTheFirstRender'
import {useDefaultScreenHeaderAnimation} from '../../hooks/useDefaultScreenHeaderAnimation'
import {
  POPULAR_MOVIE_CARD_TEST_ID,
  POPULAR_MOVIE_CARD_TITLE_TEST_ID,
} from '../../constants/e2e'

const screenOptions: NativeStackNavigationOptions = {
  headerBackVisible: false,
}

const MainScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, SCREENS.MAIN>>()
  const route = useRoute<RouteProp<StackParamList, SCREENS.MAIN>>()
  const isTheFirstRender = useIsTheFirstRender()
  const {
    screenHeaderHeight,
    setScreenHeaderHeight,
    screenHeaderShadowStyle,
    onScreenScrollHandler,
  } = useDefaultScreenHeaderAnimation()

  const onChartMovieButtonPress = useCallback<
    ChartMoviesSliderProps['onMovieButtonPress']
  >(movieId => navigation.push(SCREENS.MOVIE, {movieId}), [navigation])

  const onGenreButtonPress = useCallback<GenresSliderProps['onButtonPress']>(
    genreId => navigation.push(SCREENS.GENRE_MOVIES, {genreId}),
    [navigation],
  )

  const contentContainerStyle = useMemo(
    () => [styles.container, {paddingTop: screenHeaderHeight}],
    [screenHeaderHeight],
  )

  // console.log('MainScreen RENDER', {})
  return (
    <>
      <ScreenHeader
        navigation={navigation}
        route={route}
        options={screenOptions}
        headerLayoutSetHeaderHeight={setScreenHeaderHeight}
        headerLayoutShadowStyle={screenHeaderShadowStyle}
      />

      {!isTheFirstRender && (
        <Animated.ScrollView
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          onScroll={onScreenScrollHandler}
          scrollEventThrottle={1}>
          <ChartMoviesSlider
            headerText="Popular"
            onMovieButtonPress={onChartMovieButtonPress}
            apiFunc={fetchPopularMovies}
            movieCardTestID={POPULAR_MOVIE_CARD_TEST_ID}
            movieTitleTestID={POPULAR_MOVIE_CARD_TITLE_TEST_ID}
          />
          <ChartMoviesSlider
            headerText="Top rating"
            apiFunc={fetchTopRatedMovies}
            onMovieButtonPress={onChartMovieButtonPress}
          />

          <GenresSlider onButtonPress={onGenreButtonPress} />
        </Animated.ScrollView>
      )}
    </>
  )
}
export default React.memo(MainScreen)
