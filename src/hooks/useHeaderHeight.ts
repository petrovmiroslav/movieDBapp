import React, {useContext} from 'react'
import {HEADER_MIN_HEIGHT} from '../constants/styles'

export const HeaderHeightContext = React.createContext(HEADER_MIN_HEIGHT)

export const SetHeaderHeightContext = React.createContext<
  (height: number) => void
>(() => {})

export const useHeaderHeight = () => {
  return useContext(HeaderHeightContext)
}

export const useSetHeaderHeight = () => {
  return useContext(SetHeaderHeightContext)
}
