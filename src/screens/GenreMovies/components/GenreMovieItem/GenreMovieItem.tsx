import React, {useCallback, useMemo} from 'react'
import {ENTITIES_IDS_NAMES} from '../../../../constants/entities'
import {EntitiesIds} from '../../../../store/entities/entities.types'
import {shallowEqual, useSelector} from 'react-redux'
import {selectMoviePrimitiveValuesById} from '../../../../store/entities/movies/movies.selectors'
import {selectGenreNamesListByMovieId} from '../../../../store/entities/genres/genres.selectors'
import {getFormattedDateYear} from '../../../../utils/dates'
import MovieCardHorizontal, {
  MovieCardHorizontalProps,
} from '../../../../components/MovieCardHorizontal/MovieCardHorizontal'
import {styles} from '../../../Favorites/components/FavoriteItem/FavoriteItem.styles'
import TitleMovieCardHorizontal from '../../../../components/texts/TitleMovieCardHorizontal/TitleMovieCardHorizontal'
import {Text, View} from 'react-native'
import OriginalTitleMovieCardHorizontal from '../../../../components/texts/OriginalTitleMovieCardHorizontal/OriginalTitleMovieCardHorizontal'
import GenresNamesMovieCardHorizontal from '../../../../components/texts/GenresNamesMovieCardHorizontal/GenresNamesMovieCardHorizontal'
import {getRoundedVote} from '../../../../utils/strings'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../../../navigation/navigation.types'

export type GenreMovieItemProps = {
  [ENTITIES_IDS_NAMES.movieId]: EntitiesIds['movie']
} & Pick<MovieCardHorizontalProps, 'baseUrl' | 'sizePart'>
const GenreMovieItem = ({movieId, baseUrl, sizePart}: GenreMovieItemProps) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackParamList, SCREENS.GENRE_MOVIES>
    >()

  const {posterPath, title, originalTitle, releaseDate, voteAverage} =
    useSelector(selectMoviePrimitiveValuesById(movieId), shallowEqual) ?? {}

  const genresNamesList = useSelector(
    selectGenreNamesListByMovieId(movieId),
    shallowEqual,
  )

  const releaseDateFormatted = useMemo(
    () => getFormattedDateYear(releaseDate),
    [releaseDate],
  )

  const onPressHandler = useCallback(() => {
    navigation.push(SCREENS.MOVIE, {movieId})
  }, [movieId, navigation])

  // console.log('GenreMovieItem RENDER', {movieId})
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

      <Text style={styles.voteAverage}>
        {!!voteAverage && getRoundedVote(voteAverage)}
      </Text>
    </MovieCardHorizontal>
  )
}
export default React.memo(GenreMovieItem)
