import * as React from 'react'
import { render } from '@testing-library/react'
import { Loader } from '../../components'

describe('Loader component', () => {
  it('should render a loader component', () => {
    render(<Loader />)
  })
})