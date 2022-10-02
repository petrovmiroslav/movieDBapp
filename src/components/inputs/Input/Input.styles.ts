import {StyleSheet} from 'react-native'
import {COLORS, SPACES, TYPOGRAPHY} from '../../../constants/styles'

export const styles = StyleSheet.create({
  input: {
    padding: SPACES.m,
    borderRadius: SPACES.xs,
    backgroundColor: COLORS.backgroundMedium,
    ...TYPOGRAPHY.text_m,
  },
  inputPlaceholder: {
    color: COLORS.fontLight,
  },
})
