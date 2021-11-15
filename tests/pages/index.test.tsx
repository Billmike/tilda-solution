import '@testing-library/jest-dom'
import * as React from 'react'
import { render, waitFor } from '@testing-library/react'
import Home from '../../pages';

describe('Quiz Home', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<Home />)
    await waitFor(() => {
      expect(getByText('Tilda Quizz')).toBeInTheDocument()
    })
  })

  it('should render 3 quizzes to the user', async () => {
    const { getByText } = render(<Home />)

    const geographyText = getByText('Geography')
    const generalKnowledgeText = getByText('General knowledge')
    const popCultureText = getByText('Pop Culture')

    await waitFor(() => {
      expect(geographyText).toBeInTheDocument()
      expect(generalKnowledgeText).toBeInTheDocument()
      expect(popCultureText).toBeInTheDocument()
    })
  })
})