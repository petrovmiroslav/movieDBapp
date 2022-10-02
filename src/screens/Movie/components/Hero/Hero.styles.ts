import {StyleSheet} from 'react-native'
import {COLORS, SPACES, TYPOGRAPHY, WINDOW} from '../../../../constants/styles'
export const HERO_IMAGE_VISIBLE_HEIGHT = WINDOW.height * 0.45
export const HERO_IMAGE_MIN_SCALE_VALUE = 1
export const HERO_IMAGE_MAX_SCALE_VALUE = 2
export const styles = StyleSheet.create({
  hero: {
    paddingTop: HERO_IMAGE_VISIBLE_HEIGHT,
  },
  hero__imageContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: '80%',
  },
  hero__image: {
    height: '100%',
    backgroundColor: COLORS.placeholder,
  },
  hero__favoriteButton: {
    marginTop: SPACES.s,
    alignSelf: 'center',
  },
  hero__content: {
    paddingTop: SPACES.l,
    paddingHorizontal: SPACES.m,
    paddingBottom: 48,
  },
  hero__backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.backgroundVeryDark,
    opacity: 0.99,
  },
  hero__header: {
    marginBottom: SPACES.m,
    textAlign: 'center',
    ...TYPOGRAPHY.header_l,
    color: 'white',
  },
  hero__text: {
    textAlign: 'center',
    ...TYPOGRAPHY.header_s,
    color: COLORS.fontExtraLight,
  },
  hero__text_vote: {
    color: COLORS.primary,
  },
})
