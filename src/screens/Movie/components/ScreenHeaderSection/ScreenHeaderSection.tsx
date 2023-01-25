import {Animated, StatusBar, StatusBarStyle} from 'react-native'
import ScreenHeader from '../../../../components/ScreenHeader/ScreenHeader'
import React, {useEffect, useMemo, useState} from 'react'
import {HERO_IMAGE_VISIBLE_HEIGHT} from '../Hero/Hero.styles'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {SCREENS, StackParamList} from '../../../../navigation/navigation.types'

export type ScreenHeaderSectionProps = {
  screenScrollYAnimValue: Animated.Value
  title: string | undefined
}
const ScreenHeaderSection = ({
  screenScrollYAnimValue,
  title,
}: ScreenHeaderSectionProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, SCREENS.MOVIE>>()
  const route = useRoute<RouteProp<StackParamList, SCREENS.MOVIE>>()

  const [statusBarStyle, setStatusBarStyle] =
    useState<StatusBarStyle>('light-content')

  const headerOpacityAnimValue = useMemo(
    () =>
      screenScrollYAnimValue.interpolate({
        inputRange: [
          HERO_IMAGE_VISIBLE_HEIGHT,
          HERO_IMAGE_VISIBLE_HEIGHT + 0.5,
        ],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    [screenScrollYAnimValue],
  )

  const screenOptions = useMemo(
    () => ({
      title,
    }),
    [title],
  )

  const headerOpacityStyle = useMemo(
    () => ({opacity: headerOpacityAnimValue}),
    [headerOpacityAnimValue],
  )

  /** changes statusBarStyle if ScreenHeader opacity changes */
  useEffect(() => {
    const listener = headerOpacityAnimValue.addListener(value => {
      if (value.value && statusBarStyle === 'dark-content') return
      if (!value.value && statusBarStyle === 'light-content') return
      setStatusBarStyle(value.value ? 'dark-content' : 'light-content')
    })

    return () => {
      headerOpacityAnimValue.removeListener(listener)
    }
  }, [headerOpacityAnimValue, statusBarStyle])

  return (
    <>
      <StatusBar barStyle={statusBarStyle} translucent={true} />
      <ScreenHeader
        navigation={navigation}
        route={route}
        options={screenOptions}
        isBackIconShown={true}
        headerLayoutSetHeaderHeight={undefined}
        headerLayoutShadowStyle={headerOpacityStyle}
        headerLayoutBackgroundStyle={headerOpacityStyle}
        frontIconContainerStyle={headerOpacityStyle}
        frontTextStyle={headerOpacityStyle}
      />
    </>
  )
}
export default ScreenHeaderSection
