import {StyleSheet} from 'react-native'
import {
  COLORS,
  POSTER_ASPECT_RATIO,
  SHADOWS,
  SPACES,
} from '../../constants/styles'

export const styles = StyleSheet.create({
  button: {
    paddingVertical: SPACES.s,
    paddingLeft: SPACES.s,
    paddingRight: SPACES.s,
    flexDirection: 'row',
    borderRadius: SPACES.s,
    backgroundColor: COLORS.backgroundLight,
    ...SHADOWS.dp2,
  },
  poster: {
    aspectRatio: POSTER_ASPECT_RATIO,
    borderRadius: SPACES.s,
    backgroundColor: COLORS.placeholder,
  },
  content: {
    flex: 1,
    marginLeft: SPACES.s,
    paddingVertical: SPACES.s,
  },
  buttonIcon: {
    width: 6,
    marginHorizontal: SPACES.s,
    transform: [{rotate: '180deg'}],
    color: COLORS.backgroundDark,
  },
})
