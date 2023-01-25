import React, {useCallback, useRef, useState} from 'react'
import {styles} from '../../SearchScreen.styles'
import {
  LayoutAnimation,
  LayoutAnimationConfig,
  Platform,
  Text,
  TextInput,
  TextInputProps,
  UIManager,
  View,
} from 'react-native'
import ScreenHeaderLayout from '../../../../components/ScreenHeaderLayout/ScreenHeaderLayout'
import {useFocusEffect} from '@react-navigation/native'
import {UseDefaultScreenHeaderAnimationReturnType} from '../../../../hooks/useDefaultScreenHeaderAnimation'
import Input from '../../../../components/inputs/Input/Input'
import Svg from '../../../../components/Svg/Svg'
import {ICONS_SVG} from '../../../../constants/icons'
import Button from '../../../../components/buttons/Button/Button'
import {ACTIVE_OPACITY_HARD} from '../../../../constants/styles'
import {styleSheetCompose} from '../../../../utils/styles'
import {SEARCH_INPUT_TEST_ID} from '../../../../constants/e2e'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const onSearchInputFocusAnimationConfig: LayoutAnimationConfig = {
  ...LayoutAnimation.Presets.spring,
  update: {
    ...LayoutAnimation.Presets.spring.update,
    springDamping: 0.95,
  },
  duration: 400,
}

const onSearchInputBlurAnimationConfig: LayoutAnimationConfig = {
  ...onSearchInputFocusAnimationConfig,
  update: {...onSearchInputFocusAnimationConfig.update, springDamping: 0.9},
  duration: 350,
}

export type ScreenHeaderSectionProps = {
  onSearchInputChangeText: NonNullable<TextInputProps['onChangeText']>
} & Pick<
  UseDefaultScreenHeaderAnimationReturnType,
  'setScreenHeaderHeight' | 'screenHeaderShadowStyle'
>
const ScreenHeaderSection = ({
  setScreenHeaderHeight,
  screenHeaderShadowStyle,
  onSearchInputChangeText,
}: ScreenHeaderSectionProps) => {
  const [searchInputValue, setSearchInputValue] = React.useState('')
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false)

  const searchInputRef = useRef<TextInput>(null)

  const onSearchInputChangeTextHandler = useCallback<
    NonNullable<TextInputProps['onChangeText']>
  >(
    value => {
      setSearchInputValue(value)
      onSearchInputChangeText(value)
    },
    [onSearchInputChangeText],
  )

  const onSearchInputFocusAnimationStart = useCallback(
    () => LayoutAnimation.configureNext(onSearchInputFocusAnimationConfig),
    [],
  )

  const onSearchInputBlurAnimationStart = useCallback(
    () => LayoutAnimation.configureNext(onSearchInputBlurAnimationConfig),
    [],
  )

  const onSearchInputFocusHandler = useCallback<
    NonNullable<TextInputProps['onFocus']>
  >(() => {
    onSearchInputFocusAnimationStart()
    setIsSearchInputFocused(true)
  }, [onSearchInputFocusAnimationStart])

  const onSearchInputBlurHandler = useCallback<
    NonNullable<TextInputProps['onBlur']>
  >(() => {
    onSearchInputBlurAnimationStart()
    setIsSearchInputFocused(false)
  }, [onSearchInputBlurAnimationStart])

  const onCancelButtonPressHandler = useCallback(() => {
    onSearchInputChangeTextHandler('')
    searchInputRef.current?.blur()
  }, [onSearchInputChangeTextHandler])

  /** input focus on screen focus*/
  useFocusEffect(
    useCallback(() => {
      !searchInputRef.current?.isFocused() && searchInputRef.current?.focus()
    }, []),
  )
  return (
    <ScreenHeaderLayout
      setHeaderHeight={setScreenHeaderHeight}
      shadowStyle={screenHeaderShadowStyle}
      contentContainerStyle={styles.headerLayoutContentContainerStyle}>
      <View style={styles.inputContainer}>
        <Input
          ref={searchInputRef}
          value={searchInputValue}
          onChangeText={onSearchInputChangeTextHandler}
          style={styles.input}
          placeholder="Search"
          onFocus={onSearchInputFocusHandler}
          onBlur={onSearchInputBlurHandler}
          testID={SEARCH_INPUT_TEST_ID}
          accessibilityLabel="Search"
        />
        <Svg
          style={styles.icon}
          source={ICONS_SVG.search}
          fill={styles.icon.color}
          pointerEvents="none"
        />
      </View>

      <Button
        style={styleSheetCompose(
          styles.cancelButton,
          !isSearchInputFocused && styles.cancelButton_hidden,
        )}
        activeOpacity={ACTIVE_OPACITY_HARD}
        onPress={onCancelButtonPressHandler}>
        <Text
          style={styles.cancelButton__text}
          ellipsizeMode="clip"
          numberOfLines={1}>
          Cancel
        </Text>
      </Button>
    </ScreenHeaderLayout>
  )
}
export default React.memo(ScreenHeaderSection)
