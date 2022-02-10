import {appAxiosInstance, DEFAULT_INCLUDE_LANGUAGE_PARAM} from '../api'
import {
  DiscoverMovieApiParams,
  DiscoverMovieDto,
  FetchMovieApiParams,
  MovieDto,
  FetchRecommendationsMoviesAPiParams,
  FetchRecommendationsMoviesDto,
  FetchSimilarMoviesAPiParams,
  FetchSimilarMoviesDto,
  FetchPopularMoviesApiParam,
  FetchPopularMoviesDto,
  FetchTopRatedMoviesApiParam,
  FetchTopRatedMoviesDto,
} from './movies.types'
import {movieDtoMapper} from './movies.mappers'
import {genreDtoMapper} from '../genres/genres.mappers'
import {
  PAGINATION_QUERY_KEY_ROOTS,
  PaginationActionPayload,
} from '../../store/pagination/pagination.types'
import {getPaginationQueryKey} from '../../store/pagination/pagination.slice'
import {EntitiesActionPayload} from '../../store/entities/entities.types'
import {paginationMapper} from '../pagination/pagination.mappers'
import {fetchImagesOfTheMovieApiDtoMapper} from '../images/images.mappers'
import {
  getEntitiesListWithValidId,
  getEntityId,
  getValidEntitiesIdsList,
} from '../../utils/store'

export const fetchMovieApi = ({
  movieId,
  includes,
}: FetchMovieApiParams): Promise<
  EntitiesActionPayload<'movies' | 'genres' | 'images'>
> =>
  appAxiosInstance
    .get<MovieDto>(`/movie/${movieId}`, {
      params: {
        append_to_response: includes?.join(),
        include_image_language: includes && DEFAULT_INCLUDE_LANGUAGE_PARAM,
      },
    })
    .then(res => res.data)
    .then(body => {
      const images = fetchImagesOfTheMovieApiDtoMapper({
        id: body.id,
        ...body.images,
      })

      const movie = movieDtoMapper(body)
      movie.imagesIds = getValidEntitiesIdsList(images.map(getEntityId))
      return {
        entities: {
          movies: getEntitiesListWithValidId([movie]),
          genres: (body.genres ?? []).map(genreDtoMapper),
          images,
        },
      }
    })

export const discoverMovieApi = (
  params: DiscoverMovieApiParams,
): Promise<
  EntitiesActionPayload<'movies'> & PaginationActionPayload<'movies'>
> =>
  appAxiosInstance
    .get<DiscoverMovieDto>('discover/movie', {params})
    .then(res => res.data)
    .then(body => {
      const queryKey = getPaginationQueryKey(
        PAGINATION_QUERY_KEY_ROOTS.DISCOVER_MOVIES,
        params,
      )
      const movies = (body.results ?? []).map(movieDtoMapper)
      const moviesQueryKeyState = paginationMapper(
        movies,
        body,
        queryKey,
        params._actionType,
      )

      return {
        entities: {movies},
        pagination: {movies: [moviesQueryKeyState]},
      }
    })

export const fetchRecommendationsMoviesAPi = ({
  movieId,
  page,
  _actionType,
}: FetchRecommendationsMoviesAPiParams): Promise<
  EntitiesActionPayload<'movies'> & PaginationActionPayload<'movies'>
> =>
  appAxiosInstance
    .get<FetchRecommendationsMoviesDto>(`/movie/${movieId}/recommendations`, {
      params: {page},
    })
    .then(res => res.data)
    .then(body => {
      const queryKey = getPaginationQueryKey(
        PAGINATION_QUERY_KEY_ROOTS.RECOMMENDATIONS_MOVIES,
        {movieId},
      )
      const movies = (body.results ?? []).map(movieDtoMapper)
      const moviesQueryKeyState = paginationMapper(
        movies,
        body,
        queryKey,
        _actionType,
      )

      return {
        entities: {movies},
        pagination: {movies: [moviesQueryKeyState]},
      }
    })

export const fetchSimilarMoviesAPi = ({
  movieId,
  page,
  _actionType,
}: FetchSimilarMoviesAPiParams): Promise<
  EntitiesActionPayload<'movies'> & PaginationActionPayload<'movies'>
> =>
  appAxiosInstance
    .get<FetchSimilarMoviesDto>(`/movie/${movieId}/similar`, {
      params: {page},
    })
    .then(res => res.data)
    .then(body => {
      const queryKey = getPaginationQueryKey(
        PAGINATION_QUERY_KEY_ROOTS.SIMILAR_MOVIES,
        {movieId},
      )
      const movies = (body.results ?? []).map(movieDtoMapper)
      const moviesQueryKeyState = paginationMapper(
        movies,
        body,
        queryKey,
        _actionType,
      )

      return {
        entities: {movies},
        pagination: {movies: [moviesQueryKeyState]},
      }
    })

export const fetchPopularMoviesApi = (
  params: FetchPopularMoviesApiParam,
): Promise<
  EntitiesActionPayload<'movies'> & PaginationActionPayload<'movies'>
> =>
  appAxiosInstance
    .get<FetchPopularMoviesDto>('/movie/popular', {params})
    .then(res => res.data)
    .then(body => {
      const queryKey = getPaginationQueryKey(PAGINATION_QUERY_KEY_ROOTS.POPULAR)
      const movies = (body.results ?? []).map(movieDtoMapper)
      const moviesQueryKeyState = paginationMapper(
        movies,
        body,
        queryKey,
        params._actionType,
      )

      return {
        entities: {movies},
        pagination: {movies: [moviesQueryKeyState]},
      }
    })

export const fetchTopRatedMoviesApi = (
  params: FetchTopRatedMoviesApiParam,
): Promise<
  EntitiesActionPayload<'movies'> & PaginationActionPayload<'movies'>
> =>
  appAxiosInstance
    .get<FetchTopRatedMoviesDto>('/movie/top_rated', {params})
    .then(res => res.data)
    .then(body => {
      const queryKey = getPaginationQueryKey(
        PAGINATION_QUERY_KEY_ROOTS.TOP_RATED,
      )
      const movies = (body.results ?? []).map(movieDtoMapper)
      const moviesQueryKeyState = paginationMapper(
        movies,
        body,
        queryKey,
        params._actionType,
      )

      return {
        entities: {movies},
        pagination: {movies: [moviesQueryKeyState]},
      }
    })
