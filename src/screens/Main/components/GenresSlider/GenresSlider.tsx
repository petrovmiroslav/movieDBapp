import React, {useCallback, useEffect} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {genreIdsListSortedByNameSelector} from '../../../../store/entities/genres/genres.selectors'
import {FlatList, ListRenderItem} from 'react-native'
import GenreButton, {GenreButtonProps} from '../GenreButton/GenreButton'
import {styles} from './GenresSlider.styles'
import SectionHeader from '../../../../components/headers/SectionHeader/SectionHeader'
import {fetchGenres} from '../../../../store/entities/genres/genres.thunks'
import {Dispatch} from '../../../../store/store'
import {keyExtractorForId} from '../../../../utils/virtualizedLists'

export type GenresSliderProps = {
  onButtonPress: GenreButtonProps['onPress']
}
const GenresSlider = ({onButtonPress}: GenresSliderProps) => {
  const dispatch = useDispatch<Dispatch>()

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

  useEffect(() => {
    dispatch(fetchGenres())
  }, [dispatch])

  return (
    <>
      <SectionHeader style={styles.header}>Жанры</SectionHeader>
      <FlatList
        style={styles.slider}
        contentContainerStyle={styles.screenHeaderLayoutContentContainer}
        data={genreIdsList}
        renderItem={renderMovieItem}
        keyExtractor={keyExtractorForId}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  )
}
export default React.memo(GenresSlider)
