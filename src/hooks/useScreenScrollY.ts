import {useMemo, useRef} from 'react'
import {Animated, ScrollViewProps} from 'react-native'

export const useScreenScrollY = () => {
  const screenScrollYAnimValue = useRef(new Animated.Value(0)).current

  const onScreenScrollHandler = useMemo<
    NonNullable<ScrollViewProps['onScroll']>
  >(
    () =>
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: screenScrollYAnimValue,
              },
            },
          },
        ],
        {useNativeDriver: true},
      ),
    [screenScrollYAnimValue],
  )

  return {
    screenScrollYAnimValue,
    onScreenScrollHandler,
  }
}
