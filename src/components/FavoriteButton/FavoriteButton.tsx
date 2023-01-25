import React, {useCallback, useRef} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {selectFavoriteIdByTypeAndEntityId} from '../../store/entities/favorites/favorites.selectors'
import {FAVORITES_TYPES} from '../../store/entities/favorites/favorites.types'
import {Dispatch} from '../../store/store'
import {StyleProp, ViewStyle} from 'react-native'
import {
  addToFavorites,
  fetchFavorites,
  removeFromFavorites,
} from '../../store/entities/favorites/favorites.thunks'
import {styles} from './FavoriteButton.styles'
import Button from '../buttons/Button/Button'
import Svg from '../Svg/Svg'
import {ICONS_SVG} from '../../constants/icons'
import {EntitiesIds} from '../../store/entities/entities.types'
import {styleSheetCompose} from '../../utils/styles'

export const ACCESSIBILITY_ROLE = 'togglebutton'
export const DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT = 'Add to favorites'
export const DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT = 'Remove from favorites'
export const EMPTY_ICON_TEST_ID = 'FavoriteButton__EMPTY_ICON_TEST_ID'
export const FILLED_ICON_TEST_ID = 'FavoriteButton__FILLED_ICON_TEST_ID'

export type FavoriteButtonProps = {
  movieId: EntitiesIds['movie']
  style?: StyleProp<ViewStyle>
}
const FavoriteButton = ({movieId, style}: FavoriteButtonProps) => {
  const dispatch = useDispatch<Dispatch>()

  const favoriteId = useSelector(
    selectFavoriteIdByTypeAndEntityId(undefined, movieId),
    shallowEqual,
  )

  const isFavorite = !!favoriteId

  const isFavoritesPendingRef = useRef(false)
  const onPresHandler = useCallback(async () => {
    if (isFavoritesPendingRef.current) return
    isFavoritesPendingRef.current = true

    await dispatch(
      isFavorite
        ? removeFromFavorites({id: favoriteId})
        : addToFavorites({type: FAVORITES_TYPES.MOVIE, entityId: movieId}),
    )
    !isFavorite && (await dispatch(fetchFavorites()))
    isFavoritesPendingRef.current = false
  }, [dispatch, favoriteId, isFavorite, movieId])

  return (
    <Button
      style={styleSheetCompose(styles.button, style)}
      onPress={onPresHandler}
      accessibilityLabel={
        isFavorite
          ? DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT
          : DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT
      }
      accessibilityRole={ACCESSIBILITY_ROLE}
      accessibilityState={{checked: isFavorite}}>
      <Svg
        source={ICONS_SVG.favorites_outlined}
        style={styleSheetCompose(styles.icon, isFavorite && {opacity: 0})}
        fill={styles.icon.color}
        testID={EMPTY_ICON_TEST_ID}
      />
      <Svg
        source={ICONS_SVG.favorites_filled}
        style={styleSheetCompose(styles.icon, !isFavorite && {opacity: 0})}
        fill={styles.icon.color}
        testID={FILLED_ICON_TEST_ID}
      />
    </Button>
  )
}
export default React.memo(FavoriteButton)
