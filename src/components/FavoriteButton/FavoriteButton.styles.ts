import {StyleSheet} from 'react-native'
import {COLORS, SPACES} from '../../constants/styles'

export const styles = StyleSheet.create({
  button: {
    width: SPACES.xl,
    height: SPACES.xl,
  },
  icon: {
    ...StyleSheet.absoluteFillObject,
    color: COLORS.primary,
  },
})
