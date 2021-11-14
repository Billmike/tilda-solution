import '@testing-library/jest-dom'
import * as React from 'react'
import { render } from '@testing-library/react'
import { ErrorComponent } from '../../components'

describe('Error Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(<ErrorComponent errorMessage="An error occurred." />)

    expect(getByText('An error occurred.')).toBeInTheDocument()
  })
})