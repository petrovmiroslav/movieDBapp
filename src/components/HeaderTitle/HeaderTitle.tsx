import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import {getHeaderTitle} from '@react-navigation/elements'
import React, {useMemo} from 'react'
import {Animated, TextProps, View} from 'react-native'
import {styles} from './HeaderTitle.styles'

export type HeaderTitleProps = {
  isBackTextShown?: boolean
  backTextStyle?: Animated.AnimatedProps<TextProps>['style']
  frontTextStyle?: Animated.AnimatedProps<TextProps>['style']
} & Pick<NativeStackHeaderProps, 'options' | 'route'>
const HeaderTitle = ({
  route,
  options,
  isBackTextShown,
  backTextStyle,
  frontTextStyle,
}: HeaderTitleProps) => {
  const title = getHeaderTitle(options, route.name)
  const numberOfLines = 1

  const _backTextStyle = useMemo(
    () => [styles.text, styles.text_back, backTextStyle],
    [backTextStyle],
  )

  const _frontTextStyle = useMemo(
    () => [styles.text, frontTextStyle],
    [frontTextStyle],
  )

  const CustomTitle = options.headerTitle as
    | string
    | ((props: {
        children: string
        tintColor?: string | undefined
      }) => JSX.Element)
    | undefined

  if (typeof CustomTitle === 'function')
    return <CustomTitle>{title}</CustomTitle>

  return (
    <View style={styles.title}>
      {isBackTextShown && (
        <Animated.Text style={_backTextStyle} numberOfLines={numberOfLines}>
          {title}
        </Animated.Text>
      )}

      <Animated.Text style={_frontTextStyle} numberOfLines={numberOfLines}>
        {title}
      </Animated.Text>
    </View>
  )
}
export default HeaderTitle
