import {Brand, StringDate} from '../../../utils/types'
import {GenreId} from '../genres/genres.types'
import {EntitiesActionPayload} from '../entities.types'
import {ImageId} from '../images/images.types'

export type MovieId = Brand<number, 'MovieId'>
export type ImdbId = Brand<string, 'ImdbId'>

export enum MOVIE_STATUSES {
  RUMORED = 'Rumored',
  PLANNED = 'Planned',
  IN_PRODUCTION = 'In Production',
  POST_PRODUCTION = 'Post Production',
  RELEASED = 'Released',
  CANCELED = 'Canceled',
}

export type Movie = {
  adult?: boolean
  backdropPath?: string | null
  budget?: number
  genresIds?: GenreId[]
  homepage?: string | null
  id: MovieId
  imagesIds?: ImageId[]
  imdbId?: ImdbId | null
  originalLanguage?: string
  originalTitle?: string
  overview?: string | null
  popularity?: number
  posterPath?: string | null
  releaseDate?: StringDate
  revenue?: number
  runtime?: number | null
  status?: MOVIE_STATUSES
  tagline?: string | null
  title?: string
  video?: boolean
  voteAverage?: number
  voteCount?: number
}

export type MoviesEntitiesPayload = EntitiesActionPayload<'movies'>
