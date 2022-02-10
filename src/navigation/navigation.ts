import {SCREENS, TABS} from './navigation.types'
import {TabNavigationStack} from './TabNavigator'
import MainScreen from '../screens/Main/MainScreen'
import MovieScreen from '../screens/Movie/MovieScreen'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import FavoritesScreen from '../screens/Favorites/FavoritesScreen'
import {getTabBarIcon} from '../components/TabBarIcon/TabBarIcon'
import {ICONS_SVG} from '../constants/icons'
import {getNestedTabNavigationStack} from './NestedTabNavigationStack'
import GenreMoviesScreen from '../screens/GenreMovies/GenreMoviesScreen'

export type ScreenProps = Parameters<
  ReturnType<typeof createNativeStackNavigator>['Screen']
>[number]

export const MainScreens: ScreenProps[] = [
  {
    name: SCREENS.MAIN,
    component: MainScreen,
    options: {},
  },
  {
    name: SCREENS.MOVIE,
    component: MovieScreen,
    options: {},
  },
  {
    name: SCREENS.FAVORITES,
    component: FavoritesScreen,
    options: {},
  },
  {
    name: SCREENS.GENRE_MOVIES,
    component: GenreMoviesScreen,
    options: {},
  },
]

export type TabScreenProps = Parameters<
  typeof TabNavigationStack['Screen']
>[number]

export const TabsScreens: TabScreenProps[] = [
  {
    name: TABS.MAIN,
    component: getNestedTabNavigationStack(SCREENS.MAIN),
    options: {
      title: SCREENS.MAIN,
      tabBarIcon: getTabBarIcon({source: ICONS_SVG.main_filled}),
    },
  },
  {
    name: TABS.FAVORITES,
    component: getNestedTabNavigationStack(SCREENS.FAVORITES),
    options: {
      title: SCREENS.FAVORITES,
      tabBarIcon: getTabBarIcon({source: ICONS_SVG.favorites_filled}),
    },
  },
]
