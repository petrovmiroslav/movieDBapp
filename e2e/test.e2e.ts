import {default as jestExpect} from 'expect'
import {by, device, element, waitFor} from 'detox'
import {
  DEFAULT_WAIT_DELAY,
  POPULAR_MOVIE_CARD_TEST_ID,
  POPULAR_MOVIE_CARD_TITLE_TEST_ID,
  MOVIE_SCREEN_HEADER_TEST_ID,
  SEARCH_INPUT_TEST_ID,
  SEARCH_MOVIE_CARD_TEST_ID,
  SEARCH_MOVIE_CARD_TITLE_TEST_ID,
  SEARCH_TAB_TEST_ID,
} from '../src/constants/e2e'

const getAttributes = (
  attributes: Awaited<
    ReturnType<Detox.IndexableNativeElement['getAttributes']>
  >,
  name: string,
) => {
  if (attributes && name in attributes) {
    return attributes[name as keyof typeof attributes]
  }
  return undefined
}

const selectMovieScreenHeader = () => by.id(MOVIE_SCREEN_HEADER_TEST_ID)

describe('e2e tests', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  test(
    'pressing on main screen movie button, ' +
      'navigate to the movie screen with movie title header',
    async () => {
      const selectMovieCardTitle = () =>
        by
          .id(POPULAR_MOVIE_CARD_TITLE_TEST_ID)
          .withAncestor(by.id(POPULAR_MOVIE_CARD_TEST_ID))

      await waitFor(element(selectMovieCardTitle()))
        .toBeVisible()
        .withTimeout(DEFAULT_WAIT_DELAY)

      const movieTitle = getAttributes(
        await element(selectMovieCardTitle()).getAttributes(),
        'text',
      )

      await element(selectMovieCardTitle()).tap()

      await waitFor(element(selectMovieScreenHeader()))
        .toBeVisible()
        .withTimeout(DEFAULT_WAIT_DELAY)

      const movieScreenHeaderText = getAttributes(
        await element(selectMovieScreenHeader()).getAttributes(),
        'text',
      )

      jestExpect(movieScreenHeaderText).toBeTruthy()
      jestExpect(movieScreenHeaderText).toBe(movieTitle)
    },
  )

  test(
    'type text to the search input, press on a movie card, ' +
      'navigate to the movie screen with movie title header',
    async () => {
      await waitFor(element(by.id(SEARCH_TAB_TEST_ID)))
        .toBeVisible()
        .withTimeout(DEFAULT_WAIT_DELAY)

      await element(by.id(SEARCH_TAB_TEST_ID)).tap()

      await element(by.id(SEARCH_INPUT_TEST_ID)).typeText('2 fast')

      const selectMovieCardTitle = () =>
        by
          .id(SEARCH_MOVIE_CARD_TITLE_TEST_ID)
          .withAncestor(by.id(SEARCH_MOVIE_CARD_TEST_ID))

      await waitFor(element(selectMovieCardTitle()))
        .toBeVisible()
        .withTimeout(DEFAULT_WAIT_DELAY)

      const movieTitle = getAttributes(
        await element(selectMovieCardTitle()).getAttributes(),
        'text',
      )

      await element(selectMovieCardTitle()).tap()

      await waitFor(element(selectMovieScreenHeader()))
        .toBeVisible()
        .withTimeout(DEFAULT_WAIT_DELAY)

      const movieScreenHeaderText = getAttributes(
        await element(selectMovieScreenHeader()).getAttributes(),
        'text',
      )

      jestExpect(movieScreenHeaderText).toBeTruthy()
      jestExpect(movieScreenHeaderText).toBe(movieTitle)
    },
  )
})
