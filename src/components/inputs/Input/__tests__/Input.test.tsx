import React from 'react'
import {render, screen} from '@testing-library/react-native'
import Input from '../Input'

const VALUE = 'VALUE'

test(`'<Input value="${VALUE}"/>' 
   renders TextInput with value="${VALUE}"`, () => {
  render(<Input value={VALUE} />)

  expect(screen.getByDisplayValue(VALUE)).toBeTruthy()
})
