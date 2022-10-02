import React, {ReactNode, useMemo} from 'react'
import {Image, StyleProp, View, ViewStyle} from 'react-native'
import Svg from '../Svg/Svg'
import {ICONS_SVG} from '../../constants/icons'
import Button from '../buttons/Button/Button'
import {styles} from './MovieCardHorizontal.styles'
import {getImageUrl} from '../../utils/images'
import {Movie} from '../../store/entities/movies/movies.types'
import {UseImageUriReturnType} from '../../hooks/useImageUri'

export type MovieCardHorizontalProps = {
  onPress: () => void
  posterPath: Movie['posterPath']
  children: ReactNode
  style?: StyleProp<ViewStyle>
} & UseImageUriReturnType
const MovieCardHorizontal = ({
  onPress,
  baseUrl,
  sizePart,
  posterPath,
  children,
  style,
}: MovieCardHorizontalProps) => {
  const posterPathUri = useMemo(
    () => getImageUrl(baseUrl, sizePart, posterPath),
    [baseUrl, posterPath, sizePart],
  )

  const _style = useMemo(() => [styles.button, style], [style])

  return (
    <Button style={_style} onPress={onPress}>
      <Image style={styles.poster} source={{uri: posterPathUri}} />

      <View style={styles.content}>{children}</View>

      <Svg
        style={styles.buttonIcon}
        fill={styles.buttonIcon.color}
        source={ICONS_SVG.arrowLeft}
      />
    </Button>
  )
}
export default React.memo(MovieCardHorizontal)
