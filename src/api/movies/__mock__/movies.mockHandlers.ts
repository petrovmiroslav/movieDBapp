import {rest} from 'msw'
import {BASE_URL, PATH_GETTERS} from '../../../constants/api'
import {ENTITIES_IDS_NAMES} from '../../../constants/entities'
import {
  DiscoverMovieApiDto,
  FetchMovieApiDto,
  FetchPopularMoviesApiDto,
  FetchRecommendationsMoviesApiDto,
  FetchSimilarMoviesApiDto,
  FetchTopRatedMoviesApiDto,
  SearchMoviesApiDto,
} from '../movies.types'
import {IMAGE_TYPES} from '../../../store/entities/images/images.types'

export const fetchMovieApiMock_MOVIE_ID = 1
export const fetchMovieApiMockDtoTest: FetchMovieApiDto = {
  adult: false,
  backdrop_path: 'backdrop_path',
  budget: 1,
  genres: [
    {id: 1, name: 'name1'},
    {id: 2, name: 'name2'},
  ],
  genre_ids: [1, 2],
  homepage: 'homepage',
  id: fetchMovieApiMock_MOVIE_ID,
  images: {
    id: fetchMovieApiMock_MOVIE_ID,
    [IMAGE_TYPES.BACKDROPS]: [
      {
        aspect_ratio: 1,
        file_path: 'file_path1',
        height: 1,
        iso_639_1: 'iso_639_1',
        vote_average: 1,
        vote_count: 1,
        width: 300,
      },
    ],
    [IMAGE_TYPES.POSTERS]: [
      {
        aspect_ratio: 1,
        file_path: 'file_path2',
        height: 1,
        iso_639_1: 'iso_639_1',
        vote_average: 1,
        vote_count: 1,
        width: 300,
      },
    ],
  },
  imdb_id: 'imdb_id',
  original_language: 'original_language',
  original_title: 'original_title',
  overview: 'overview',
  popularity: 1,
  poster_path: 'poster_path',
  release_date: new Date(2000, 0, 0).toDateString(),
  revenue: 1,
  runtime: 1,
  status: 'status',
  tagline: 'tagline',
  title: 'title',
  video: false,
  vote_average: 1,
  vote_count: 1,
}

export const fetchMovieApiHandler = rest.get(
  BASE_URL +
    PATH_GETTERS.getFetchMovieApiPath(':' + ENTITIES_IDS_NAMES.movieId),
  (req, res, ctx) => {
    const movieId = Number(req.params[ENTITIES_IDS_NAMES.movieId])

    if (movieId === fetchMovieApiMock_MOVIE_ID) {
      return res(ctx.json(fetchMovieApiMockDtoTest))
    }

    return req.passthrough()
  },
)

export const discoverMovieApiMockDtoTest: DiscoverMovieApiDto = {
  results: [{...fetchMovieApiMockDtoTest}],
  page: 1,
}

export const discoverMovieApiHandler = rest.get(
  BASE_URL + PATH_GETTERS.discoverMovieApi,
  (req, res, ctx) => {
    return res(ctx.json(discoverMovieApiMockDtoTest))
  },
)

export const fetchRecommendationsMoviesAPiMock_MOVIE_ID = 1
export const fetchRecommendationsMoviesAPiMockDtoTest: FetchRecommendationsMoviesApiDto =
  {
    results: [
      {
        ...fetchMovieApiMockDtoTest,
        id: fetchRecommendationsMoviesAPiMock_MOVIE_ID,
      },
    ],
    page: 1,
  }

export const fetchRecommendationsMoviesHandler = rest.get(
  BASE_URL +
    PATH_GETTERS.getFetchRecommendationsMoviesAPi(
      ':' + ENTITIES_IDS_NAMES.movieId,
    ),
  (req, res, ctx) => {
    return res(ctx.json(fetchRecommendationsMoviesAPiMockDtoTest))
  },
)

export const fetchSimilarMoviesAPiMock_MOVIE_ID = 1
export const fetchSimilarMoviesAPiMockDtoTest: FetchSimilarMoviesApiDto = {
  results: [
    {
      ...fetchMovieApiMockDtoTest,
      id: fetchSimilarMoviesAPiMock_MOVIE_ID,
    },
  ],
  page: 1,
}

export const fetchSimilarMoviesHandler = rest.get(
  BASE_URL +
    PATH_GETTERS.getFetchSimilarMoviesApi(':' + ENTITIES_IDS_NAMES.movieId),
  (req, res, ctx) => {
    return res(ctx.json(fetchSimilarMoviesAPiMockDtoTest))
  },
)

export const fetchPopularMoviesApiMockDtoTest: FetchPopularMoviesApiDto = {
  results: [{...fetchMovieApiMockDtoTest}],
  page: 1,
}

export const fetchPopularMoviesApiHandler = rest.get(
  BASE_URL + PATH_GETTERS.fetchPopularMoviesApi,
  (req, res, ctx) => {
    return res(ctx.json(fetchPopularMoviesApiMockDtoTest))
  },
)

export const fetchTopRatedMoviesApiMockDtoTest: FetchTopRatedMoviesApiDto = {
  results: [{...fetchMovieApiMockDtoTest}],
  page: 1,
}

export const fetchTopRatedMoviesApiHandler = rest.get(
  BASE_URL + PATH_GETTERS.fetchTopRatedMoviesApi,
  (req, res, ctx) => {
    return res(ctx.json(fetchTopRatedMoviesApiMockDtoTest))
  },
)

export const searchMoviesApiMock_QUERY = 'test'
export const searchMoviesApiMockDtoTest: SearchMoviesApiDto = {
  results: [
    {...fetchMovieApiMockDtoTest, id: 2, title: searchMoviesApiMock_QUERY},
  ],
  page: 1,
}

export const searchMoviesApiHandler = rest.get(
  BASE_URL + PATH_GETTERS.searchMoviesApi,
  (req, res, ctx) => {
    const query = req.url.searchParams.get('query')
    if (query === searchMoviesApiMock_QUERY) {
      return res(ctx.json(searchMoviesApiMockDtoTest))
    }
    return req.passthrough()
  },
)
