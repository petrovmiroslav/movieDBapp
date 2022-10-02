import React, {useCallback, useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from '../../store/store'
import {selectMoviePrimitiveValuesById} from '../../store/entities/movies/movies.selectors'
import {IMAGE_TYPES} from '../../store/entities/images/images.types'
import {Animated, Text, View} from 'react-native'
import {
  fetchMovie,
  fetchRecommendationsMovies,
  fetchSimilarMovies,
} from '../../store/entities/movies/movies.thunks'
import {APPEND_TO_RESPONSE} from '../../api/movies/movies.types'
import {styles} from './MovieScreen.styles'
import Hero from './components/Hero/Hero'
import MovieImagesSlider from './components/MovieImagesSlider/MovieImagesSlider'
import RecommendationsMoviesSlider, {
  SuggestedMoviesSliderProps,
} from './components/SuggestedMoviesSlider/SuggestedMoviesSlider'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {SCREENS, StackParamList} from '../../navigation/navigation.types'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useScreenScrollY} from '../../hooks/useScreenScrollY'
import {useIsTheFirstRender} from '../../hooks/useIsTheFirstRender'
import ScreenHeaderSection from './components/ScreenHeaderSection/ScreenHeaderSection'

const MovieScreen = () => {
  const dispatch = useDispatch<Dispatch>()
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, SCREENS.MOVIE>>()
  const route = useRoute<RouteProp<StackParamList, SCREENS.MOVIE>>()
  const {movieId} = route.params
  const isTheFirstRender = useIsTheFirstRender()

  const {screenScrollYAnimValue, onScreenScrollHandler} = useScreenScrollY()

  const {title, overview, tagline} =
    useSelector(selectMoviePrimitiveValuesById(movieId), shallowEqual) ?? {}

  const onSuggestedMovieButtonPress = useCallback<
    SuggestedMoviesSliderProps['onMovieButtonPress']
  >(movieId => navigation.push(SCREENS.MOVIE, {movieId}), [navigation])

  useEffect(() => {
    dispatch(
      fetchMovie({
        movieId: movieId,
        includes: [APPEND_TO_RESPONSE.images],
      }),
    )
  }, [dispatch, movieId])

  // console.log('MovieScreen RENDER', {})
  return (
    <>
      <ScreenHeaderSection
        title={title}
        screenScrollYAnimValue={screenScrollYAnimValue}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={onScreenScrollHandler}
        scrollEventThrottle={1}>
        <Hero
          movieId={movieId}
          screenScrollYAnimValue={screenScrollYAnimValue}
        />

        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheet__shadow} />
          <View style={styles.bottomSheet__handle} />

          <View style={styles.bottomSheet__content}>
            {!!tagline && <Text style={styles.tagline}>{tagline}</Text>}
            <Text style={styles.overview}>{overview}</Text>

            {!isTheFirstRender && (
              <>
                <MovieImagesSlider
                  movieId={movieId}
                  imageType={IMAGE_TYPES.POSTERS}
                />

                <MovieImagesSlider
                  movieId={movieId}
                  imageType={IMAGE_TYPES.BACKDROPS}
                />

                <RecommendationsMoviesSlider
                  movieId={movieId}
                  headerText="Рекомендации"
                  apiFunc={fetchRecommendationsMovies}
                  onMovieButtonPress={onSuggestedMovieButtonPress}
                />
                <RecommendationsMoviesSlider
                  movieId={movieId}
                  headerText="Похожие"
                  apiFunc={fetchSimilarMovies}
                  onMovieButtonPress={onSuggestedMovieButtonPress}
                />
              </>
            )}
          </View>
        </View>
      </Animated.ScrollView>
    </>
  )
}
export default React.memo(MovieScreen)
