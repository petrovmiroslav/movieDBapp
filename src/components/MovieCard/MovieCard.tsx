import React, {useCallback, useMemo} from 'react'
import {MovieId} from '../../store/entities/movies/movies.types'
import {shallowEqual, useSelector} from 'react-redux'
import {selectMoviePrimitiveValuesById} from '../../store/entities/movies/movies.selectors'
import {selectGenreNamesListByMovieId} from '../../store/entities/genres/genres.selectors'
import {UseImageUriReturnType} from '../../hooks/useImageUri'
import {getImageUrl} from '../../utils/images'
import {Image, Text, View} from 'react-native'
import {styles} from './MovieCard.styles'
import {getRoundedVote} from '../../utils/strings'
import Button, {ButtonProps} from '../buttons/Button/Button'
import GenresNames from '../GenresNames/GenresNames'

export const MOVIE_CARD_ROLE = 'imagebutton'

export type MovieCardProps = {
  movieId: MovieId
  onPress: (movieId: MovieId) => void
  movieTitleTestID?: string
} & UseImageUriReturnType &
  Pick<ButtonProps, 'testID'>
const MovieCard = ({
  movieId,
  onPress,
  baseUrl,
  sizePart,
  testID,
  movieTitleTestID,
}: MovieCardProps) => {
  const {posterPath, title, voteAverage} =
    useSelector(selectMoviePrimitiveValuesById(movieId), shallowEqual) ?? {}

  const genresNamesList = useSelector(
    selectGenreNamesListByMovieId(movieId),
    shallowEqual,
  )

  const posterPathUri = useMemo(
    () => getImageUrl(baseUrl, sizePart, posterPath),
    [baseUrl, posterPath, sizePart],
  )

  const onPressHandler = useCallback(() => onPress(movieId), [movieId, onPress])

  // console.log('MovieCard RENDER', {
  //   movieId,
  // })
  return (
    <Button
      accessibilityRole={MOVIE_CARD_ROLE}
      style={styles.container}
      onPress={onPressHandler}>
      <View style={styles.content} testID={testID}>
        <View style={styles.posterContainer}>
          <Image style={styles.poster} source={{uri: posterPathUri}} />
        </View>

        <Text style={styles.title} numberOfLines={2} testID={movieTitleTestID}>
          {title}
        </Text>

        <GenresNames style={styles.genres} genresNamesList={genresNamesList} />

        {voteAverage !== undefined && (
          <View style={styles.voteAverageContainer}>
            <Text style={styles.voteAverage}>
              {getRoundedVote(voteAverage)}
            </Text>
          </View>
        )}
      </View>
    </Button>
  )
}
export default React.memo(MovieCard)
