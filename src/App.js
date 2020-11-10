import React from 'react';
import { Provider } from 'react-redux';

import ChaptersList from './components/ChaptersList/';
import store from './redux/store';
import Filter from './components/Filter';
import BookStatus from './components/BookStatus';
import { fetchChapters } from './redux/slices/chapters';
import needUploadListener from './listeners/needUploadListener';

store.dispatch(fetchChapters());

const unsubscribeListener = store.subscribe(needUploadListener);

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
