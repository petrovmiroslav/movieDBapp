import {StyleSheet} from 'react-native'
import {SPACES} from '../../constants/styles'

export const styles = StyleSheet.create({
  screenHeaderLayoutContentContainer: {
    paddingHorizontal: SPACES.l,
    paddingVertical: SPACES.s,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sides: {
    flexBasis: 36,
  },
})
