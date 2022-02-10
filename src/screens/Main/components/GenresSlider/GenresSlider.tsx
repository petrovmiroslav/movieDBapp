import React, {useCallback} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {genreIdsListSortedByNameSelector} from '../../../../selectors/genres.selectors'
import {FlatList, ListRenderItem} from 'react-native'
import GenreButton, {GenreButtonProps} from '../GenreButton/GenreButton'
import {styles} from './GenresSlider.styles'
import SectionHeader from '../../../../components/headers/SectionHeader/SectionHeader'

export type GenresSliderProps = {
  onButtonPress: GenreButtonProps['onPress']
}
const GenresSlider = ({onButtonPress}: GenresSliderProps) => {
  const genreIdsList = useSelector(
    genreIdsListSortedByNameSelector,
    shallowEqual,
  )

  const renderMovieItem = useCallback<
    ListRenderItem<NonNullable<typeof genreIdsList>[number]>
  >(
    ({item}) => (
      <GenreButton key={item} genreId={item} onPress={onButtonPress} />
    ),
    [onButtonPress],
  )

  return (
    <>
      <SectionHeader style={styles.header}>Жанры</SectionHeader>
      <FlatList
        style={styles.slider}
        contentContainerStyle={styles.contentContainer}
        data={genreIdsList}
        renderItem={renderMovieItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  )
}
export default React.memo(GenresSlider)
