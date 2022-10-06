import React from 'react'
import {renderWithStoreProvider} from '../../../utils/tests'
import FavoriteButton, {
  ACCESSIBILITY_ROLE,
  DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT,
  DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT,
  EMPTY_ICON_TEST_ID,
  FILLED_ICON_TEST_ID,
} from '../FavoriteButton'
import {EntitiesIds} from '../../../store/entities/entities.types'
import {act, fireEvent, screen} from '@testing-library/react-native'
import {StyleSheet} from 'react-native'

const MOVIE_ID = 1 as EntitiesIds['movie']

test('FavoriteButton can add and remove item by id to favorite, and render icons', async () => {
  renderWithStoreProvider(<FavoriteButton movieId={MOVIE_ID} />)

  /** Button with role DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT*/
  const button = screen.getByRole(ACCESSIBILITY_ROLE, {
    name: DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT,
  })

  fireEvent.press(button)
  /** second unnecessary press*/
  fireEvent.press(button)

  /** after add to favorite*/
  /** Button with role DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT*/
  expect(
    await screen.findByRole(ACCESSIBILITY_ROLE, {
      name: DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT,
    }),
  ).toBeTruthy()

  /** filled icon visible, empty icon invisible*/
  expect(
    StyleSheet.flatten(screen.getByTestId(FILLED_ICON_TEST_ID).props.style)
      .opacity,
  ).not.toBe(0)
  expect(
    StyleSheet.flatten(screen.getByTestId(EMPTY_ICON_TEST_ID).props.style)
      .opacity,
  ).toBe(0)

  fireEvent.press(button)
  /** second unnecessary press*/
  fireEvent.press(button)
  await act(() => Promise.resolve())

  /** after remove from favorite*/
  /** Button with role DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT*/
  expect(
    screen.getByRole(ACCESSIBILITY_ROLE, {
      name: DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT,
    }),
  ).toBeTruthy()

  /** filled icon invisible, empty icon visible*/
  expect(
    StyleSheet.flatten(screen.getByTestId(FILLED_ICON_TEST_ID).props.style)
      .opacity,
  ).toBe(0)
  expect(
    StyleSheet.flatten(screen.getByTestId(EMPTY_ICON_TEST_ID).props.style)
      .opacity,
  ).not.toBe(0)
})
