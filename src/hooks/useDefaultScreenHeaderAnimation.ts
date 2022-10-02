import {useMemo, useState} from 'react'
import {useScreenScrollY} from './useScreenScrollY'

export type UseDefaultScreenHeaderAnimationReturnType = ReturnType<
  typeof useDefaultScreenHeaderAnimation
>

export const useDefaultScreenHeaderAnimation = () => {
  const {screenScrollYAnimValue, onScreenScrollHandler} = useScreenScrollY()

  const [screenHeaderHeight, setScreenHeaderHeight] = useState(0)

  const screenHeaderShadowStyle = useMemo(
    () => ({
      opacity: screenScrollYAnimValue.interpolate({
        inputRange: [0, screenHeaderHeight * 0.5],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    }),
    [screenHeaderHeight, screenScrollYAnimValue],
  )

  return {
    screenScrollYAnimValue,
    onScreenScrollHandler,
    screenHeaderHeight,
    setScreenHeaderHeight,
    screenHeaderShadowStyle,
  }
}
