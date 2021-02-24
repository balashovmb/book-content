import { syncChapters } from "../redux/slices/chapters";

const syncActionTypes = [
  "chapters/addChapter",
  "chapters/addSection",
  "chapters/toggleSection",
];

const syncMiddleware = (store) => (next) => (action) => {
  if (!syncActionTypes.includes(action.type)) return next(action);
  const result = next(action);
  store.dispatch(syncChapters(store.getState().chapters.present.entries));
  return result;
};

export default syncMiddleware;
