import React from 'react'
import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '../../redux/testUtils'
import ChaptersList from './index'
import { waitFor } from '@testing-library/react';

import { createStore } from 'redux'
import reducer from '../../redux/reducers/index';

jest.mock('redux-undo', () => ({
  __esModule: true,
  default: reducer => (state = {}, action = {}, ...slices) => ({
    past: [],
    present: reducer(state.present || state, action, ...slices),
    future: [],
  }),
  excludeAction: () => { },
}));

const initialState = {
  chapters: {
    entries: [
      {
        title: 'Chapter1',
        completed: true,
        sections: [
          { title: 'Section1', completed: true },
          { title: 'Section2', completed: false }
        ]
      }
    ]
  }
}

it('Renders chapters and sections titles', () => {
  render(<ChaptersList />, { initialState })

  expect(screen.getByText(/Chapter1/i)).toBeInTheDocument()
  expect(screen.getByText(/Section1/i)).toBeInTheDocument()
  expect(screen.getByText(/Section2/i)).toBeInTheDocument()
})

it('Renders only completed sections when the corresponding filter is enabled', () => {
  render(<ChaptersList />,
    {
      initialState: {
        ...initialState,
        visibilityFilter: 'SHOW_COMPLETED'
      }
    }
  )

  expect(screen).toEqual(expect.not.stringContaining('Section2'));
  expect(screen.getByText(/Section1/i)).toBeInTheDocument()
})

it('Renders only uncompleted sections when the corresponding filter is enabled', () => {
  render(<ChaptersList />,
    {
      initialState: {
        ...initialState,
        visibilityFilter: 'SHOW_UNCOMPLETED'
      }
    }
  )

  expect(screen).toEqual(expect.not.stringContaining('Section1'));
  expect(screen.getByText(/Section2/i)).toBeInTheDocument();
})

it('Creates new section', async () => {
  const store = createStore(reducer, initialState);
  const result = render(<ChaptersList />, { store })
  userEvent.type(result.getByTestId('chapter-0-new-section-input'), 'Test section');
  userEvent.click(result.getByTestId('chapter-0-new-section-submit'));

  // console.log(store.getState().chapters.present.entries[0].sections);
  await waitFor(() => expect(result.getByText('Test section')).toBeInTheDocument());
})
