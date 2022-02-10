import Svg, {SvgProps} from '../Svg/Svg'
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs'
import React, {useMemo} from 'react'
import {styles} from './TabBarIcon.styles'

export type getTabBarIconParams = SvgProps

export const getTabBarIcon: (
  params: getTabBarIconParams,
) => BottomTabNavigationOptions['tabBarIcon'] =
  ({source, style, ...restSvgProps}) =>
  ({color}) => {
    const _style = useMemo(() => [styles.icon, style], [])
    return <Svg source={source} style={_style} {...restSvgProps} fill={color} />
  }
