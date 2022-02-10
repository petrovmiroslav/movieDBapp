import React, {useCallback, useMemo} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {selectImagesIdsListByMovieId} from '../../../../selectors/images.selectors'
import {IMAGE_TYPES} from '../../../../store/entities/images/images.types'
import {MovieId} from '../../../../store/entities/movies/movies.types'
import {FlatList, ListRenderItem, StyleProp, ViewStyle} from 'react-native'
import {styles} from './MovieImagesSlider.styles'
import {styleSheetCompose} from '../../../../utils/styles'
import {useImageUri} from '../../../../hooks/useImageUri'
import SectionHeader from '../../../../components/headers/SectionHeader/SectionHeader'
import {styles as movieScreenStyles} from '../../MovieScreen.styles'
import MovieImageButton from '../MovieImageButton/MovieImageButton'
import {styles as movieImageButtonStyles} from '../MovieImageButton/MovieImageButton.styles'

export type MovieImagesSliderProps = {
  movieId: MovieId
  imageType: IMAGE_TYPES
  style?: StyleProp<ViewStyle>
}
const MovieImagesSlider = ({
  movieId,
  imageType,
  style,
}: MovieImagesSliderProps) => {
  const imageIdsList = useSelector(
    selectImagesIdsListByMovieId(movieId, imageType),
    shallowEqual,
  )

  const {baseUrl, sizePart} = useImageUri({
    imageType,
    widthOnScreen: IMAGE_TYPES.POSTERS
      ? movieImageButtonStyles.button.height *
        movieImageButtonStyles.button_poster.aspectRatio
      : movieImageButtonStyles.button.width,
  })

  const headerText = useMemo(
    () => (imageType === IMAGE_TYPES.POSTERS ? 'Постеры' : 'Кадры'),
    [imageType],
  )

  const renderImageItem = useCallback<
    ListRenderItem<NonNullable<typeof imageIdsList>[number]>
  >(
    ({item}) => (
      <MovieImageButton
        key={item}
        imageId={item}
        imageType={imageType}
        baseUrl={baseUrl}
        sizePart={sizePart}
      />
    ),
    [baseUrl, imageType, sizePart],
  )

  //console.log('MovieImagesSlider RENDER', )
  if (!imageIdsList?.length) return null
  return (
    <>
      <SectionHeader style={movieScreenStyles.sectionHeader}>
        {headerText}
      </SectionHeader>
      <FlatList
        style={styleSheetCompose(styles.slider, style)}
        contentContainerStyle={styles.contentContainer}
        data={imageIdsList}
        renderItem={renderImageItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  )
}

export default React.memo(MovieImagesSlider)
