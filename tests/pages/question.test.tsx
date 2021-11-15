import '@testing-library/jest-dom'
import * as React from 'react'
import { render, waitFor } from '@testing-library/react'

import Questions from '../../pages/quiz/question'

jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: {
        id: '03daf064-0b47-40c5-9b39-0d81a5f58397'
      },
    };
  },
}));

describe('Questions component', () => {
  it('renders correctly', () => {
    render(<Questions />)
  })

  it('should render a Geography question with options to the user', async () => {
    const { getByText } = render(<Questions />)

    await waitFor(() => {
      const questionHeader = getByText('What is the largest city in the world?')
      const saoPauloOption = getByText('Sao Paulo')
      const delhiOption = getByText('Delhi')
      const paris = getByText('Paris')
      const tokyo = getByText('Tokyo')

      expect(questionHeader).toBeInTheDocument()
      expect(saoPauloOption).toBeInTheDocument()
      expect(delhiOption).toBeInTheDocument()
      expect(paris).toBeInTheDocument()
      expect(tokyo).toBeInTheDocument()
    })
  })
})