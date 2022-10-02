import {StyleSheet} from 'react-native'
import {COLORS, TYPOGRAPHY} from '../../constants/styles'

export const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    ...TYPOGRAPHY.header_s,
    color: COLORS.fontDark,
  },
  text_back: {
    ...StyleSheet.absoluteFillObject,
    color: COLORS.backgroundLight,
  },
})
