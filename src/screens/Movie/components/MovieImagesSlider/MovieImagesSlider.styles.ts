import {StyleSheet} from 'react-native'
import {SPACES, WINDOW} from '../../../../constants/styles'

export const MOVIE_IMAGES_SLIDER_WIDTH = WINDOW.width
export const MOVIE_IMAGES_SLIDER_PADDING_HORIZONTAL = SPACES.s

export const styles = StyleSheet.create({
  slider: {
    marginHorizontal: -SPACES.m,
  },
  screenHeaderLayoutContentContainer: {
    paddingVertical: SPACES.s,
    paddingHorizontal: MOVIE_IMAGES_SLIDER_PADDING_HORIZONTAL,
  },
})
