import React from 'react';
import { Provider } from 'react-redux';

import ChaptersList from './components/ChaptersList/';
import store from './redux/store';
import Filter from './components/Filter';
import BookStatus from './components/BookStatus';
import {fetchChapters} from './redux/slices/chapters';

store.dispatch(fetchChapters());

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700">
        <BookStatus />
        <Filter />
        <ChaptersList />
      </div>
    </Provider>
  );
}

export default App;
