import {StyleSheet} from 'react-native'
import {getSliderItemWidth} from '../../../../utils/styles'
import {
  COLORS,
  POSTER_ASPECT_RATIO,
  SHADOWS,
  SPACES,
} from '../../../../constants/styles'
import {
  MOVIE_IMAGES_SLIDER_PADDING_HORIZONTAL,
  MOVIE_IMAGES_SLIDER_WIDTH,
} from '../MovieImagesSlider/MovieImagesSlider.styles'

const MARGIN_HORIZONTAL = SPACES.s

export const styles = StyleSheet.create({
  button: {
    width: getSliderItemWidth({
      containerWidth: MOVIE_IMAGES_SLIDER_WIDTH,
      containerPaddingLeft: MOVIE_IMAGES_SLIDER_PADDING_HORIZONTAL,
      itemMarginLeft: MARGIN_HORIZONTAL,
      itemMarginRight: MARGIN_HORIZONTAL,
      itemCount: 1.33,
    }),
    height: 200,
    marginHorizontal: MARGIN_HORIZONTAL,
    borderRadius: SPACES.s,
    backgroundColor: COLORS.placeholder,
    ...SHADOWS.dp2,
  },
  button_poster: {
    width: 'auto',
    aspectRatio: POSTER_ASPECT_RATIO,
  },
  image: {
    height: '100%',
    borderRadius: SPACES.s,
  },
})
