import {FavoriteDto} from './favorites.types'
import {
  Favorite,
  FavoriteId,
  FAVORITES_TYPES,
} from '../../store/entities/favorites/favorites.types'
import {StringDate} from '../../utils/types'

export const favoriteDtoMapper = (favoriteDto: FavoriteDto): Favorite => ({
  id: favoriteDto.id as FavoriteId,
  type: favoriteDto.type as FAVORITES_TYPES,
  entityId: favoriteDto.entityId,
  date: favoriteDto.date as StringDate,
})
