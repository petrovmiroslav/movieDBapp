import {StyleSheet} from 'react-native'
import {COLORS, SHADOWS, SPACES, TYPOGRAPHY} from '../../constants/styles'

const BOTTOM_SHEET_BORDER_RADIUS = SPACES.m

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  bottomSheet: {
    marginTop: -BOTTOM_SHEET_BORDER_RADIUS,
    flexGrow: 1,
  },
  bottomSheet__shadow: {
    height: BOTTOM_SHEET_BORDER_RADIUS,
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopLeftRadius: BOTTOM_SHEET_BORDER_RADIUS,
    borderTopRightRadius: BOTTOM_SHEET_BORDER_RADIUS,
    ...SHADOWS.dp16,
    backgroundColor: COLORS.backgroundLight,
  },
  bottomSheet__content: {
    paddingTop: SPACES.xl,
    paddingBottom: SPACES.xxl,
    paddingHorizontal: SPACES.m,
    flexGrow: 1,
    borderTopLeftRadius: BOTTOM_SHEET_BORDER_RADIUS,
    borderTopRightRadius: BOTTOM_SHEET_BORDER_RADIUS,
    backgroundColor: COLORS.backgroundLight,
  },
  bottomSheet__handle: {
    width: SPACES.xl,
    height: 2,
    position: 'absolute',
    top: 6,
    alignSelf: 'center',
    borderRadius: 2,
    backgroundColor: COLORS.backgroundDark,
    zIndex: 1,
  },
  tagline: {
    marginBottom: SPACES.m,
    ...TYPOGRAPHY.header_s,
  },
  overview: {
    marginBottom: SPACES.s,
    ...TYPOGRAPHY.text_m,
  },
  sectionHeader: {
    marginTop: SPACES.l,
  },
})
