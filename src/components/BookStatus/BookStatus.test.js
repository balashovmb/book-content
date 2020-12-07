import React from 'react'
import { render, fireEvent, screen } from '../../redux/testUtils'
import BookStatus from './index'

it('Renders status of book', () => {
  render(<BookStatus />, {
    initialState: {
      chapters: {
        entries: [{ title: 'Chapter1', completed: true, sections: [{ title: 'Section1', completed: true }] }]
      }
    }
  })

  expect(screen.getByText(/Number of chapters: 1/i)).toBeInTheDocument()
  expect(screen.getByText(/Number of sections: 1/i)).toBeInTheDocument()
  expect(screen.getByText(/Number of finished chapters: 1/i)).toBeInTheDocument()
  expect(screen.getByText(/Number of finished sections: 1/i)).toBeInTheDocument()
})
