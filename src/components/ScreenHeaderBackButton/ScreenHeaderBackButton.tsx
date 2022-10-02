import Button from '../buttons/Button/Button'
import Svg from '../Svg/Svg'
import {ICONS_SVG} from '../../constants/icons'
import {ACTIVE_OPACITY_HARD, COLORS, HIT_SLOPS} from '../../constants/styles'
import React, {useMemo} from 'react'
import {styles} from './ScreenHeaderBackButton.styles'
import {Animated, ViewProps} from 'react-native'

export type ScreenHeaderBackButtonProps = {
  onPress: () => void
  isBackIconShown?: boolean
  backIconContainerStyle?: Animated.AnimatedProps<ViewProps>['style']
  frontIconContainerStyle?: Animated.AnimatedProps<ViewProps>['style']
}

const ScreenHeaderBackButton = ({
  onPress,
  isBackIconShown = false,
  backIconContainerStyle,
  frontIconContainerStyle,
}: ScreenHeaderBackButtonProps) => {
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
      hitSlop={HIT_SLOPS.hitSlopL}
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY_HARD}>
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
export default React.memo(ScreenHeaderBackButton)
