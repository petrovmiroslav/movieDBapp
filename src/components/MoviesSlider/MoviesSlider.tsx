import React, {useCallback} from 'react'
import {MovieId} from '../../store/entities/movies/movies.types'
import {FlatList, FlatListProps, ListRenderItem} from 'react-native'
import MovieCard, {MovieCardProps} from '../MovieCard/MovieCard'
import {styles} from './MoviesSlider.styles'
import {styleSheetCompose} from '../../utils/styles'

export type MoviesSliderProps = {
  movieIdsList: MovieId[] | undefined
  onMovieButtonPress: MovieCardProps['onPress']
} & Omit<FlatListProps<MovieId>, 'data' | 'renderItem'>
const MoviesSlider = ({
  movieIdsList,
  onMovieButtonPress,
  style,
  contentContainerStyle,
  ...restFlatListProps
}: MoviesSliderProps) => {
  const renderMovieItem = useCallback<
    ListRenderItem<NonNullable<typeof movieIdsList>[number]>
  >(
    ({item}) => (
      <MovieCard key={item} movieId={item} onPress={onMovieButtonPress} />
    ),
    [onMovieButtonPress],
  )

  return (
    <FlatList
      style={styleSheetCompose(styles.slider, style)}
      contentContainerStyle={styleSheetCompose(
        styles.contentContainer,
        contentContainerStyle,
      )}
      data={movieIdsList}
      renderItem={renderMovieItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={1}
      {...restFlatListProps}
    />
  )
}
export default React.memo(MoviesSlider)
