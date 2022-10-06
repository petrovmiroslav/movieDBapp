import {FetchImagesOfTheMovieApiParams} from '../api/images/images.types'
import {
  FetchMovieApiParams,
  FetchRecommendationsMoviesApiParams,
  FetchSimilarMoviesApiParams,
} from '../api/movies/movies.types'

export enum LANGUAGES {
  RU = 'ru',
  EN = 'en',
  NULL = 'null',
}

export enum SORT_BY_PARAM_VALUES {
  POPULARITY_ASC = 'popularity.asc',
  POPULARITY_DESC = 'popularity.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  VOTE_AVERAGE_DESC = 'vote_average.desc',
}

export const BASE_URL = 'https://api.themoviedb.org/3'

export const DEFAULT_INCLUDE_LANGUAGE_PARAM = `${LANGUAGES.RU},${LANGUAGES.EN},${LANGUAGES.NULL}`

export const PATH_GETTERS = {
  /** genres*/
  fetchGenresApiPath: '/genre/movie/list',

  /** images*/
  getFetchImagesOfTheMovieApiPath: (
    movieId: FetchImagesOfTheMovieApiParams['movieId'] | string,
  ) => `/movie/${movieId}/images`,

  /** movies*/
  getFetchMovieApiPath: (movieId: FetchMovieApiParams['movieId'] | string) =>
    `/movie/${movieId}`,
  discoverMovieApi: '/discover/movie',
  getFetchRecommendationsMoviesAPi: (
    movieId: FetchRecommendationsMoviesApiParams['movieId'] | string,
  ) => `/movie/${movieId}/recommendations`,
  getFetchSimilarMoviesApi: (
    movieId: FetchSimilarMoviesApiParams['movieId'] | string,
  ) => `/movie/${movieId}/similar`,
  fetchPopularMoviesApi: '/movie/popular',
  fetchTopRatedMoviesApi: '/movie/top_rated',
  searchMoviesApi: '/search/movie',
} as const
