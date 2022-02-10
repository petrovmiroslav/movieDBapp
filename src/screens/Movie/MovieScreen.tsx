import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {Dispatch} from '../../store/store'
import {selectMoviePrimitiveValuesById} from '../../selectors/movies.selectors'
import {IMAGE_TYPES} from '../../store/entities/images/images.types'
import {Animated, StatusBar, StatusBarStyle, Text, View} from 'react-native'
import {PAGINATION_QUERY_KEY_ROOTS} from '../../store/pagination/pagination.types'
import {
  fetchMovie,
  fetchRecommendationsMovies,
  fetchSimilarMovies,
} from '../../thunks/movies.thunks'
import {APPEND_TO_RESPONSE} from '../../api/movies/movies.types'
import {styles} from './MovieScreen.styles'
import Hero, {HeroProps} from './components/Hero/Hero'
import MovieImagesSlider from './components/MovieImagesSlider/MovieImagesSlider'
import RecommendationsMoviesSlider, {
  SuggestedMoviesSliderProps,
} from './components/SuggestedMoviesSlider/SuggestedMoviesSlider'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {SCREENS, StackParamList} from '../../navigation/navigation.types'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import Header from '../../components/Header/Header'
import {HERO_IMAGE_VISIBLE_HEIGHT} from './components/Hero/Hero.styles'
import {useScreenScrollY} from '../../hooks/useScreenScrollY'

const MovieScreen = () => {
  const dispatch = useDispatch<Dispatch>()
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, SCREENS.MOVIE>>()
  const route = useRoute<RouteProp<StackParamList, SCREENS.MOVIE>>()
  const {movieId} = route.params

  const [statusBarStyle, setStatusBarStyle] =
    useState<StatusBarStyle>('light-content')

  const {screenScrollYAnimValue, onScreenScrollHandler} = useScreenScrollY()

  const {title, overview, tagline} =
    useSelector(selectMoviePrimitiveValuesById(movieId), shallowEqual) ?? {}

  const onSuggestedMovieButtonPress = useCallback<
    SuggestedMoviesSliderProps['onMovieButtonPress']
  >(movieId => navigation.push(SCREENS.MOVIE, {movieId}), [navigation])

  const headerOpacityAnimValue = useMemo(
    () =>
      screenScrollYAnimValue.interpolate({
        inputRange: [
          HERO_IMAGE_VISIBLE_HEIGHT,
          HERO_IMAGE_VISIBLE_HEIGHT + 0.5,
        ],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    [screenScrollYAnimValue],
  )

  const screenOptions = useMemo(
    () => ({
      title,
    }),
    [title],
  )

  const headerOpacityStyle = useMemo(
    () => ({opacity: headerOpacityAnimValue}),
    [headerOpacityAnimValue],
  )

  // При скролле поднимает heroImageContainer на значение скролла * 0.5
  const heroImageContainerStyle = useMemo<HeroProps['heroImageContainerStyle']>(
    () => ({
      transform: [
        {
          translateY: screenScrollYAnimValue.interpolate({
            inputRange: [-HERO_IMAGE_VISIBLE_HEIGHT, HERO_IMAGE_VISIBLE_HEIGHT],
            outputRange: [
              -HERO_IMAGE_VISIBLE_HEIGHT / 2,
              HERO_IMAGE_VISIBLE_HEIGHT / 2,
            ],
            extrapolate: 'clamp',
          }),
        },
      ],
    }),
    [screenScrollYAnimValue],
  )

  // При скролле увеличивает или сжимает heroImage
  const heroImageStyle = useMemo<HeroProps['heroImageStyle']>(
    () => ({
      transform: [
        {
          scale: screenScrollYAnimValue.interpolate({
            inputRange: [
              -HERO_IMAGE_VISIBLE_HEIGHT,
              HERO_IMAGE_VISIBLE_HEIGHT / 2,
            ],
            outputRange: [2, 1],
            extrapolate: 'clamp',
          }),
        },
      ],
    }),
    [screenScrollYAnimValue],
  )

  // при изменении opacity Header изменяет statusBarStyle
  useEffect(() => {
    const listener = headerOpacityAnimValue.addListener(value => {
      if (value.value && statusBarStyle === 'dark-content') return
      if (!value.value && statusBarStyle === 'light-content') return
      setStatusBarStyle(value.value ? 'dark-content' : 'light-content')
    })

    return () => {
      headerOpacityAnimValue.removeListener(listener)
    }
  }, [headerOpacityAnimValue, statusBarStyle])

  useEffect(() => {
    dispatch(
      fetchMovie({
        movieId: movieId,
        includes: [APPEND_TO_RESPONSE.images],
      }),
    )

    dispatch(fetchRecommendationsMovies({movieId}))
    dispatch(fetchSimilarMovies({movieId}))
  }, [dispatch, movieId])

  // console.log('MovieScreen RENDER', {})
  return (
    <>
      <StatusBar barStyle={statusBarStyle} translucent={true} />
      <Header
        navigation={navigation}
        route={route}
        options={screenOptions}
        isBackIconShown={true}
        shadowStyle={headerOpacityStyle}
        backgroundStyle={headerOpacityStyle}
        frontIconContainerStyle={headerOpacityStyle}
        frontTextStyle={headerOpacityStyle}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={onScreenScrollHandler}
        scrollEventThrottle={1}>
        <Hero
          movieId={movieId}
          heroImageContainerStyle={heroImageContainerStyle}
          heroImageStyle={heroImageStyle}
        />

        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheet__shadow} />
          <View style={styles.bottomSheet__handle} />

          <View style={styles.bottomSheet__content}>
            {!!tagline && <Text style={styles.tagline}>{tagline}</Text>}
            <Text style={styles.overview}>{overview}</Text>

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
              suggestedType={PAGINATION_QUERY_KEY_ROOTS.RECOMMENDATIONS_MOVIES}
              onMovieButtonPress={onSuggestedMovieButtonPress}
            />
            <RecommendationsMoviesSlider
              movieId={movieId}
              suggestedType={PAGINATION_QUERY_KEY_ROOTS.SIMILAR_MOVIES}
              onMovieButtonPress={onSuggestedMovieButtonPress}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </>
  )
}
export default React.memo(MovieScreen)
