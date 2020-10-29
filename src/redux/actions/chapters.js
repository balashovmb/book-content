import { API_CALL } from "../middleware/API";

export const fetchChapters = () => ({
  [API_CALL]: {
    endpoint: '/chapters',
    method: 'GET',
    types: [
      chaptersActions.FETCH_CHAPTERS_REQUEST,
      chaptersActions.FETCH_CHAPTERS_SUCCESS,
      chaptersActions.FETCH_CHAPTERS_FAILURE,
    ]
  }
})
