import {server} from '../../../../__mocks__/msw/server'
import {EntitiesIds} from '../../../store/entities/entities.types'
import {
  discoverMovieApi,
  fetchMovieApi,
  fetchPopularMoviesApi,
  fetchRecommendationsMoviesApi,
  fetchSimilarMoviesApi,
  fetchTopRatedMoviesApi,
  searchMoviesApi,
} from '../movies.requests'
import {
  DiscoverMovieApiResponse,
  FetchMovieApiResponse,
  FetchPopularMoviesApiResponse,
  FetchSimilarMoviesApiResponse,
  FetchTopRatedMoviesApiResponse,
  SearchMoviesApiResponse,
} from '../movies.types'
import {
  discoverMovieApiMockDtoTest,
  fetchMovieApiMock_MOVIE_ID,
  fetchMovieApiMockDtoTest,
  fetchPopularMoviesApiMockDtoTest,
  fetchRecommendationsMoviesAPiMock_MOVIE_ID,
  fetchRecommendationsMoviesAPiMockDtoTest,
  fetchSimilarMoviesAPiMock_MOVIE_ID,
  fetchSimilarMoviesAPiMockDtoTest,
  fetchTopRatedMoviesApiMockDtoTest,
  searchMoviesApiMock_QUERY,
  searchMoviesApiMockDtoTest,
} from '../__mock__/movies.mockHandlers'
import {StringDate} from '../../../utils/types'
import {
  ImdbId,
  MOVIE_STATUSES,
} from '../../../store/entities/movies/movies.types'
import {ENTITIES_IDS_NAMES} from '../../../constants/entities'
import {IMAGE_TYPES} from '../../../store/entities/images/images.types'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('api/movies/movies.requests.ts', () => {
  const fetchMovieApi_RESPONSE: FetchMovieApiResponse = {
    entities: {
      movies: [
        {
          adult: fetchMovieApiMockDtoTest.adult,
          backdropPath: fetchMovieApiMockDtoTest.backdrop_path,
          budget: fetchMovieApiMockDtoTest.budget,
          genresIds:
            fetchMovieApiMockDtoTest.genre_ids as EntitiesIds['genre'][],
          homepage: fetchMovieApiMockDtoTest.homepage,
          id: fetchMovieApiMockDtoTest.id as EntitiesIds['movie'],
          imagesIds: [
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0]
              .file_path as EntitiesIds['image'],
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0]
              .file_path as EntitiesIds['image'],
          ],
          imdbId: fetchMovieApiMockDtoTest.imdb_id as ImdbId,
          originalLanguage: fetchMovieApiMockDtoTest.original_language,
          originalTitle: fetchMovieApiMockDtoTest.original_title,
          overview: fetchMovieApiMockDtoTest.overview,
          popularity: fetchMovieApiMockDtoTest.popularity,
          posterPath: fetchMovieApiMockDtoTest.poster_path,
          releaseDate: fetchMovieApiMockDtoTest.release_date as StringDate,
          revenue: fetchMovieApiMockDtoTest.revenue,
          runtime: fetchMovieApiMockDtoTest.runtime,
          status: fetchMovieApiMockDtoTest.status as MOVIE_STATUSES,
          tagline: fetchMovieApiMockDtoTest.tagline,
          title: fetchMovieApiMockDtoTest.title,
          video: fetchMovieApiMockDtoTest.video,
          voteAverage: fetchMovieApiMockDtoTest.vote_average,
          voteCount: fetchMovieApiMockDtoTest.vote_count,
        },
      ],
      genres: [
        {
          ...fetchMovieApiMockDtoTest.genres?.[0],
          id: fetchMovieApiMockDtoTest.genres?.[0].id as EntitiesIds['genre'],
        },
        {
          ...fetchMovieApiMockDtoTest.genres?.[1],
          id: fetchMovieApiMockDtoTest.genres?.[1].id as EntitiesIds['genre'],
        },
      ],
      images: [
        {
          id: fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0]
            .file_path as EntitiesIds['image'],
          aspectRatio:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0]
              .aspect_ratio,
          filePath:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0]
              .file_path,
          height:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0]
              .height,
          type: IMAGE_TYPES.BACKDROPS,
          iso_639_1:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0]
              .iso_639_1,
          voteAverage:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0]
              .vote_average,
          voteCount:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0]
              .vote_count,
          width:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.BACKDROPS]?.[0].width,
          [ENTITIES_IDS_NAMES.movieId]:
            fetchMovieApiMockDtoTest.id as EntitiesIds['movie'],
        },
        {
          id: fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0]
            .file_path as EntitiesIds['image'],
          aspectRatio:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0]
              .aspect_ratio,
          filePath:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0]
              .file_path,
          height:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0].height,
          type: IMAGE_TYPES.POSTERS,
          iso_639_1:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0]
              .iso_639_1,
          voteAverage:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0]
              .vote_average,
          voteCount:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0]
              .vote_count,
          width:
            fetchMovieApiMockDtoTest.images?.[IMAGE_TYPES.POSTERS]?.[0].width,
          [ENTITIES_IDS_NAMES.movieId]:
            fetchMovieApiMockDtoTest.id as EntitiesIds['movie'],
        },
      ],
    },
  }

  test(`fetchMovieApi() returns ${JSON.stringify(fetchMovieApi_RESPONSE)},
  if response_dto is ${JSON.stringify(
    fetchMovieApiMockDtoTest,
  )},`, async () => {
    expect(
      await fetchMovieApi({
        movieId: fetchMovieApiMock_MOVIE_ID as EntitiesIds['movie'],
      }),
    ).toEqual(fetchMovieApi_RESPONSE)
  })

  const discoverMovieApi_RESPONSE: DiscoverMovieApiResponse = {
    entities: {
      movies: [
        {
          adult: discoverMovieApiMockDtoTest.results?.[0].adult,
          backdropPath: discoverMovieApiMockDtoTest.results?.[0].backdrop_path,
          budget: discoverMovieApiMockDtoTest.results?.[0].budget,
          genresIds: discoverMovieApiMockDtoTest.results?.[0]
            .genre_ids as EntitiesIds['genre'][],
          homepage: discoverMovieApiMockDtoTest.results?.[0].homepage,
          id: discoverMovieApiMockDtoTest.results?.[0]
            .id as EntitiesIds['movie'],
          imdbId: discoverMovieApiMockDtoTest.results?.[0].imdb_id as ImdbId,
          originalLanguage:
            discoverMovieApiMockDtoTest.results?.[0].original_language,
          originalTitle:
            discoverMovieApiMockDtoTest.results?.[0].original_title,
          overview: discoverMovieApiMockDtoTest.results?.[0].overview,
          popularity: discoverMovieApiMockDtoTest.results?.[0].popularity,
          posterPath: discoverMovieApiMockDtoTest.results?.[0].poster_path,
          releaseDate: discoverMovieApiMockDtoTest.results?.[0]
            .release_date as StringDate,
          revenue: discoverMovieApiMockDtoTest.results?.[0].revenue,
          runtime: discoverMovieApiMockDtoTest.results?.[0].runtime,
          status: discoverMovieApiMockDtoTest.results?.[0]
            .status as MOVIE_STATUSES,
          tagline: discoverMovieApiMockDtoTest.results?.[0].tagline,
          title: discoverMovieApiMockDtoTest.results?.[0].title,
          video: discoverMovieApiMockDtoTest.results?.[0].video,
          voteAverage: discoverMovieApiMockDtoTest.results?.[0].vote_average,
          voteCount: discoverMovieApiMockDtoTest.results?.[0].vote_count,
        },
      ],
    },
  }

  test(`discoverMovieApi() returns ${JSON.stringify(discoverMovieApi_RESPONSE)},
  if response_dto is ${JSON.stringify(
    discoverMovieApiMockDtoTest,
  )},`, async () => {
    expect(await discoverMovieApi({})).toEqual(discoverMovieApi_RESPONSE)
  })

  const fetchRecommendationsMoviesAPi_RESPONSE: DiscoverMovieApiResponse = {
    entities: {
      movies: [
        {
          adult: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].adult,
          backdropPath:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].backdrop_path,
          budget: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].budget,
          genresIds: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0]
            .genre_ids as EntitiesIds['genre'][],
          homepage:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].homepage,
          id: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0]
            .id as EntitiesIds['movie'],
          imdbId: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0]
            .imdb_id as ImdbId,
          originalLanguage:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0]
              .original_language,
          originalTitle:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0]
              .original_title,
          overview:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].overview,
          popularity:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].popularity,
          posterPath:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].poster_path,
          releaseDate: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0]
            .release_date as StringDate,
          revenue:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].revenue,
          runtime:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].runtime,
          status: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0]
            .status as MOVIE_STATUSES,
          tagline:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].tagline,
          title: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].title,
          video: fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].video,
          voteAverage:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].vote_average,
          voteCount:
            fetchRecommendationsMoviesAPiMockDtoTest.results?.[0].vote_count,
        },
      ],
    },
  }

  test(`fetchRecommendationsMoviesAPi() returns ${JSON.stringify(
    fetchRecommendationsMoviesAPi_RESPONSE,
  )},
  if response_dto is ${JSON.stringify(
    fetchRecommendationsMoviesAPiMockDtoTest,
  )},`, async () => {
    expect(
      await fetchRecommendationsMoviesApi({
        movieId:
          fetchRecommendationsMoviesAPiMock_MOVIE_ID as EntitiesIds['movie'],
      }),
    ).toEqual(fetchRecommendationsMoviesAPi_RESPONSE)
  })

  const fetchSimilarMoviesApi_RESPONSE: FetchSimilarMoviesApiResponse = {
    entities: {
      movies: [
        {
          adult: fetchSimilarMoviesAPiMockDtoTest.results?.[0].adult,
          backdropPath:
            fetchSimilarMoviesAPiMockDtoTest.results?.[0].backdrop_path,
          budget: fetchSimilarMoviesAPiMockDtoTest.results?.[0].budget,
          genresIds: fetchSimilarMoviesAPiMockDtoTest.results?.[0]
            .genre_ids as EntitiesIds['genre'][],
          homepage: fetchSimilarMoviesAPiMockDtoTest.results?.[0].homepage,
          id: fetchSimilarMoviesAPiMockDtoTest.results?.[0]
            .id as EntitiesIds['movie'],
          imdbId: fetchSimilarMoviesAPiMockDtoTest.results?.[0]
            .imdb_id as ImdbId,
          originalLanguage:
            fetchSimilarMoviesAPiMockDtoTest.results?.[0].original_language,
          originalTitle:
            fetchSimilarMoviesAPiMockDtoTest.results?.[0].original_title,
          overview: fetchSimilarMoviesAPiMockDtoTest.results?.[0].overview,
          popularity: fetchSimilarMoviesAPiMockDtoTest.results?.[0].popularity,
          posterPath: fetchSimilarMoviesAPiMockDtoTest.results?.[0].poster_path,
          releaseDate: fetchSimilarMoviesAPiMockDtoTest.results?.[0]
            .release_date as StringDate,
          revenue: fetchSimilarMoviesAPiMockDtoTest.results?.[0].revenue,
          runtime: fetchSimilarMoviesAPiMockDtoTest.results?.[0].runtime,
          status: fetchSimilarMoviesAPiMockDtoTest.results?.[0]
            .status as MOVIE_STATUSES,
          tagline: fetchSimilarMoviesAPiMockDtoTest.results?.[0].tagline,
          title: fetchSimilarMoviesAPiMockDtoTest.results?.[0].title,
          video: fetchSimilarMoviesAPiMockDtoTest.results?.[0].video,
          voteAverage:
            fetchSimilarMoviesAPiMockDtoTest.results?.[0].vote_average,
          voteCount: fetchSimilarMoviesAPiMockDtoTest.results?.[0].vote_count,
        },
      ],
    },
  }

  test(`fetchSimilarMoviesAPi() returns ${JSON.stringify(
    fetchSimilarMoviesApi_RESPONSE,
  )},
  if response_dto is ${JSON.stringify(
    fetchSimilarMoviesAPiMockDtoTest,
  )},`, async () => {
    expect(
      await fetchSimilarMoviesApi({
        movieId: fetchSimilarMoviesAPiMock_MOVIE_ID as EntitiesIds['movie'],
      }),
    ).toEqual(fetchSimilarMoviesApi_RESPONSE)
  })

  const fetchPopularMoviesApi_RESPONSE: FetchPopularMoviesApiResponse = {
    entities: {
      movies: [
        {
          adult: fetchPopularMoviesApiMockDtoTest.results?.[0].adult,
          backdropPath:
            fetchPopularMoviesApiMockDtoTest.results?.[0].backdrop_path,
          budget: fetchPopularMoviesApiMockDtoTest.results?.[0].budget,
          genresIds: fetchPopularMoviesApiMockDtoTest.results?.[0]
            .genre_ids as EntitiesIds['genre'][],
          homepage: fetchPopularMoviesApiMockDtoTest.results?.[0].homepage,
          id: fetchPopularMoviesApiMockDtoTest.results?.[0]
            .id as EntitiesIds['movie'],
          imdbId: fetchPopularMoviesApiMockDtoTest.results?.[0]
            .imdb_id as ImdbId,
          originalLanguage:
            fetchPopularMoviesApiMockDtoTest.results?.[0].original_language,
          originalTitle:
            fetchPopularMoviesApiMockDtoTest.results?.[0].original_title,
          overview: fetchPopularMoviesApiMockDtoTest.results?.[0].overview,
          popularity: fetchPopularMoviesApiMockDtoTest.results?.[0].popularity,
          posterPath: fetchPopularMoviesApiMockDtoTest.results?.[0].poster_path,
          releaseDate: fetchPopularMoviesApiMockDtoTest.results?.[0]
            .release_date as StringDate,
          revenue: fetchPopularMoviesApiMockDtoTest.results?.[0].revenue,
          runtime: fetchPopularMoviesApiMockDtoTest.results?.[0].runtime,
          status: fetchPopularMoviesApiMockDtoTest.results?.[0]
            .status as MOVIE_STATUSES,
          tagline: fetchPopularMoviesApiMockDtoTest.results?.[0].tagline,
          title: fetchPopularMoviesApiMockDtoTest.results?.[0].title,
          video: fetchPopularMoviesApiMockDtoTest.results?.[0].video,
          voteAverage:
            fetchPopularMoviesApiMockDtoTest.results?.[0].vote_average,
          voteCount: fetchPopularMoviesApiMockDtoTest.results?.[0].vote_count,
        },
      ],
    },
  }

  test(`fetchPopularMoviesApi() returns ${JSON.stringify(
    fetchPopularMoviesApi_RESPONSE,
  )},
  if response_dto is ${JSON.stringify(
    fetchPopularMoviesApiMockDtoTest,
  )},`, async () => {
    expect(await fetchPopularMoviesApi({})).toEqual(
      fetchPopularMoviesApi_RESPONSE,
    )
  })

  const fetchTopRatedMoviesApi_RESPONSE: FetchTopRatedMoviesApiResponse = {
    entities: {
      movies: [
        {
          adult: fetchTopRatedMoviesApiMockDtoTest.results?.[0].adult,
          backdropPath:
            fetchTopRatedMoviesApiMockDtoTest.results?.[0].backdrop_path,
          budget: fetchTopRatedMoviesApiMockDtoTest.results?.[0].budget,
          genresIds: fetchTopRatedMoviesApiMockDtoTest.results?.[0]
            .genre_ids as EntitiesIds['genre'][],
          homepage: fetchTopRatedMoviesApiMockDtoTest.results?.[0].homepage,
          id: fetchTopRatedMoviesApiMockDtoTest.results?.[0]
            .id as EntitiesIds['movie'],
          imdbId: fetchTopRatedMoviesApiMockDtoTest.results?.[0]
            .imdb_id as ImdbId,
          originalLanguage:
            fetchTopRatedMoviesApiMockDtoTest.results?.[0].original_language,
          originalTitle:
            fetchTopRatedMoviesApiMockDtoTest.results?.[0].original_title,
          overview: fetchTopRatedMoviesApiMockDtoTest.results?.[0].overview,
          popularity: fetchTopRatedMoviesApiMockDtoTest.results?.[0].popularity,
          posterPath:
            fetchTopRatedMoviesApiMockDtoTest.results?.[0].poster_path,
          releaseDate: fetchTopRatedMoviesApiMockDtoTest.results?.[0]
            .release_date as StringDate,
          revenue: fetchTopRatedMoviesApiMockDtoTest.results?.[0].revenue,
          runtime: fetchTopRatedMoviesApiMockDtoTest.results?.[0].runtime,
          status: fetchTopRatedMoviesApiMockDtoTest.results?.[0]
            .status as MOVIE_STATUSES,
          tagline: fetchTopRatedMoviesApiMockDtoTest.results?.[0].tagline,
          title: fetchTopRatedMoviesApiMockDtoTest.results?.[0].title,
          video: fetchTopRatedMoviesApiMockDtoTest.results?.[0].video,
          voteAverage:
            fetchTopRatedMoviesApiMockDtoTest.results?.[0].vote_average,
          voteCount: fetchTopRatedMoviesApiMockDtoTest.results?.[0].vote_count,
        },
      ],
    },
  }

  test(`fetchTopRatedMoviesApi() returns ${JSON.stringify(
    fetchTopRatedMoviesApi_RESPONSE,
  )},
  if response_dto is ${JSON.stringify(
    fetchTopRatedMoviesApiMockDtoTest,
  )},`, async () => {
    expect(await fetchTopRatedMoviesApi({})).toEqual(
      fetchTopRatedMoviesApi_RESPONSE,
    )
  })

  const searchMoviesApi_RESPONSE: SearchMoviesApiResponse = {
    entities: {
      movies: [
        {
          adult: searchMoviesApiMockDtoTest.results?.[0].adult,
          backdropPath: searchMoviesApiMockDtoTest.results?.[0].backdrop_path,
          budget: searchMoviesApiMockDtoTest.results?.[0].budget,
          genresIds: searchMoviesApiMockDtoTest.results?.[0]
            .genre_ids as EntitiesIds['genre'][],
          homepage: searchMoviesApiMockDtoTest.results?.[0].homepage,
          id: searchMoviesApiMockDtoTest.results?.[0]
            .id as EntitiesIds['movie'],
          imdbId: searchMoviesApiMockDtoTest.results?.[0].imdb_id as ImdbId,
          originalLanguage:
            searchMoviesApiMockDtoTest.results?.[0].original_language,
          originalTitle: searchMoviesApiMockDtoTest.results?.[0].original_title,
          overview: searchMoviesApiMockDtoTest.results?.[0].overview,
          popularity: searchMoviesApiMockDtoTest.results?.[0].popularity,
          posterPath: searchMoviesApiMockDtoTest.results?.[0].poster_path,
          releaseDate: searchMoviesApiMockDtoTest.results?.[0]
            .release_date as StringDate,
          revenue: searchMoviesApiMockDtoTest.results?.[0].revenue,
          runtime: searchMoviesApiMockDtoTest.results?.[0].runtime,
          status: searchMoviesApiMockDtoTest.results?.[0]
            .status as MOVIE_STATUSES,
          tagline: searchMoviesApiMockDtoTest.results?.[0].tagline,
          title: searchMoviesApiMockDtoTest.results?.[0].title,
          video: searchMoviesApiMockDtoTest.results?.[0].video,
          voteAverage: searchMoviesApiMockDtoTest.results?.[0].vote_average,
          voteCount: searchMoviesApiMockDtoTest.results?.[0].vote_count,
        },
      ],
    },
  }

  test(`searchMoviesApi() returns ${JSON.stringify(searchMoviesApi_RESPONSE)},
  if response_dto is ${JSON.stringify(
    searchMoviesApiMockDtoTest,
  )},`, async () => {
    expect(await searchMoviesApi({query: searchMoviesApiMock_QUERY})).toEqual(
      searchMoviesApi_RESPONSE,
    )
  })
})
