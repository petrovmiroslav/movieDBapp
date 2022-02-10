import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import React, {useMemo} from 'react'
import {TabScreenProps, TabsScreens} from './navigation'
import {COLORS} from '../constants/styles'

export const TabNavigationStack = createBottomTabNavigator()

const defaultTabBarOptions: BottomTabNavigationOptions = {
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarInactiveTintColor: COLORS.backgroundVeryDark,
  tabBarActiveTintColor: COLORS.primary,
  tabBarLabelStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14 * 1.3,
  },
}

const TabNavigator = () => {
  const tabsScreens = useMemo(
    () =>
      TabsScreens.map((screen: TabScreenProps) => (
        <TabNavigationStack.Screen key={screen.name} {...screen} />
      )),
    [],
  )

  return (
    <TabNavigationStack.Navigator
      backBehavior="initialRoute"
      screenOptions={defaultTabBarOptions}>
      {tabsScreens}
    </TabNavigationStack.Navigator>
  )
}

export default React.memo(TabNavigator)
