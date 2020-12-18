import React from "react";
import { Provider } from "react-redux";

import ChaptersList from "./components/ChaptersList/";
import store from "./redux/store";
import Filter from "./components/Filter";
import BookStatus from "./components/BookStatus";
import { fetchChapters } from "./redux/slices/chapters";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const browserHistory = createBrowserHistory();

store.dispatch(fetchChapters());

function App(props) {
  const history = props.history || browserHistory;
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route component={Main} path="/" exact />
          <Route component={SortableComponent} path= "/sc" exact/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

const Header = ({ children }) => {
  return <h2 className="text-lg mb-2">{children}</h2>;
};

const Main = ({ children }) => (
  <div className="flex flex-col h-full items-center justify-center bg-gray-200 text-gray-700">
    <Header>Book status</Header>
    <BookStatus />
    <Filter />
    <ChaptersList />
  </div>
);


const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    console.log(this)
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}
