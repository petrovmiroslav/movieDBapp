import React, {useMemo} from 'react'
import {styles} from './Hero.styles'
import {Animated, ImageProps, Text, View, ViewProps} from 'react-native'
import {shallowEqual, useSelector} from 'react-redux'
import {selectMoviePrimitiveValuesById} from '../../../../selectors/movies.selectors'
import {
  convertMinutesToDuration,
  formatDurationToString,
  getFormattedDateYear,
} from '../../../../utils/dates'
import {selectGenreNamesListByMovieId} from '../../../../selectors/genres.selectors'
import {getImageUrl} from '../../../../utils/images'
import {MovieId} from '../../../../store/entities/movies/movies.types'
import FavoriteButton from '../../../../components/FavoriteButton/FavoriteButton'
import {styleSheetCompose} from '../../../../utils/styles'
import {useImageUri} from '../../../../hooks/useImageUri'
import {IMAGE_TYPES} from '../../../../store/entities/images/images.types'
import {getRoundedVote} from '../../../../utils/strings'
import {WINDOW} from '../../../../constants/styles'

export type HeroProps = {
  movieId: MovieId
  heroImageContainerStyle?: Animated.AnimatedProps<ViewProps>['style']
  heroImageStyle?: Animated.AnimatedProps<ImageProps>['style']
}
const Hero = ({
  movieId,
  heroImageContainerStyle,
  heroImageStyle,
}: HeroProps) => {
  const {
    backdropPath,
    originalTitle,
    releaseDate,
    runtime,
    title,
    voteAverage,
  } = useSelector(selectMoviePrimitiveValuesById(movieId), shallowEqual) ?? {}

  const VoteAverage = useMemo(() => {
    if (voteAverage === undefined) return
    return (
      <Text
        style={styleSheetCompose(styles.hero__text, styles.hero__text_vote)}>
        {`${getRoundedVote(voteAverage)}  `}
      </Text>
    )
  }, [voteAverage])

  const releaseDateFormatted = useMemo(
    () => getFormattedDateYear(releaseDate),
    [releaseDate],
  )

  const formattedDuration = useMemo(
    () => runtime && formatDurationToString(convertMinutesToDuration(runtime)),
    [runtime],
  )

  const genresNamesList = useSelector(
    selectGenreNamesListByMovieId(movieId),
    shallowEqual,
  )

  const genresNames = useMemo(
    () => genresNamesList?.join(', '),
    [genresNamesList],
  )

  const {baseUrl, sizePart} = useImageUri({
    imageType: IMAGE_TYPES.POSTERS,
    widthOnScreen: WINDOW.width * 2,
  })

  const backdropPathUri = useMemo(
    () => getImageUrl(baseUrl, sizePart, backdropPath),
    [backdropPath, baseUrl, sizePart],
  )

  const _heroImageContainerStyle = useMemo(
    () => [styles.hero__imageContainer, heroImageContainerStyle],
    [heroImageContainerStyle],
  )

  const _heroImageStyle = useMemo(
    () => [styles.hero__image, heroImageStyle],
    [heroImageStyle],
  )

  // console.log('Hero RENDER', {movieId})

  return (
    <View style={styles.hero}>
      <Animated.View style={_heroImageContainerStyle}>
        <Animated.Image
          style={_heroImageStyle}
          source={{uri: backdropPathUri}}
        />
      </Animated.View>

      <View style={styles.hero__content}>
        <View style={styles.hero__backdrop} />
        <Text style={styles.hero__header}>{title}</Text>
        <Text style={styles.hero__text}>
          {VoteAverage}
          {originalTitle}
        </Text>
        <Text style={styles.hero__text}>
          {releaseDateFormatted && releaseDateFormatted + ', '}
          {formattedDuration}
        </Text>
        <Text style={styles.hero__text}>{genresNames}</Text>

        <FavoriteButton movieId={movieId} style={styles.hero__favoriteButton} />
      </View>
    </View>
  )
}
export default React.memo(Hero)
