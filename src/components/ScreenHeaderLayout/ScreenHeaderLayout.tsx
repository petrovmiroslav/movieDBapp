import {Animated, View, ViewProps} from 'react-native'
import {styles} from './ScreenHeaderLayout.styles'
import React, {ReactNode, useCallback, useMemo} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export type ScreenHeaderLayoutProps = {
  children?: ReactNode
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>> | undefined
  style?: Animated.AnimatedProps<ViewProps>['style']
  shadowStyle?: Animated.AnimatedProps<ViewProps>['style']
  backgroundStyle?: Animated.AnimatedProps<ViewProps>['style']
  contentContainerStyle?: ViewProps['style']
}
const ScreenHeaderLayout = ({
  children,
  setHeaderHeight,
  style,
  shadowStyle,
  backgroundStyle,
  contentContainerStyle,
}: ScreenHeaderLayoutProps) => {
  const {top, left, right} = useSafeAreaInsets()

  const headerStyle = useMemo(
    () => [
      styles.header,
      {
        paddingTop: top,
        paddingLeft: left,
        paddingRight: right,
      },
      style,
    ],
    [left, right, style, top],
  )

  const _shadowStyle = useMemo(
    () => [styles.shadow, shadowStyle],
    [shadowStyle],
  )

  const _backgroundStyle = useMemo(
    () => [styles.background, backgroundStyle],
    [backgroundStyle],
  )

  const _contentContainerStyle = useMemo(
    () => [styles.contentContainer, contentContainerStyle],
    [contentContainerStyle],
  )

  const onLayoutHandler = useCallback<NonNullable<ViewProps['onLayout']>>(
    event => setHeaderHeight?.(event.nativeEvent.layout.height),
    [setHeaderHeight],
  )

  return (
    <Animated.View
      style={headerStyle}
      pointerEvents="box-none"
      onLayout={setHeaderHeight && onLayoutHandler}>
      <Animated.View style={_shadowStyle} pointerEvents="none" />
      <Animated.View style={_backgroundStyle} pointerEvents="none" />

      <View style={_contentContainerStyle} pointerEvents="box-none">
        {children}
      </View>
    </Animated.View>
  )
}
export default ScreenHeaderLayout
