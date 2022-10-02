import {StyleSheet} from 'react-native'
import {COLORS, HEADER_MIN_HEIGHT, SHADOWS} from '../../constants/styles'

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.backgroundLight,
    ...SHADOWS.dp8,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.backgroundLight,
  },
  contentContainer: {
    minHeight: HEADER_MIN_HEIGHT,
  },
})
