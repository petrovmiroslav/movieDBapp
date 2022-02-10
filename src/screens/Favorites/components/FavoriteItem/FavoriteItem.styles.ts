import {StyleSheet} from 'react-native'
import {COLORS, SPACES, TYPOGRAPHY} from '../../../../constants/styles'

export const styles = StyleSheet.create({
  button: {
    marginVertical: SPACES.s,
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  releaseDate: {
    ...TYPOGRAPHY.text_s,
  },
  voteAverage: {
    marginTop: SPACES.m,
    ...TYPOGRAPHY.text_m,
    color: COLORS.primary,
  },
  duration: {
    ...TYPOGRAPHY.text_s,
    color: COLORS.fontMedium,
  },
  favoriteDate: {
    marginLeft: 'auto',
    marginRight: 0,
    ...TYPOGRAPHY.text_s,
    color: COLORS.fontLight,
  },
})
