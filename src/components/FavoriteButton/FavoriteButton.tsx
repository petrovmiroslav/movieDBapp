import React, {useCallback, useMemo, useRef} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {selectFavoriteIdByTypeAndEntityId} from '../../store/entities/favorites/favorites.selectors'
import {FAVORITES_TYPES} from '../../store/entities/favorites/favorites.types'
import {Dispatch} from '../../store/store'
import {MovieId} from '../../store/entities/movies/movies.types'
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

export type FavoriteButtonProps = {
  movieId: MovieId
  style?: StyleProp<ViewStyle>
}
const FavoriteButton = ({movieId, style}: FavoriteButtonProps) => {
  const dispatch = useDispatch<Dispatch>()

  const favoriteId = useSelector(
    selectFavoriteIdByTypeAndEntityId(undefined, movieId),
    shallowEqual,
  )

  const _style = useMemo(() => [styles.button, style], [style])

  const _backIconStyle = useMemo(
    () => [styles.icon, {opacity: !favoriteId ? 1 : 0}],
    [favoriteId],
  )

  const _frontIconStyle = useMemo(
    () => [styles.icon, {opacity: favoriteId ? 1 : 0}],
    [favoriteId],
  )

  const isFavoritesPendingRef = useRef(false)
  const onPresHandler = useCallback(async () => {
    if (isFavoritesPendingRef.current) return
    isFavoritesPendingRef.current = true

    await dispatch(
      favoriteId
        ? removeFromFavorites({id: favoriteId})
        : addToFavorites({type: FAVORITES_TYPES.MOVIE, entityId: movieId}),
    )

    !favoriteId && (await dispatch(fetchFavorites()))

    isFavoritesPendingRef.current = false
  }, [dispatch, favoriteId, movieId])

  return (
    <Button style={_style} onPress={onPresHandler}>
      <Svg
        source={ICONS_SVG.favorites_outlined}
        style={_backIconStyle}
        fill={styles.icon.color}
      />
      <Svg
        source={ICONS_SVG.favorites_filled}
        style={_frontIconStyle}
        fill={styles.icon.color}
      />
    </Button>
  )
}
export default React.memo(FavoriteButton)
