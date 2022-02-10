import {StyleSheet} from 'react-native'
import {SPACES} from '../../../../constants/styles'

export const styles = StyleSheet.create({
  header: {
    marginTop: SPACES.l,
  },
  slider: {
    flexGrow: 0,
    marginHorizontal: -SPACES.m,
  },
  contentContainer: {
    paddingTop: SPACES.s,
    paddingBottom: SPACES.m,
    paddingHorizontal: SPACES.s,
  },
})
