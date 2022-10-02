import React, {useCallback, useEffect, useMemo} from 'react'
import {MovieId} from '../../../../store/entities/movies/movies.types'
import {ENTITIES_IDS_NAMES} from '../../../../constants/entities'
import {EntitiesIds} from '../../../../store/entities/entities.types'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {selectFavoriteById} from '../../../../store/entities/favorites/favorites.selectors'
import {selectMoviePrimitiveValuesById} from '../../../../store/entities/movies/movies.selectors'
import {selectGenreNamesListByMovieId} from '../../../../store/entities/genres/genres.selectors'
import {FAVORITES_TYPES} from '../../../../store/entities/favorites/favorites.types'
import {Dispatch, State} from '../../../../store/store'
import {styles} from './FavoriteItem.styles'
import {Text, View} from 'react-native'
import {
  convertMinutesToDuration,
  formatDurationToDigitsString,
  getFormattedDateMonthYear,
  getFormattedDateYear,
} from '../../../../utils/dates'
import {getRoundedVote} from '../../../../utils/strings'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../../../navigation/navigation.types'
import {fetchMovie} from '../../../../store/entities/movies/movies.thunks'
import MovieCardHorizontal, {
  MovieCardHorizontalProps,
} from '../../../../components/MovieCardHorizontal/MovieCardHorizontal'
import GenresNamesMovieCardHorizontal from '../../../../components/texts/GenresNamesMovieCardHorizontal/GenresNamesMovieCardHorizontal'
import TitleMovieCardHorizontal from '../../../../components/texts/TitleMovieCardHorizontal/TitleMovieCardHorizontal'
import OriginalTitleMovieCardHorizontal from '../../../../components/texts/OriginalTitleMovieCardHorizontal/OriginalTitleMovieCardHorizontal'

export type FavoriteItemProps = {
  [ENTITIES_IDS_NAMES.favoriteId]: EntitiesIds['favorite']
} & Pick<MovieCardHorizontalProps, 'baseUrl' | 'sizePart'>
const FavoriteItem = ({favoriteId, baseUrl, sizePart}: FavoriteItemProps) => {
  const dispatch = useDispatch<Dispatch>()

  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackParamList, SCREENS.FAVORITES>
    >()

  const {entityId, type, date} =
    useSelector(selectFavoriteById(favoriteId), shallowEqual) ?? {}

  const objectSelectorFunc = useMemo(
    () =>
      type === FAVORITES_TYPES.MOVIE
        ? selectMoviePrimitiveValuesById(entityId as MovieId)
        : (_S: State) => undefined,
    [entityId, type],
  )

  const {posterPath, title, originalTitle, releaseDate, voteAverage, runtime} =
    useSelector(objectSelectorFunc, shallowEqual) ?? {}

  const genresListSelectorFunc = useMemo(
    () =>
      type === FAVORITES_TYPES.MOVIE
        ? selectGenreNamesListByMovieId(entityId as MovieId)
        : (_S: State) => undefined,
    [entityId, type],
  )
  const genresNamesList = useSelector(genresListSelectorFunc, shallowEqual)

  const releaseDateFormatted = useMemo(
    () => getFormattedDateYear(releaseDate),
    [releaseDate],
  )

  const formattedDuration = useMemo(
    () =>
      runtime &&
      formatDurationToDigitsString(convertMinutesToDuration(runtime)),
    [runtime],
  )

  const formattedFavoriteDate = useMemo(
    () => getFormattedDateMonthYear(date),
    [date],
  )

  const onPressHandler = useCallback(() => {
    switch (type) {
      case FAVORITES_TYPES.MOVIE: {
        return navigation.push(SCREENS.MOVIE, {movieId: entityId as MovieId})
      }
    }
  }, [entityId, navigation, type])

  useEffect(() => {
    switch (type) {
      case FAVORITES_TYPES.MOVIE: {
        dispatch(
          fetchMovie({
            movieId: entityId as MovieId,
          }),
        )
        break
      }
    }
  }, [dispatch, entityId, type])

  // console.log('FavoriteItem RENDER', {
  //   favoriteId,
  // })

  return (
    <MovieCardHorizontal
      style={styles.button}
      onPress={onPressHandler}
      baseUrl={baseUrl}
      sizePart={sizePart}
      posterPath={posterPath}>
      <TitleMovieCardHorizontal title={title} />

      <View style={styles.textRow}>
        <OriginalTitleMovieCardHorizontal originalTitle={originalTitle} />

        <Text style={styles.releaseDate}>
          {releaseDateFormatted &&
            `${originalTitle ? ', ' : ''}${releaseDateFormatted}`}
        </Text>
      </View>

      <GenresNamesMovieCardHorizontal genresNamesList={genresNamesList} />

      <View style={styles.textRow}>
        <Text style={styles.voteAverage}>
          {!!voteAverage && getRoundedVote(voteAverage)}{' '}
          <Text style={styles.duration}>{formattedDuration}</Text>
        </Text>

        <Text style={styles.favoriteDate}>{formattedFavoriteDate}</Text>
      </View>
    </MovieCardHorizontal>
  )
}
export default React.memo(FavoriteItem)
