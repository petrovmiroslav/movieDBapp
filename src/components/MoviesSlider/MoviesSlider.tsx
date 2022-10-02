import React, {useCallback} from 'react'
import {MovieId} from '../../store/entities/movies/movies.types'
import {FlatList, FlatListProps, ListRenderItem} from 'react-native'
import MovieCard, {MovieCardProps} from '../MovieCard/MovieCard'
import {styles} from './MoviesSlider.styles'
import {styleSheetCompose} from '../../utils/styles'
import {ON_END_REACHED_THRESHOLD_DEFAULT} from '../../constants/virtualizedLists'
import {keyExtractorForId} from '../../utils/virtualizedLists'
import {useImageUri} from '../../hooks/useImageUri'
import {IMAGE_TYPES} from '../../store/entities/images/images.types'

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
  const {baseUrl, sizePart} = useImageUri({
    imageType: IMAGE_TYPES.POSTERS,
  })

  const renderMovieItem = useCallback<
    ListRenderItem<NonNullable<typeof movieIdsList>[number]>
  >(
    ({item}) => (
      <MovieCard
        key={item}
        movieId={item}
        onPress={onMovieButtonPress}
        baseUrl={baseUrl}
        sizePart={sizePart}
      />
    ),
    [baseUrl, onMovieButtonPress, sizePart],
  )

  return (
    <FlatList
      style={styleSheetCompose(styles.slider, style)}
      contentContainerStyle={styleSheetCompose(
        styles.screenHeaderLayoutContentContainer,
        contentContainerStyle,
      )}
      data={movieIdsList}
      renderItem={renderMovieItem}
      keyExtractor={keyExtractorForId}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={ON_END_REACHED_THRESHOLD_DEFAULT}
      {...restFlatListProps}
    />
  )
}
export default React.memo(MoviesSlider)
