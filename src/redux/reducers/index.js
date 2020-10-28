import { combineReducers } from 'redux';

import chapters from '../slices/chapters';
import visibilityFilter from '../slices/visibilityFilter';

export default combineReducers(
  {
    chapters,
    visibilityFilter
  }
)
