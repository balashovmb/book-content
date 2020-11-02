import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import chapters from '../slices/chapters';
import visibilityFilter from '../slices/visibilityFilter';

export default combineReducers(
  {
    chapters: undoable(chapters),
    visibilityFilter
  }
)
