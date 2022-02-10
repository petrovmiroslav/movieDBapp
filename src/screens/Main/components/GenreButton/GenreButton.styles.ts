import {StyleSheet} from 'react-native'
import {COLORS, SHADOWS, SPACES, TYPOGRAPHY} from '../../../../constants/styles'

export const styles = StyleSheet.create({
  button: {
    marginHorizontal: SPACES.s,
    paddingVertical: SPACES.m,
    paddingHorizontal: SPACES.m,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: SPACES.s,
    ...SHADOWS.dp2,
  },
  text: {
    ...TYPOGRAPHY.text_m,
    color: COLORS.fontDark,
  },
})
