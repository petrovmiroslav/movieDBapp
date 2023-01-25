import {StyleProp, StyleSheet} from 'react-native'

/** fix StyleSheet.compose types */
export const styleSheetCompose = StyleSheet.compose as <T, U>(
  style1: StyleProp<T> | Array<StyleProp<T>>,
  style2: StyleProp<U> | Array<StyleProp<U>>,
) => StyleProp<T & U>

export const getSliderItemWidth = ({
  containerWidth,
  containerPaddingLeft = 0,
  itemMarginLeft = 0,
  itemMarginRight = 0,
  itemCount,
}: {
  containerWidth: number
  containerPaddingLeft?: number
  itemMarginLeft?: number
  itemMarginRight?: number
  itemCount: number
}): number =>
  (containerWidth -
    containerPaddingLeft -
    itemMarginLeft * Math.ceil(itemCount) -
    itemMarginRight * (itemCount - 1)) /
  itemCount
