import React from 'react'
import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '../../redux/testUtils'
import Filter from './index'
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

it('Changes filter to SHOW_COMPLETED', () => {
  const store = createStore(reducer, { visibilityFilter: 'SHOW_ALL' });
  const result = render(<Filter />, { store });

  userEvent.click(result.getByTestId('show-completed-btn'));
  expect(store.getState().visibilityFilter).toEqual('SHOW_COMPLETED');
})
it('Changes filter to SHOW_UNCOMPLETED', () => {
  const store = createStore(reducer, { visibilityFilter: 'SHOW_ALL' });
  const result = render(<Filter />, { store });

  userEvent.click(result.getByTestId('show-uncompleted-btn'));
  expect(store.getState().visibilityFilter).toEqual('SHOW_UNCOMPLETED');
})
it('Changes filter to SHOW_ALL', () => {
  const store = createStore(reducer, { visibilityFilter: 'SHOW_COMPLETED' });
  const result = render(<Filter />, { store });

  userEvent.click(result.getByTestId('show-all-btn'));
  expect(store.getState().visibilityFilter).toEqual('SHOW_ALL');
})