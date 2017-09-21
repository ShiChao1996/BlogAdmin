import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    Route,
    Link,
    Router,
    hashHistory,
    IndexRoute
} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import Login from './src/pages/login';
import ArticleDetail from './src/pages/article/articleDetail';
import Articles from './src/pages/article/articles';
import reducers from './src/reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const router = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={Login} />
        <Route path="/articles" component={Articles}/>
        <Route path="/articledetail" component={ArticleDetail}/>
      </Route>
    </Router>
  </Provider>

)

ReactDOM.render(router, document.getElementById('root'));
