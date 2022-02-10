import Button from '../buttons/Button/Button'
import Svg from '../Svg/Svg'
import {ICONS_SVG} from '../../constants/icons'
import {COLORS, HIT_SLOPS} from '../../constants/styles'
import React, {useMemo} from 'react'
import {styles} from './HeaderBackButton.styles'
import {Animated, ViewProps} from 'react-native'

export type HeaderBackButtonProps = {
  onPress: () => void
  isBackIconShown?: boolean
  backIconContainerStyle?: Animated.AnimatedProps<ViewProps>['style']
  frontIconContainerStyle?: Animated.AnimatedProps<ViewProps>['style']
}

const HeaderBackButton = ({
  onPress,
  isBackIconShown,
  backIconContainerStyle,
  frontIconContainerStyle,
}: HeaderBackButtonProps) => {
  const _backIconContainerStyle = useMemo(
    () => [styles.iconContainer, backIconContainerStyle],
    [backIconContainerStyle],
  )
  const _frontIconContainerStyle = useMemo(
    () => [styles.iconContainer, frontIconContainerStyle],
    [frontIconContainerStyle],
  )

  return (
    <Button
      style={styles.button}
      hitSlop={HIT_SLOPS.hitSlopM}
      onPress={onPress}>
      {isBackIconShown && (
        <Animated.View style={_backIconContainerStyle}>
          <Svg source={ICONS_SVG.arrowLeft} fill={COLORS.backgroundLight} />
        </Animated.View>
      )}

      <Animated.View style={_frontIconContainerStyle}>
        <Svg source={ICONS_SVG.arrowLeft} fill={COLORS.backgroundDark} />
      </Animated.View>
    </Button>
  )
}
export default React.memo(HeaderBackButton)
