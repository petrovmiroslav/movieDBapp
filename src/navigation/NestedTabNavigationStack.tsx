import {SCREENS} from './navigation.types'
import React, {useMemo} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {MainScreens, ScreenProps} from './navigation'
import {NativeStackNavigationOptions} from '@react-navigation/native-stack/lib/typescript/src/types'
import {COLORS} from '../constants/styles'

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerBackTitleVisible: false,
  headerShown: false,
  title: '',
  contentStyle: {
    backgroundColor: COLORS.backgroundLight,
  },
}
export const getNestedTabNavigationStack = (initialRouteName: SCREENS) =>
  React.memo(() => {
    const NavigationStack = useMemo(() => createNativeStackNavigator(), [])

    const mainScreens = useMemo(
      () =>
        MainScreens.map((screen: ScreenProps) => (
          <NavigationStack.Screen key={screen.name} {...screen} />
        )),
      [NavigationStack],
    )

    return (
      <NavigationStack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={defaultScreenOptions}>
        {mainScreens}
      </NavigationStack.Navigator>
    )
  })
