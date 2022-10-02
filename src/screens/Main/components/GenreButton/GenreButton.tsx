import Button from '../../../../components/buttons/Button/Button'
import {GenreId} from '../../../../store/entities/genres/genres.types'
import {shallowEqual, useSelector} from 'react-redux'
import {selectGenreById} from '../../../../store/entities/genres/genres.selectors'
import React, {useCallback} from 'react'
import {Text} from 'react-native'
import {styles} from './GenreButton.styles'

export type GenreButtonProps = {
  genreId: GenreId
  onPress: (genreId: GenreId) => void
}
const GenreButton = ({genreId, onPress}: GenreButtonProps) => {
  const {name} = useSelector(selectGenreById(genreId), shallowEqual) ?? {}

  const onPressHandler = useCallback(() => onPress(genreId), [genreId, onPress])

  if (!name) return null
  return (
    <Button style={styles.button} onPress={onPressHandler}>
      <Text style={styles.text}>{name}</Text>
    </Button>
  )
}
export default React.memo(GenreButton)
