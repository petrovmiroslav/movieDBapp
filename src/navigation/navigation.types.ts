import {ENTITIES_IDS_NAMES} from '../constants/entities'
import {EntitiesIds} from '../store/entities/entities.types'

export enum TABS {
  MAIN = 'main',
  SEARCH = 'search',
  FAVORITES = 'favorites',
}

export enum SCREENS {
  MAIN = 'Home',
  SEARCH = 'Search',
  FAVORITES = 'Favorites',
  MOVIE = 'Movie',
  GENRE_MOVIES = 'Genre',
}

export type StackParamList = {
  [SCREENS.MAIN]: undefined
  [SCREENS.SEARCH]: undefined
  [SCREENS.FAVORITES]: undefined
  [SCREENS.MOVIE]: {[ENTITIES_IDS_NAMES.movieId]: EntitiesIds['movie']}
  [SCREENS.GENRE_MOVIES]: {[ENTITIES_IDS_NAMES.genreId]: EntitiesIds['genre']}
}
