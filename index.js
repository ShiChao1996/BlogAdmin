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
import './index.css';
import Login from './src/pages/login';
import ArticleDetail from './src/pages/articleDetail';

const router = (
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={Login} />
            <Route path="/articles" component={ArticleDetail}/>
        </Route>

    </Router>
)

ReactDOM.render(router, document.getElementById('root'));
