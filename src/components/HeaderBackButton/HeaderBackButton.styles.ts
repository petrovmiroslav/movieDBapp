import {StyleSheet} from 'react-native'
import {SPACES} from '../../constants/styles'

export const styles = StyleSheet.create({
  button: {
    marginRight: SPACES.m,
    width: SPACES.s,
    height: SPACES.m,
  },
  iconContainer: {
    ...StyleSheet.absoluteFillObject,
  },
})
