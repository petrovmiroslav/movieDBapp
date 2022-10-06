import React from 'react'
import {renderWithStoreProvider} from '../../../utils/tests'
import {App} from '../../../../App'
import {act, fireEvent, screen} from '@testing-library/react-native'
import {server} from '../../../../__mocks__/msw/server'
import {fetchMovieApiMockDtoTest} from '../../../api/movies/__mock__/movies.mockHandlers'
import {MOVIE_CARD_ROLE} from '../../../components/MovieCard/MovieCard'
import {MOVIE_TITLE_ROLE} from '../components/Hero/Hero'

beforeAll(() => server.listen({onUnhandledRequest: 'bypass'}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('MovieScreen tests', () => {
  const MOVIE_TITLE = fetchMovieApiMockDtoTest.title
  test(`pressing on '${MOVIE_TITLE}' movie button, navigate to the 
  movie screen with '${MOVIE_TITLE}' header text`, async () => {
    renderWithStoreProvider(<App />)

    const movieButtons = await screen.findAllByRole(MOVIE_CARD_ROLE, {
      name: MOVIE_TITLE,
    })

    fireEvent.press(movieButtons[0])
    await act(() => Promise.resolve())

    expect(screen.getByRole(MOVIE_TITLE_ROLE, {name: MOVIE_TITLE})).toBeTruthy()
  })
})
