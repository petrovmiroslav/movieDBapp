import {
  EntitiesIds,
  EntitiesIdsDictionary,
  EntitiesNamesPlural,
  EntitiesNamesSingularByPlural,
} from '../entities/entities.types'
import {PaginationApiParams} from '../../api/pagination/pagination.types'
import {SORT_BY_PARAM} from '../../api/api'
import {FAVORITES_TYPES} from '../entities/favorites/favorites.types'
import {SORT_BY_PARAM_DISCOVER_MOVIES} from '../../api/movies/movies.types'

export enum PAGINATION_ACTION_TYPES {
  REFRESH = 'refresh',
  RE_FETCH = 're_fetch',
}

// название запроса
export enum PAGINATION_QUERY_KEY_ROOTS {
  DISCOVER_MOVIES = 'discover_movies',
  RECOMMENDATIONS_MOVIES = 'recommendations_movies',
  SIMILAR_MOVIES = 'similar_movies',
  FAVORITES = 'favorites',
  POPULAR = 'popular',
  TOP_RATED = 'topRated',
}

// тип ключа запроса
export type PaginationQueryKey =
  | PAGINATION_QUERY_KEY_ROOTS
  | `${PAGINATION_QUERY_KEY_ROOTS}?${string}`

export type PaginationQueryKeyParams = {
  //FetchFavoritesApiParams
  favoritesType?: FAVORITES_TYPES
  //DiscoverMovieApiParams
  sort_by?: SORT_BY_PARAM & SORT_BY_PARAM_DISCOVER_MOVIES
  'vote_count.gte'?: number
  'vote_count.lte'?: number
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  with_genres?: string
  without_genres?: string
} & EntitiesIdsDictionary

export type PaginationQueryKeyActionPayloadData<
  EntityIdType extends EntitiesIds[keyof EntitiesIds],
> = {
  queryKey: PaginationQueryKey
  pages: Omit<PaginationQueryKeyData<EntityIdType>, 'pages'>[]
} & Pick<PaginationApiParams, '_actionType'>

export type PickPaginationActionPayload<
  EntityName extends keyof EntitiesNamesPlural,
> = {
  [key in EntityName]: PaginationQueryKeyActionPayloadData<
    EntitiesIds[EntitiesNamesSingularByPlural[key]]
  >[]
}

export type PaginationActionPayload<
  EntityName extends keyof EntitiesNamesPlural,
> = {
  pagination: PickPaginationActionPayload<EntityName>
}

export type PaginationQueryKeyData<
  EntityIdType extends EntitiesIds[keyof EntitiesIds],
> = {
  page: number
  totalPages?: number
  totalResults?: number
  ids?: EntityIdType[]
  loadedPages?: number[]
}

export type PaginationQueryKeyState<
  EntityIdType extends EntitiesIds[keyof EntitiesIds],
> = {
  [key in PaginationQueryKey]?: PaginationQueryKeyData<EntityIdType>
}

export type PaginationState = {
  [key in keyof EntitiesNamesPlural]?: PaginationQueryKeyState<
    EntitiesIds[EntitiesNamesSingularByPlural[key]]
  >
}
