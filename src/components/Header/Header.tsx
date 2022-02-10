import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import React, {useCallback, useMemo} from 'react'
import {HeaderBackButtonProps as RNHeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types'
import HeaderBackButton, {
  HeaderBackButtonProps,
} from '../HeaderBackButton/HeaderBackButton'
import {Animated, View, ViewProps} from 'react-native'
import {styles} from './Header.styles'
import HeaderTitle, {HeaderTitleProps} from '../HeaderTitle/HeaderTitle'
import {useSetHeaderHeight} from '../../hooks/useHeaderHeight'

export type HeaderProps = {
  options?: NativeStackHeaderProps['options']
  style?: Animated.AnimatedProps<ViewProps>['style']
  shadowStyle?: Animated.AnimatedProps<ViewProps>['style']
  backgroundStyle?: Animated.AnimatedProps<ViewProps>['style']
} & Omit<NativeStackHeaderProps, 'options'> &
  Pick<
    HeaderBackButtonProps,
    'backIconContainerStyle' | 'frontIconContainerStyle' | 'isBackIconShown'
  > &
  Pick<HeaderTitleProps, 'backTextStyle' | 'frontTextStyle' | 'isBackTextShown'>
const Header = ({
  navigation,
  route,
  options = {},
  style,
  shadowStyle,
  backgroundStyle,
  isBackTextShown,
  backTextStyle,
  frontTextStyle,
  ...restHeaderBackButtonProps
}: HeaderProps) => {
  const {top, left, right} = useSafeAreaInsets()

  const canGoBack =
    options.headerBackVisible !== false && navigation.canGoBack()

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

  const CustomBackButton = options.headerLeft as
    | ((props: RNHeaderBackButtonProps) => JSX.Element)
    | undefined

  const BackButton = CustomBackButton ? (
    <CustomBackButton canGoBack={canGoBack} />
  ) : (
    <HeaderBackButton
      onPress={navigation.goBack}
      {...restHeaderBackButtonProps}
    />
  )

  const HeaderRight = options.headerRight as (() => JSX.Element) | undefined

  const setHeaderHeight = useSetHeaderHeight()
  const onLayoutHandler = useCallback<NonNullable<ViewProps['onLayout']>>(
    event => setHeaderHeight(event.nativeEvent.layout.height),
    [setHeaderHeight],
  )

  // console.log('Header RENDER', {})
  return (
    <Animated.View
      style={headerStyle}
      pointerEvents="box-none"
      onLayout={onLayoutHandler}>
      <Animated.View style={_shadowStyle} pointerEvents="none" />
      <Animated.View style={_backgroundStyle} pointerEvents="none" />

      <View style={styles.contentContainer} pointerEvents="box-none">
        {canGoBack && BackButton}

        <HeaderTitle
          route={route}
          options={options}
          isBackTextShown={isBackTextShown}
          backTextStyle={backTextStyle}
          frontTextStyle={frontTextStyle}
        />

        {HeaderRight && <HeaderRight />}
      </View>
    </Animated.View>
  )
}
export default React.memo(Header)
