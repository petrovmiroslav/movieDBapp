import {StyleSheet} from 'react-native'
import {COLORS, SPACES, TYPOGRAPHY} from '../../constants/styles'

const CANCEL_BUTTON_HIDDEN_WIDTH = 1

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SPACES.m,
    paddingBottom: SPACES.xl,
    paddingHorizontal: SPACES.m,
  },
  headerLayoutContentContainerStyle: {
    padding: SPACES.m,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SPACES.xs,
  },
  input: {
    flex: 1,
    padding: SPACES.m,
    paddingLeft: SPACES.xl + SPACES.m,
    ...TYPOGRAPHY.text_m,
  },
  icon: {
    width: SPACES.l,
    height: SPACES.l,
    position: 'absolute',
    left: SPACES.m,
    color: COLORS.fontLight,
  },
  cancelButton: {
    marginRight: -CANCEL_BUTTON_HIDDEN_WIDTH,
    justifyContent: 'center',
  },
  cancelButton_hidden: {
    width: CANCEL_BUTTON_HIDDEN_WIDTH,
  },
  cancelButton__text: {
    paddingLeft: SPACES.s,
    ...TYPOGRAPHY.text_m,
  },
})
