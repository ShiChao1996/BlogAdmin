import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*import {
    Route,
    Link,
    Router,
    hashHistory,
    IndexRoute
} from 'react-router';*/
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import Login from './src/pages/login';
import ArticleDetail from './src/pages/article/articleDetail';
import Articles from './src/pages/article/articles';
import reducers from './src/reducers/index';
import Container from './src/container/container';
import {
  HashRouter,
  Route
} from 'react-router-dom';
import App from './src/app';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const router = (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>

)

ReactDOM.render(router, document.getElementById('root'));
