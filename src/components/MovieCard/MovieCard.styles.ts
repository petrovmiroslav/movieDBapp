import {StyleSheet} from 'react-native'
import {
  COLORS,
  POSTER_ASPECT_RATIO,
  SHADOWS,
  SPACES,
  TYPOGRAPHY,
  WINDOW,
} from '../../constants/styles'
import {getSliderItemWidth} from '../../utils/styles'

const PADDING_HORIZONTAL = SPACES.s
const MARGIN_HORIZONTAL = SPACES.s

export const styles = StyleSheet.create({
  container: {
    width: getSliderItemWidth({
      containerWidth: WINDOW.width + MARGIN_HORIZONTAL,
      containerPaddingLeft: PADDING_HORIZONTAL,
      itemCount: 2.4,
    }),
  },
  content: {
    paddingTop: SPACES.s,
    paddingHorizontal: SPACES.s,
  },
  posterContainer: {
    borderRadius: SPACES.s,
    backgroundColor: COLORS.placeholder,
    ...SHADOWS.dp2,
  },
  poster: {
    aspectRatio: POSTER_ASPECT_RATIO,
    borderRadius: SPACES.s,
    backgroundColor: COLORS.placeholder,
  },
  title: {
    marginTop: SPACES.s,
    ...TYPOGRAPHY.header_s,
  },
  genres: {
    ...TYPOGRAPHY.text_m,
    color: COLORS.fontLight,
  },
  voteAverageContainer: {
    position: 'absolute',
    top: 12,
    left: -SPACES.xs,
    borderRadius: SPACES.xs,
    ...SHADOWS.dp4,
    backgroundColor: COLORS.primary,
  },
  voteAverage: {
    paddingHorizontal: SPACES.s,
    borderRadius: SPACES.xs,
    backgroundColor: COLORS.primary,
    ...TYPOGRAPHY.text_s,
    color: COLORS.backgroundLight,
    overflow: 'hidden',
  },
})
