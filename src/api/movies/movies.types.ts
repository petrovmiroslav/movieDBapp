import {GenresDto} from '../genres/genres.types'
import {
  PaginationApiParams,
  PaginationDto,
} from '../pagination/pagination.types'
import {ENTITIES_IDS_NAMES} from '../../constants/entities'
import {MovieId} from '../../store/entities/movies/movies.types'
import {FetchImagesOfTheMovieApiDto} from '../images/images.types'
import {SORT_BY_PARAM_VALUES} from '../../constants/api'
import {EntitiesActionPayload} from '../../store/entities/entities.types'

export type MovieDto = {
  adult?: boolean
  backdrop_path?: string | null
  budget?: number
  genres?: GenresDto[]
  genre_ids?: number[]
  homepage?: string | null
  id?: number
  images?: FetchImagesOfTheMovieApiDto
  imdb_id?: string | null
  original_language?: string
  original_title?: string
  overview?: string | null
  popularity?: number
  poster_path?: string | null
  release_date?: string
  revenue?: number
  runtime?: number | null
  status?: string
  tagline?: string | null
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

export enum APPEND_TO_RESPONSE {
  images = 'images',
}

export type FetchMovieApiParams = {
  [ENTITIES_IDS_NAMES.movieId]: MovieId
  includes?: APPEND_TO_RESPONSE[]
}
export type FetchMovieApiDto = MovieDto
export type FetchMovieApiResponse = EntitiesActionPayload<
  'movies' | 'genres' | 'images'
>

export enum SORT_BY_PARAM_DISCOVER_MOVIES {
  RELEASE_DATE_ASC = 'release_date.asc',
  RELEASE_DATE_DESC = 'release_date.desc',
  REVENUE_ASC = 'revenue.asc',
  REVENUE_DESC = 'revenue.desc',
  PRIMARY_RELEASE_DATE_ASC = 'primary_release_date.asc',
  PRIMARY_RELEASE_DATE_DESC = 'primary_release_date.desc',
  ORIGINAL_TITLE_ASC = 'original_title.asc',
  ORIGINAL_TITLE_DESC = 'original_title.desc',
  VOTE_COUNT_ASC = 'vote_count.asc',
  VOTE_COUNT_DESC = 'vote_count.desc',
}

export type DiscoverMovieApiParams = {
  sort_by?: SORT_BY_PARAM_VALUES & SORT_BY_PARAM_DISCOVER_MOVIES
  'vote_count.gte'?: number
  'vote_count.lte'?: number
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  with_genres?: string
  without_genres?: string
} & PaginationApiParams
export type DiscoverMovieApiDto = {
  results?: MovieDto[]
} & PaginationDto
export type DiscoverMovieApiResponse = EntitiesActionPayload<'movies'>

export type FetchRecommendationsMoviesApiParams = {
  [ENTITIES_IDS_NAMES.movieId]: MovieId
} & PaginationApiParams
export type FetchRecommendationsMoviesApiDto = {
  results?: MovieDto[]
} & PaginationDto
export type FetchRecommendationsMoviesApiResponse =
  EntitiesActionPayload<'movies'>

export type FetchSimilarMoviesApiParams = FetchRecommendationsMoviesApiParams
export type FetchSimilarMoviesApiDto = FetchRecommendationsMoviesApiDto
export type FetchSimilarMoviesApiResponse = EntitiesActionPayload<'movies'>

export type FetchPopularMoviesApiParam = PaginationApiParams
export type FetchPopularMoviesApiDto = {
  results?: MovieDto[]
} & PaginationDto
export type FetchPopularMoviesApiResponse = EntitiesActionPayload<'movies'>

export type FetchTopRatedMoviesApiParam = PaginationApiParams
export type FetchTopRatedMoviesApiDto = {
  results?: MovieDto[]
} & PaginationDto
export type FetchTopRatedMoviesApiResponse = EntitiesActionPayload<'movies'>

export type SearchMoviesApiParams = {
  query: string
} & PaginationApiParams
export type SearchMoviesApiDto = {
  results?: MovieDto[]
} & PaginationDto
export type SearchMoviesApiResponse = EntitiesActionPayload<'movies'>
