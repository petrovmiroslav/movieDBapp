import {Dimensions} from 'react-native'

export const WINDOW = Dimensions.get('window')

export const SPACES = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 64,
} as const

export const COLORS = {
  primary: '#f60',

  fontDark: '#1f1f1f',
  fontMedium: '#333',
  fontLight: 'rgba(0,0,0,0.4)',
  fontExtraLight: 'rgba(255,255,255,0.5)',

  backgroundLight: '#fff',
  backgroundMedium: '#f7f7f7',
  backgroundDark: '#b2b2b2',
  backgroundVeryDark: '#0c0c0c',

  placeholder: '#eeeeee',
} as const

export const TYPOGRAPHY = {
  header_s: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16 * 1.3,
    color: COLORS.fontDark,
  },
  header_m: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24 * 1.3,
    color: COLORS.fontDark,
  },
  header_l: {
    fontFamily: 'Roboto-Medium',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 32 * 1.3,
    color: COLORS.fontDark,
  },
  text_s: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14 * 1.3,
    color: COLORS.fontMedium,
  },
  text_m: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16 * 1.3,
    color: COLORS.fontMedium,
  },
  text_l: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 24 * 1.3,
    color: COLORS.fontMedium,
  },
} as const

export const SHADOWS = {
  dp2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dp4: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  dp6: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  dp8: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  dp16: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  dp24: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
} as const

export const HIT_SLOPS = {
  hitSlopS: {
    top: SPACES.s,
    bottom: SPACES.s,
    left: SPACES.s,
    right: SPACES.s,
  },
  hitSlopM: {
    top: SPACES.m,
    bottom: SPACES.m,
    left: SPACES.m,
    right: SPACES.m,
  },
  hitSlopL: {
    top: SPACES.l,
    bottom: SPACES.l,
    left: SPACES.l,
    right: SPACES.l,
  },
} as const

export const POSTER_ASPECT_RATIO = 0.67
export const BACKDROP_ASPECT_RATIO = 1.77

export const ACTIVE_OPACITY_DEFAULT = 0.6
export const ACTIVE_OPACITY_HARD = 0.2

export const HEADER_MIN_HEIGHT = 56
