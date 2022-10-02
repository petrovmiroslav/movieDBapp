import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import React, {useMemo} from 'react'
import {HeaderBackButtonProps as RNHeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types'
import ScreenHeaderBackButton, {
  ScreenHeaderBackButtonProps,
} from '../ScreenHeaderBackButton/ScreenHeaderBackButton'
import ScreenHeaderTitle, {
  ScreenHeaderTitleProps,
} from '../ScreenHeaderTitle/ScreenHeaderTitle'
import ScreenHeaderLayout, {
  ScreenHeaderLayoutProps,
} from '../ScreenHeaderLayout/ScreenHeaderLayout'
import {styles} from './ScreenHeader.styles'
import {View} from 'react-native'

type _ScreenHeaderLayoutProps = Omit<ScreenHeaderLayoutProps, 'children'>
type _PrefixedScreenHeaderLayoutProps = {
  [key in keyof _ScreenHeaderLayoutProps as `headerLayout${Capitalize<key>}`]: _ScreenHeaderLayoutProps[key]
}

export type ScreenHeaderProps = {
  options?: NativeStackHeaderProps['options']
} & Omit<NativeStackHeaderProps, 'options'> &
  Pick<
    ScreenHeaderBackButtonProps,
    'backIconContainerStyle' | 'frontIconContainerStyle' | 'isBackIconShown'
  > &
  Pick<
    ScreenHeaderTitleProps,
    'backTextStyle' | 'frontTextStyle' | 'isBackTextShown'
  > &
  _PrefixedScreenHeaderLayoutProps
const ScreenHeader = ({
  navigation,
  route,
  options = {},
  headerLayoutSetHeaderHeight,
  headerLayoutStyle,
  headerLayoutShadowStyle,
  headerLayoutBackgroundStyle,
  headerLayoutContentContainerStyle,
  isBackTextShown,
  backTextStyle,
  frontTextStyle,
  ...restHeaderBackButtonProps
}: ScreenHeaderProps) => {
  const _headerLayoutContentContainerStyle = useMemo(
    () => [
      styles.screenHeaderLayoutContentContainer,
      headerLayoutContentContainerStyle,
    ],
    [headerLayoutContentContainerStyle],
  )

  const canGoBack =
    options.headerBackVisible !== false && navigation.canGoBack()

  const CustomBackButton = options.headerLeft as
    | ((props: RNHeaderBackButtonProps) => JSX.Element)
    | undefined

  const BackButton = CustomBackButton ? (
    <CustomBackButton canGoBack={canGoBack} />
  ) : (
    <ScreenHeaderBackButton
      onPress={navigation.goBack}
      {...restHeaderBackButtonProps}
    />
  )

  const HeaderRight = options.headerRight as (() => JSX.Element) | undefined

  // console.log('ScreenHeader RENDER', {})
  return (
    <ScreenHeaderLayout
      style={headerLayoutStyle}
      setHeaderHeight={headerLayoutSetHeaderHeight}
      shadowStyle={headerLayoutShadowStyle}
      backgroundStyle={headerLayoutBackgroundStyle}
      contentContainerStyle={_headerLayoutContentContainerStyle}>
      <View style={styles.sides}>{canGoBack && BackButton}</View>

      <ScreenHeaderTitle
        route={route}
        options={options}
        isBackTextShown={isBackTextShown}
        backTextStyle={backTextStyle}
        frontTextStyle={frontTextStyle}
      />

      <View style={styles.sides}>{HeaderRight && <HeaderRight />}</View>
    </ScreenHeaderLayout>
  )
}
export default React.memo(ScreenHeader)
