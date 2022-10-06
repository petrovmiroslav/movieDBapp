import {render, screen} from '@testing-library/react-native'
import React from 'react'
import {Text} from 'react-native'
import Button from '../Button'

const TEXT = 'TEXT'

test(`'<Button>
      <Text>${TEXT}</Text>
    </Button>'
    renders Button with "${TEXT}" text`, () => {
  render(
    <Button>
      <Text>{TEXT}</Text>
    </Button>,
  )

  expect(screen.getByRole('button', {name: TEXT})).toBeTruthy()
})
